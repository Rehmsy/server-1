const { respond, getParam } = require('../utils/respond');
const router = require('express').Router();
const Seeker = require('../models/seeker');


module.exports = router
    .param('id', getParam)

    .post('/', respond(
        ({ seeker, body }) => Seeker.create({ seeker: seeker.id, ...body })
    )) 

    .get('/:id', respond(
        ({ seeker }) => Seeker.getSeekerById(seeker.id)

    ));
