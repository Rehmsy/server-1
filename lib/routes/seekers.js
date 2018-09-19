const { respond, getParam } = require('../utils/respond');
const router = require('express').Router();
const Seeker = require('../models/seeker');


module.exports = router
    .param('id', getParam)

    .post('/', respond(
        ({ body, user }) => {
            body.user = user.id;
            return Seeker.create(body);
        }
    ))

    .get('/:id', respond(
        ({ user }) => {
            return Seeker.getSeekerById(user.id);
        }
    ))

    .put('/:id', respond(
        ({ id, body }) => Seeker.updateById(id, body)
    ))

    .delete('/:id', respond(
        ({ id }) => {
            return Seeker.findByIdAndRemove(id);
        })
    );
