const { assert } = require('chai');
const request = require('./request');
const { dropCollection, createToken } = require('./db');

describe.only('Seekers API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('seekers'));
    
    let token;
    let seeker;

    beforeEach(() => createToken().then(t => {
        token = t.token;
        seeker = { 
            user: t.id,
            kids: false,
            activity: 'Low',
            otherPets: false,
            interested: [],
            favorites: []
        };
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

    beforeEach (() => saveSeeker(seeker).then(s => seeker = s));

    it('gets a seeker by id', () => {
        return request
            .get(`/api/seekers/${seeker.user}`)
            .set('Authorization', token)
            .then(({ body }) => assert.deepEqual(body, [seeker]));
    });
});
