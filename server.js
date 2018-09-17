require('dotenv').config();
const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rehome';

connect(MONGODB_URI);

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
    // eslint-disable-next-line
    console.log('server running on', server.address().port);
});