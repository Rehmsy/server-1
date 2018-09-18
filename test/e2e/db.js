const connect = require('../../lib/connect');
const url = 'mongodb://localhost:27017/rehome-test';
const mongoose = require('mongoose');
const request = require('./request');

before(() => connect(url));    
after(() => mongoose.connection.close());

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    },
    createToken(data = { name: 'Bubba', email: 'bubba@email.com', password: 'abc123', zipCode: '97203' }) {
        return request
            .post('/api/auth/signup')
            .send(data)
            .then(res => res.body.token);
    }
};