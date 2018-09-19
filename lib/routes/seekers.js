const { respond, getParam } = require('../utils/respond');
const router = require('express').Router();
const Seeker = require('../models/seeker');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .param('id', getParam)

    .post('/', respond(
        ({ body, user }) => {
            body.user = user.id;
            return Seeker.create(body);
        }
    ))

    .put('/interested', respond(
        ({ user, body }) => {
            return Seeker.addPetToSeekerInterested(user.id, body);
        }
    ))

    .put('/favorites', respond(
        ({ user, body }) => {
            return Seeker.addPetToSeekerFavorites(user.id, body);
        }
    ))

    .get('/', respond(
        ({ user }) => {
            return Seeker.getSeekerById(user.id);
        }
    ))

    .put('/', respond(
        ({ id, body }) => Seeker.findOneAndUpdate(id, body, updateOptions)
    ))

    .delete('/', respond(
        ({ user }) => {
            return Seeker.deleteSeekerById(user.id);
        })
    );
