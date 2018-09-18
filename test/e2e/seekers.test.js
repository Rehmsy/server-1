// const { Types } = require('mongoose');
const { assert } = require('chai');
const request = require('./request');
const { dropCollection, createToken } = require('./db');

describe.only('Seekers API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('seekers'));
    
    let token;
    let userId;
    
    beforeEach(() => createToken().then(t => {
        token = t.token;
        userId = t.id;
    }));

    function saveSeeker(data) {
        return request.post('/api/seekers')
            .set('Authorization', token)
            .send(data)
            .then(request.checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                return body;
            });
    }

    let seeker = { 
        name: userId,
        kids: false,
        activity: 'Low',
        zipCode: userId,
        otherPets: false,
        interested: [],
        favorites: []
    };

    beforeEach (() => saveSeeker(seeker).then(s => seeker = s));

    it('gets a seeker by id', () => {
        console.log('SEEKER', seeker);
        return request
            .get(`/api/seekers/${userId}`)
            .set('Authorization', token)
            .then(({ body }) => assert.deepEqual(body, seeker));
    });
});
