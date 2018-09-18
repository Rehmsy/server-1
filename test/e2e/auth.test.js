const { assert } = require('chai');
const request = require('./request');
const { dropCollection, checkOk } = require('./db');

const myUser = {
    name: 'Bobo',
<<<<<<< HEAD
    email: 'bobo@email.com',
    password: '123abc',
    zipCode: '97203'
=======
    email: 'bobo2@email.com',
    password: '123abc',
    zipCode: 97217
>>>>>>> master
};

let token;

describe.skip('Auth API', () => {
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(myUser)
            .then(checkOk)
            .then(({ body }) => {
                console.log('*** body', body);
                token = body.token;
            });
    });
<<<<<<< HEAD
    console.log('****** myUser', myUser);
    
    it('signs you up', () =>{
=======

    it('signs you up', () => {
        console.log('TOKEN', token);
>>>>>>> master
        assert.ok(token);
        console.log('****** token', token);
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
