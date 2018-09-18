const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
const ensureAuth = require('./auth/ensure-auth')();

require('./models/register-plugins');

const redirectHttp = require('./utils/redirect-http');
const checkConnection = require('./utils/check-connection');

if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp());
}

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());

const auth = require('./routes/auth');
const seekers = require('./routes/seekers');
// const users = require('./routes/users');
const pets = require('./routes/pets');

if(process.env.NODE_ENV !== 'production') {
    app.use(checkConnection());
}

app.use('/api/auth', auth);
app.use('/api/seekers', ensureAuth, seekers);
// app.use('/api/users', ensureAuth, users);

app.use('/api/pets', pets);

app.use((req, res) => {
    res.sendFile('index.html', { root: './public'} );
});

app.use(errorHandler());

module.exports = app;