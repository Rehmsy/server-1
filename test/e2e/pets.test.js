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
<<<<<<< HEAD
            name: 'lolly',
            species: 'dog',
            catBreed: 'not applicable',
            dogBreed: 'pug',
            sex: 'female',
            size: 'extra large',
            sterilized: 'yes',
            age: 'baby',
            activity: 'high',
=======
            name: 'Lolly',
            species: 'dog',
            catBreed: 'not-applicable',
            dogBreed: 'pug',
            sex: 'female',
            size: 'extra-large',
            sterilized: 'yes',
            age: 'baby',
            activityLevel: 'high',
>>>>>>> master
            kidFriendly: 'yes',
            petFriendly: 'yes',
            description: 'this pet is nasty',
            healthBehavior: 'healthy but nasty',
            images: ['https://cbssacramento.files.wordpress.com/2012/06/81650435_10.jpg?w=1024&h=576&crop=1'],
<<<<<<< HEAD
            rehomeReason: 'allergy'
=======
            reason: 'allergy'
>>>>>>> master
        };

        sallyData = {
            zip:  97217,
<<<<<<< HEAD
            name: 'sally',
            species: 'dog',
            catBreed: 'not applicable',
            dogBreed: 'shih tzu',
            sex: 'female',
            size: 'extra small',
            sterilized: 'yes',
            age: 'baby',
            activity: 'high',
=======
            name: 'Sally',
            species: 'dog',
            catBreed: 'not-applicable',
            dogBreed: 'shih-tzu',
            sex: 'female',
            size: 'extra-small',
            sterilized: 'yes',
            age: 'baby',
            activityLevel: 'high',
>>>>>>> master
            kidFriendly: 'yes',
            petFriendly: 'yes',
            description: 'this pet is nasty',
            healthBehavior: 'healthy but nasty',
            images: ['https://cbssacramento.files.wordpress.com/2012/06/81650435_10.jpg?w=1024&h=576&crop=1'],
<<<<<<< HEAD
            rehomeReason: 'allergy'
=======
            reason: 'allergy'
>>>>>>> master
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
        sally.name = 'sally envy salad';
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
