const router = require('express').Router();
const Seeker = require('../models/seeker');
const ensureAuth = require('../auth/ensure-auth')();
// const { sign } = require('../auth/token-service');



// const { respond, getParam } = require('../utils/route-helpers');


router
    .get('/verify', ensureAuth, (req, res) => {
        res.send({ valid: true });  
    }) 
    .post('/details', ensureAuth, (req, res, next) => {
        // const { name, kids, activity, zip, otherPets, interested, favorites } = req.body;
        // Seeker.exists({ name })
        //     .then(exists => {
        //         if
        //     })
        Seeker.create(req.body)
            .then(seeker => res.json(seeker))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Seeker.find()
            .lean()
            .then(seekers => res.json(seekers))
            .catch(next);
    });

module.exports = router;