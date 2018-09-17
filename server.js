require('dotenv').config();
const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');

connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}` || 'mongodb://localhost:27017/rehome');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    // eslint-disable-next-line
    console.log('server running on', server.address().port);
});