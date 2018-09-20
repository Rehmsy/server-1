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
        ({ body, id }) => Pet.updateById(
            id,
            { $push: { matches: body } },
            updateOptions
        )
    ))

    .get('/', respond(() => Pet.find({})

    ))

    .get('/:id', respond(
        ({ id }) => Pet.findById(id)      
    ))

    .delete('/:id', respond(
        ({ id }) => Pet.findByIdAndRemove(id)
    ));
    
