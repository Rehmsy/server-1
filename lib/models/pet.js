const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        enum: ['Cat', 'Dog'],
        required: true
    },
    breedCat: {
        type: String,
        enum: [
            'Not Applicable',
            'Unknown',
            'Other',
            'Domestic Shorthair',
            'Domestic Longhair',
            'Abyssinian',
            'American Bobtail',
            'American Curl',
            'American Shorthair',
            'American Wirehair',
            'Balinese',
            'Bengal',
            'Birman',
            'Bombay',
            'British Shorthair',
            'Burmese',
            'Burmilla',
            'Chartreux',
            'Colorpoint Shorthair',
            'Cornish Rex',
            'Devon Rex',
            'Egyptian Mau',
            'European Burmese',
            'Exotic',
            'Havana Brown',
            'Japanese Bobtail',
            'Khao Manee',
            'Korat',
            'LaPerm',
            'Lykoi',
            'Maine Coon Cat',
            'Manx',
            'Norwegian Forest Cat',
            'Ocicat',
            'Oriental',
            'Persian',
            'Ragamuffin',
            'Ragdoll',
            'Russian Blue',
            'Scottish Fold',
            'Selkirk Rex',
            'Siamese',
            'Siberian',
            'Singapura',
            'Somali',
            'Sphynx',
            'Tonkinese',
            'Turkish Angora',
            'Turkish Van'
        ],
        required: true
    },
    breedDog: {
        type: String,
        enum: [
            'Not Applicable',
            'Unknown',
            'Other',
            'Beagle', 
            'Bernese Mountain Dog',
            'Border Collie',
            'Boxer',
            'Brittany Spaniel',
            'Bulldog',
            'Cavalier King Charles Spaniel',
            'Chihuahua',
            'Dachshund (all varieties)',
            'Dobermann',
            'English Cocker Spaniel',
            'English Setter',
            'English Springer Spaniel',
            'French Bulldog',
            'German Shepherd',
            'German Shorthaired Pointer',
            'German Spitz',
            'Golden Retriever',
            'Great Dane',
            'Jack Russell Terrier',
            'Labrador Retriever',
            'Maltese',
            'Miniature Schnauzer',
            'Pomeranian',
            'Poodle',
            'Pug',
            'Rottweiler',
            'Shetland Sheepdog',
            'Shih Tzu',
            'Staffordshire Bull Terrier',
            'West Highland White Terrier',
            'Yorkshire Terrier'
        ],
        required: true
    },
    sex: {
        type: String,
        enum: ['Female', 'Male', 'Unknown'],
        required: true
    },
    size: {
        type: String,
        enum: ['Extra Small','Small', 'Medium', 'Large', 'Extra Large'],
        required: true
    },
    sterilized: {
        type: String,
        enum: ['No', 'Yes', 'Unknown'],
        required: true,
    },
    age: {
        type: String,
        enum: ['Unknown', 'Baby', 'Young', 'Adult', 'Senior'],
        required: true
    },
    activity: {
        type: String,
        enum: ['Low', 'Medium,', 'High'],
        required: true,
    },
    kidFriendly: {
        type: String,
        enum: ['No', 'Yes', 'Unknown'],
        required: true, 
    },
    petFriendly: {
        type: String,
        enum: ['No', 'Yes', 'Unknown'],
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
        
    rehome: {
        type: String,
        enum: ['None','Allergy', 'Death', 'Illness', 'Moving', 'Conflict'],
        required: true,
    },
    matches: {
        type: Schema.Types.ObjectId,
        ref: 'Seeker' //user id of seeker
    }

});

module.exports = mongoose.model('Pet', schema);