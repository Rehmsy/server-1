const router = require('express').Router();
const Pet = require('../models/pet');
const { getParam, respond } = require('../utils/respond');
//const { HttpError } = require('../util/errors');

module.exports = router
    .param('id', getParam)

    .post('/', (req, res, next) => {
        Pet.create(req.body)
            .then(pet => res.json(pet))
            .catch(next);
    })

    .put('/:id', respond(
        ({ id, body }) => Pet.updateById(id, body)
    ))

    .delete('/:id', (req, res, next) => {
        Pet.findByIdAndRemove(req.params.id)
            .then(pet => res.json({ removed: !!pet }))
            .catch(next);
    });
    
