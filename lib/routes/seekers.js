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

    .put('/:id/interested', respond(
        ({ id, body }) => Seeker.updateById(
            id,
            { $push: { interested: body } },
            updateOptions
        )
    ))

    .put('/:id/favorites', respond(
        ({ id, body }) => Seeker.updateById(
            id,
            { $push: { favorites: body } },
            updateOptions
        )
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
            console.log('*** user.id', user.id);
            return Seeker.deleteSeekerById(user.id);
        })
    );
