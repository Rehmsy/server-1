const router = require('express').Router();
const Pet = require('../models/pet');
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
        ({ body, id }) => Pet.updateById(
            id,
            { $push: { matches: body } },
            updateOptions
        )
    ))

    .get('/', respond(() => Pet.find({})

    ))

    .get('/single', respond(
        ({ user }) => {
            return Pet.getPetById(user.id);     
        }
    ))

    .delete('/:id', respond(
        ({ id }) => Pet.findByIdAndRemove(id)
    ));
    
