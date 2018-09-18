const { assert } = require('chai');
const { Types } = require('mongoose');
const Seeker = require('../../lib/models/seeker');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Seeker model', () => {
    
    it('validates a good model', () => {
        const data = {
            user: Types.ObjectId(),
            kids: false,
            activity: 'Low',
            otherPets: false,
            interested: [],
            favorites: []
        };

        const seeker = new Seeker(data);
        const json = seeker.toJSON();
        delete json._id;
        assert.deepEqual(json, data);       
    });

    it('validate required fields', () => {
        const seeker = new Seeker({});
        const errors = getErrors(seeker.validateSync(), 2);
        assert.equal(errors.user.kind, 'required');
        assert.equal(errors.activity.kind, 'required');
    });
});