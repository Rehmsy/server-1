//const auth = require('../services/auth'); fb
const tokenService = require('./token-service');

module.exports = function getEnsureAuth() {

    return function ensureAuth(req, res, next) {
        const token = req.get('authorization');
        if(!token) return next({ code: 401, error: 'No Authorization Found' });

        //auth.verify(token) fb
        tokenService.verify(token)
            .then(
                payload => {
                    //req.user = { id: result.uid }; fb
                    req.user = payload;
                    next();
                }, () => {
                    next({ code: 401, error: 'Authorization Failed' });
                }
            );
    };
};