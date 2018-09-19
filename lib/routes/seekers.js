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

    .get('/', respond(
        ({ id }) => {
            console.log('USEERRR IN BACKEND', id);
            return Seeker.getSeekerById(id);
        }
    ))

    .put('/', respond(
        ({ id, body }) => Seeker.updateById(id, body)
    ))

    .delete('/', respond(
        ({ id }) => {
            return Seeker.findByIdAndRemove(id);
        })
    );
