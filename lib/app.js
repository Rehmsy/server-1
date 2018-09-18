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
const pets = require('./routes/pets');
const seekers = require('./routes/seekers');


if(process.env.NODE_ENV !== 'production') {
    app.use(checkConnection());
}

app.use('/api/auth', auth);
app.use('/api/pets', ensureAuth, pets);
app.use('/api/seekers', ensureAuth, seekers);

app.use((req, res) => {
    res.sendFile('index.html', { root: './public'} );
});

app.use(errorHandler());

module.exports = app;