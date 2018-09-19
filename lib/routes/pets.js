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
        ({ body }) => Pet.create({ ...body })
    ))

    .put('/:id/matches', respond(
        ({ body, id }) => Pet.updateById(
            id,
            { $push: { matches: body } },
            updateOptions
        )
    ))

    .put('/:id', respond(
        ({ id, body }) => Pet.updateById(id, body)
    ))

    .get('/', respond(() => Pet.find({})

    ))

    .get('/:id', respond(
        ({ id }) => Pet.findById(id)      
    ))

    .delete('/:id', respond(
        ({ id }) => Pet.findByIdAndRemove(id)
    ));
    
