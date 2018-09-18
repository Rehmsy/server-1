const chai = require('chai');
const { assert } = chai;
const { Types } = require('mongoose');
const Pet = require('../../lib/models/pet');

describe('Pet model', () => {
    it('validates a dope pet model', () => {
        const data = {
            owner: Types.ObjectId(),
            zip:  Types.ObjectId(),
            name: 'Tina',
            species: 'Dog',
            breedCat: 'Not Applicable',
            breedDog: 'Shih Tzu',
            sex: 'Male',
            size: 'Extra Small',
            sterilized: 'Yes',
            age: 'Baby',
            activity: 'High',
            kidFriendly: 'Yes',
            petFriendly: 'Yes',
            description: 'this pet is nasty',
            healthBehavior: 'healthy but nasty',
            images: ['https://cbssacramento.files.wordpress.com/2012/06/81650435_10.jpg?w=1024&h=576&crop=1'],
            rehome: 'Allergy'
        };

        const pet = new Pet(data);
        const json = pet.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(pet.validateSync());
    });
});