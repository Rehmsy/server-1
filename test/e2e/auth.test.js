const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const myUser = {
    name: 'Bobo',
    email: 'bobo@email.com',
    password: '123abc'
};

let token;

describe('Auth API', () => {
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
});
