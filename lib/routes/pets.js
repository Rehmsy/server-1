const router = require('express').Router();
const Pet = require('../models/Pet');
const { getParam, respond } = require('../utils/respond');
//const { HttpError } = require('../util/errors');
const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .param('id', getParam)

    .post('/', respond(
        ({ body, user }) => {
            body.owner = user.id;
            return Pet.create(body);
        }
    ))

    .put('/:id', respond(
        ({ id, body }) => Pet.updateById(id, body)
    ))

    .put('/:id/matches', respond(
        ({ user, id }) => {
            return Pet.updateById(
                id,
                { $push: { matches: user.id } },
                updateOptions
            );
        } 
    ))

    // TODO: NEED TO GET THIS ROUTE WORKING 
    .get('/matches/:id', respond(
        ({ id }) => {
            return Pet.getPetMatches(id);
        }
    ))

    .get('/', respond(() => Pet.find({})

    ))

    .get('/filter', respond(({ query }) => {
        return Pet.find(query);
    }))

    .get('/owner', respond(
        ({ user }) => Pet.getPetById(user.id)
    ))

    .delete('/:id', respond(
        ({ id }) => Pet.findByIdAndRemove(id))
    );