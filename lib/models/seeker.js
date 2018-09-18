const mongoose =  require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    kids: {
        type: Boolean,
        default: false
    },
    activity: {
        type: String,
        enum: [
            'Low',
            'Medium',
            'High'
        ],
        required: true
    },
    otherPets: {
        type: Boolean,
        default: false,
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

schema.statics  = {

    getSeekerById(id) {
        return this.find({ user: id }).lean();
    }
};

module.exports = mongoose.model('Seeker', schema );