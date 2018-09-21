const chai = require('chai');
const { assert } = chai;
const { Types } = require('mongoose');
const Pet = require('../../lib/models/pet');

describe('Pet model', () => {
    it('validates a dope pet model', () => {
        const data = {
            owner: Types.ObjectId(),
<<<<<<< HEAD
            zip:  97217,
            name: 'tina',
            species: 'dog',
            breedCat: 'not applicable',
            breedDog: 'shih tzu',
            sex: 'male',
            size: 'extra small',
            sterilized: 'yes',
            age: 'baby',
            activity: 'high',
=======
            zip:  '97217',
            name: 'Tina',
            species: 'dog',
            catBreed: 'not-applicable',
            dogBreed: 'shih-tzu',
            sex: 'male',
            size: 'extra-small',
            sterilized: 'yes',
            age: 'baby',
            activityLevel: 'high',
>>>>>>> master
            kidFriendly: 'yes',
            petFriendly: 'yes',
            description: 'this pet is nasty',
            healthBehavior: 'healthy but nasty',
            matches: [Types.ObjectId()],
            images: ['https://cbssacramento.files.wordpress.com/2012/06/81650435_10.jpg?w=1024&h=576&crop=1'],
<<<<<<< HEAD
            rehomeReason: 'allergy'
=======
            reason: 'allergy'
>>>>>>> master
        };

        const pet = new Pet(data);
        const json = pet.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(pet.validateSync());
    });
});