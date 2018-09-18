require('dotenv').config();
const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET;

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
            email: user.email,
            zip: user.zip
        };
        return jwt.signAsync(payload, appSecret);
    },
    verify(token) {
        return jwt.verifyAsync(token, appSecret);
    }
};