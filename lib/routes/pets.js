const router = require('express').Router();
const Pet = require('../models/pet');
const { getParam } = require('../utils/respond');
//const { HttpError } = require('../util/errors');

module.exports = router
    .param('id', getParam)

    .post('/', (req, res, next) => {
        Pet.create(req.body)
            .then(pet => res.json(pet))
            .catch(next);
    });
    
