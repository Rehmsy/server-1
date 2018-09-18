const { assert } = require('chai');
const { request, checkOk } = require('./request');
const { dropCollection, createToken } = require('./db');
// const tokenService = require('../../lib/auth/token-service');

describe.only('Seekers API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('seekers'));

    // let jimbo;
    
    let token = '';
    beforeEach(() => createToken().then(t => token = t));
    
    let bubba;
    console.log('*** token', token);
    beforeEach(() => {
        console.log('*** token', token);
        return request
            .post('/api/seekers/details')
            .set('Authorization', token)
            .send({ 
                name: bubba._id,
                kids: false,
                activity: ['Low'],
                zipCode: bubba._id,
                otherPets: false,
                interested: [{}],
                favorites: [{}]
            })
            .then(checkOk)
            .then(({ body }) => {
                token = body.token;
                bubba = body.seeker;
            });
    });

    it('saves a seeker to details page', () => {
        console.log('*** token', token);
        assert.isDefined(token);
    });
    // beforeEach(() => {
    //     return request
    //         .post('/api/seekers')
    //         .set('Authorization', token)
    //         .send({ seeker: 'Jimbo'})
    //         .then(checkOk)
    //         .then(({ body }) => {
    //             jimbo = body;
    //         });
    // });

    // it('saves a seeker', () => {
    //     console.log('***', seeker1.goal);

    //     assert.equal(seeker1.seeker, 'Bubba');
    // });
});

