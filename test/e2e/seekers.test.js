const { assert } = require('chai');
const request = require('./request');
const { checkOk } = request;
const { dropCollection, createToken } = require('./db');
const { Types } = require('mongoose');


describe('Seekers API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('seekers'));
    
    let token;
    let tyroneData;
    let tyrone;

    beforeEach(() => createToken().then(t => {
        token = t.token;
        tyroneData = { 
            kids: 'No',
            activity: 'Low',
            otherPets: 'No',
            interested: [],
            favorites: []
        };
    }));

    function saveSeeker(data) {
        return request.post('/api/seekers')
            .set('Authorization', token)
            .send(data)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                return body;
            });
    }

    beforeEach(() => saveSeeker(tyroneData).then(s => tyrone = s));

    it('gets a seeker by id', () => {
        return request
            .get('/api/seekers')
            .set('Authorization', token)
            .then(({ body }) => assert.deepEqual(body, tyrone));
    });

    it('pushes petIds into interested field', () => {
        const pet = { _id: Types.ObjectId() };
        return request
            .put('/api/seekers/interested')
            .set('Authorization', token)
            .send(pet)
            .then(({ body }) => {
                assert.equal(body.interested.length, 1);
            });
    });

    it('pushes petIds into favorites field', () => {
        const pet = { _id: Types.ObjectId() };
        return request
            .put('/api/seekers/favorites')
            .set('Authorization', token)
            .send(pet)
            .then(({ body }) => {
                assert.equal(body.favorites.length, 1);
            });
    });

    it('updates a seeker document', () => {
        tyrone.kids = 'Yes';
        return request
            .put('/api/seekers')
            .set('Authorization', token)
            .send(tyrone)
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.kids, tyrone.kids);
            });
    });

    it('deletes seeker document', () => {
        return request
            .delete('/api/seekers')
            .set('Authorization', token)
            .then(checkOk)
            .then(() => {
                return request
                    .get('/api/seekers')
                    .set('Authorization', token);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, null);
            });
    });
});
