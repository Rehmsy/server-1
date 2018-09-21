const mongoose = require('mongoose');
const { Types } = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    zip: {
        type: String
    },
    reason: {
        type: String
    },
    name: {
        type: String
    },
    species: {
        type: String

    },
    catBreed: {
        type: String
        
    },
    dogBreed: {
        type: String

    },
    size: {
        type: String
    },
    sex: {
        type: String
    },
    age: {
        type: String
    },

    sterilized: {
        type: String
    },
    activityLevel: {
        type: String
    },
    kidFriendly: {
        type: String
    },
    petFriendly: {
        type: String
    },
    description: {
        type: String
    },
    healthBehavior: {
        type: String
    },
    images: [ String ],
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Seeker'
    }]

});

schema.statics  = {

    getPetById(id) {
        return this.find({ owner: id }).lean();
    },
};

schema.statics.getPetMatches = function(id) {
    return this.aggregate([
        {
            $match: {
                _id: Types.ObjectId(id)
            }
        },
        {
            $unwind: {
                path: '$matches'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'matches',
                foreignField: '_id',
                as: 'matches'     
            }
        },
        {
            $unwind: '$matches' 

        },
        {
            $project: {
                _id: 1,
                name: '$matches.name',
                email: '$matches.email' 

            }
        }
    ]);
};

module.exports = mongoose.model('Pet', schema);