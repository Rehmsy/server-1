const mongoose =  require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    kids: {
        type: String,
        enum: [
            'Yes',
            'No'
        ],
        required: true
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
        type: String,
        enum: [
            'Yes',
            'No'
        ],
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

schema.statics  = {

    getSeekerById(id) {
        return this.findOne({ user: id }).lean();
    },
    
    deleteSeekerById(id) {
        return this.findOne({ user: id })
            .then(({ _id }) => {
                console.log('**** banana', _id);
                return this.findByIdAndRemove(_id);
            });

    }


};

module.exports = mongoose.model('Seeker', schema );