const mongoose =  require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({

    name: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    kid: {
        type: Boolean,
        required: true,
        default: false
    },
    activity: [{
        type: String,
        required: true
    }],
    zip: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    otherPets: {
        type: String,
        required: true
    },
    interested: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet',        
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }],
},
{ timestamps: true });

module.exports = mongoose.model('Seeker', schema );