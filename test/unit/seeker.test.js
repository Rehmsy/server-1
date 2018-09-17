const { assert } = require('chai');
const { Types } = require('mongoose');
const Seeker = require('../../lib/models/seeker');


describe.only('User model', () => {
    
    it('validates a good model', () => {
        const data = {
            name: Types.ObjectId(),
            kids: false,
            activity: 'Low',
            zip: Types.ObjectId(),
            otherPets: false,
            interested: [],
            favorites: []
        };

        const seeker = new Seeker(data);

        const json = seeker.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        // console.log('*** json', json);
        // console.log('*** data', data);
    });

    it('validate required fields', () => {
        const seeker = new Seeker;
    });


});