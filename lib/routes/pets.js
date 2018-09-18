const router = require('express').Router();
const Pet = require('../models/pet');
const { getParam, respond } = require('../utils/respond');
//const { HttpError } = require('../util/errors');

module.exports = router
    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Pet.create({ ...body })
    ))

    .put('/:id', respond(
        ({ id, body }) => Pet.updateById(id, body)
    ))

    .get('/', respond(() => Pet.find({})

    ))

    .delete('/:id', respond(
        ({ id }) => Pet.findByIdAndRemove(id)
    ));
    
