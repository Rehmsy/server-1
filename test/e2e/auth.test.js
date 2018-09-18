const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const myUser = {
    name: 'Bobo',
    email: 'bobo@email.com',
    password: '123abc',
    zipCode: '97203'
};

let token;

describe.only('Auth API', () => {
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(myUser)
            .then(({ body }) => token = body.token);
    });

    it('signs you up', () =>{
        assert.ok(token);
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.valid);
            });
    });

    it('signin', () => {
        return request
            .post('/api/auth/signin')
            .send(myUser)
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });
});
