const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
//const { assert } = chai;
const http = require('http');

const app = require('../../lib/app');
const server = http.createServer(app);
const request = chai.request(server).keepOpen();
<<<<<<< HEAD
=======
//.keepOpen() after server?

request.checkOk = res => {
    if(res.status !== 200) throw new Error('expected 200 http status code');
    return res;
};

request.save = (data, path, token = '') => {
    return request
        .post(`/api/${path}`)
        .set('Authorization', token)
        .send(data)
        .then(request.checkOk)
        .then(({ body }) => body);
};

request.getToken = () => request
    .post('/api/auth/signup')
    .send({
        name: 'email2@email.com',
        password: 'abc'
    })
    .then(({ body }) => body.token);
>>>>>>> master

after(done => server.close(done));

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