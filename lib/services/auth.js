const admin = require('firebase');
//TODO: get this file from firebase
const serviceAccount = require('../../firebase-adminsdk-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

module.exports = {
    verify(token) {
        return admin.auth().verifyIdToken(token);
    },
    getByUid(uid) {
        return admin.auth().getUser(uid);
    }
};