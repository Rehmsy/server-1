const { respond, getParam } = require('../utils/respond');
const router = require('express').Router();
const Seeker = require('../models/seeker');


module.exports = router
    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Seeker.create(body)
    ))

    .get('/:id', respond(
        ({ user }) => {
            return Seeker.getSeekerById(user.id);
        }
    ));