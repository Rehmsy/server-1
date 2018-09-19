const { assert } = require('chai');
const request = require('./request');
const { checkOk } = request;
const { dropCollection, createToken } = require('./db');

describe('Seekers API', () => {

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

    it('updates a seeker document', () => {
        seeker.kids = true;
        return request.put(`/api/seekers/${seeker._id}`)
            .set('Authorization', token)
            .send(seeker)
            .then(checkOk)
            .then(({ body }) => assert.equal(body.kids, seeker.kids));
    });

    it.skip('deletes seeker document', () => {
        return request
            .delete(`/api/seekers/${seeker._id}`)
            .set('Authorization', token)
            .then(checkOk)
            .then(() => {
                return request
                    .get('/api/seekers')
                    .set('Authorization', token);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, {});
            });
    });

});
