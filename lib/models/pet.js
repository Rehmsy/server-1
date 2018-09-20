const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        enum: ['none','allergy', 'death', 'illness', 'moving', 'conflict'],
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        enum: ['cat', 'dog' ],
        required: true
    },
    catBreed: {
        type: String,
        enum: [
            'not-applicable',
            'unknown',
            'other',
            'mixed-breed',
            'domestic-shorthair',
            'domestic-longhair',
            'abyssinian',
            'american-bobtail',
            'american-curl',
            'american-shorthair',
            'american-wirehair',
            'balinese',
            'bengal',
            'birman',
            'bombay',
            'british-shorthair',
            'burmese',
            'burmilla',
            'chartreux',
            'colorpoint-shorthair',
            'cornish-rex',
            'devon-rex',
            'egyptian-mau',
            'european-burmese',
            'exotic',
            'havana-brown',
            'japanese-bobtail',
            'khao-manee',
            'korat',
            'laPerm',
            'lykoi',
            'maine-coon-cat',
            'manx',
            'norwegian-forest-cat',
            'ocicat',
            'oriental',
            'persian',
            'ragamuffin',
            'ragdoll',
            'russian-blue',
            'scottish-fold',
            'selkirk-rex',
            'siamese',
            'siberian',
            'singapura',
            'somali',
            'sphynx',
            'tonkinese',
            'turkish-angora',
            'turkish-van'
        ],
        required: true
    },
    dogBreed: {
        type: String,
        enum: [
            'not-applicable',
            'unknown',
            'other',
            'mixed-breed',
            'beagle', 
            'bernese-mountain-dog',
            'border-collie',
            'boxer',
            'brittany-spaniel',
            'bulldog',
            'cavalier-king-charles-spaniel',
            'chihuahua',
            'dachshund',
            'dobermann',
            'english-cocker-spaniel',
            'english-setter',
            'english-springer-spaniel',
            'french-bulldog',
            'german-shepherd',
            'german-shorthaired-pointer',
            'german-spitz',
            'golden-retriever',
            'great-dane',
            'jack-russell-terrier',
            'labrador-retriever',
            'maltese',
            'miniature-schnauzer',
            'pomeranian',
            'poodle',
            'pug',
            'rottweiler',
            'shetland-sheepdog',
            'shih-tzu',
            'staffordshire-bull-terrier',
            'west-highland-white-terrier',
            'yorkshire-terrier'
        ],
        required: true
    },
    size: {
        type: String,
        enum: ['extra-small','small', 'medium', 'large', 'extra-large'],
        required: true
    },
    sex: {
        type: String,
        enum: ['unknown', 'female', 'male'],
        required: true
    },
    age: {
        type: String,
        enum: ['unknown', 'baby', 'young', 'adult', 'senior'],
        required: true
    },

    sterilized: {
        type: String,
        enum: ['unknown', 'no', 'yes'],
        required: true,
    },
    activityLevel: {
        type: String,
        enum: ['unknown', 'low', 'medium,', 'high'],
        required: true,
    },
    kidFriendly: {
        type: String,
        enum: ['unknown', 'yes', 'no'],
        required: true, 
    },
    petFriendly: {
        type: String,
        enum: ['unknown', 'yes', 'no'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    healthBehavior: {
        type: String,
        required: true
    },
    images: [ String ],
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Seeker' //user id of seeker
    }]

});

module.exports = mongoose.model('Pet', schema);