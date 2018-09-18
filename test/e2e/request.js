const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const http = require('http');

const app = require('../../lib/app');

const server = http.createServer(app);
const request = chai.request(server).keepOpen();

after(() => server.close());

const checkOk = res => {
    if(res.status !== 200) throw new Error('expected http 200 status code');
    return res;
};

const save = (path, data, token = null) => {
    return request
        .post(`/api/${path}`)
        .set('Authorization', token)
        .send(data)
        .then(checkOk)
        .then(({ body }) => body);
};


module.exports = {
    request,
    checkOk,
    save

};