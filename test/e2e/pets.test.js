const { assert } = require('chai');
const request = require('./request');
const { checkOk } = request;
const { dropCollection, createToken  } = require('./db');
const { Types } = require('mongoose');

describe('Pets API', () => {
  
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('pets'));
  
    let sally;
    let sallyData;
    let lolly;
    let lollyData;
    let token;

    beforeEach(() => createToken().then(body => {
        token = body.token;
        lollyData = {
            zip:  97217,
            name: 'Lolly',
            species: 'Dog',
            breedCat: 'Not Applicable',
            breedDog: 'Pug',
            sex: 'Female',
            size: 'Extra Large',
            sterilized: 'Yes',
            age: 'Baby',
            activity: 'High',
            kidFriendly: 'Yes',
            petFriendly: 'Yes',
            description: 'this pet is nasty',
            healthBehavior: 'healthy but nasty',
            images: ['https://cbssacramento.files.wordpress.com/2012/06/81650435_10.jpg?w=1024&h=576&crop=1'],
            rehome: 'Allergy'
        };

        sallyData = {
            zip:  97217,
            name: 'Sally',
            species: 'Dog',
            breedCat: 'Not Applicable',
            breedDog: 'Shih Tzu',
            sex: 'Female',
            size: 'Extra Small',
            sterilized: 'Yes',
            age: 'Baby',
            activity: 'High',
            kidFriendly: 'Yes',
            petFriendly: 'Yes',
            description: 'this pet is nasty',
            healthBehavior: 'healthy but nasty',
            images: ['https://cbssacramento.files.wordpress.com/2012/06/81650435_10.jpg?w=1024&h=576&crop=1'],
            rehome: 'Allergy'
        };
    }));
    
    beforeEach(() => {
        return request
            .post('/api/pets')
            .set('Authorization', token)
            .send(lollyData)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                return body;
            })
            .then(l => lolly = l);
    });
    
    beforeEach(() => {
        return request
            .post('/api/pets')
            .set('Authorization', token)
            .send(sallyData)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                return body;
            })
            .then(s => sally = s);
    });

    it('saves a pet', () => {
        assert.isOk(sally._id);
    });
    
    it('saves another pet', () => {
        assert.isOk(lolly._id);
    });
    
    it('pushes seekerIds into matches field', () => {
        const seeker = { _id: Types.ObjectId() };
        return request
            .put(`/api/pets/${lolly._id}/matches`)
            .set('Authorization', token)
            .send(seeker)
            .then(({ body }) => {
                assert.equal(body.matches.length, 1);
            });
    });

    it('updates a pet', () => {
        sally.name = 'Sally Envy Salad';
        return request
            .put(`/api/pets/${sally._id}`)
            .set('Authorization', token)
            .send(sally)
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.name, sally.name);      
            });
    });

    it('get a pet by id', () => {
        return request
            .get(`/api/pets/${sally._id}`)
            .set('Authorization', token)
            .then(({ body }) => {
                assert.deepEqual(body, sally);
            });
    });


    it('gets all pets', () => {
        return request.get('/api/pets')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.equal(body.length, 2);
            });  
    });


    it('removes a pet', () => {
        return request
            .delete(`/api/pets/${lolly._id}`)
            .set('Authorization', token)
            .then(checkOk)
            .then(() => {
                return request
                    .get('/api/pets')
                    .set('Authorization', token);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [sally]);
            });
    });
});
