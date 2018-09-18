const { assert } = require('chai');
const { getErrors } = require('../helpers.js');
const User = require('../../lib/models/User.js');


describe.only('user model', () => {
    const credentials = {
        name: 'Test',
        email: 'test@test.com',
        password: 'test123',
        zip: 97070
    };

    let user = null;

    beforeEach(() => {
        user = new User(credentials);
        user.generateHash(credentials.password);
    });


    it('validates a good model', () => {
        assert.equal(user.name, credentials.name);
        assert.equal(user.email, credentials.email);
        assert.equal(user.zip, credentials.zip);
        assert.isDefined(user.hash, 'hash is defined');
        assert.notEqual(user.hash, credentials.password, 'hash is not the same as password');
        assert.isTrue(user.comparePassword(credentials.password), 'compare good password');
        assert.isFalse(user.comparePassword('bad password'), 'compare bad password');
        assert.isUndefined(user.password, 'password should be set');
    });

    it('validates required fields', () => {
        const goal = new User({});
        const errors = getErrors(goal.validateSync(), 4);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.zip.kind, 'required');
        assert.equal(errors.hash.kind, 'required');
    });
});

