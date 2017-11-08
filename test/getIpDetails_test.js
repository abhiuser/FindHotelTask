'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../server.js'); // Our app

describe('API endpoint /getIPDetails', function () {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function () {

    });

    after(function () {

    });

    // GET - Invalid path
    it('invalid get path -> should return Not Found', function () {
        return chai.request(app)
            .get('/INVALID_PATH')
            .then(function (res) {
                throw new Error('Path exists!');
            })
            .catch(function (err) {
                expect(err).to.have.status(404);
            });
    });

    // GET - Details of an IP address.
    it('valid IP address -> should return details of an IP address', function () {
        return chai.request(app)
            .get('/api/getIPDetails?ip=200.106.141.15')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.response).to.be.an('object');
                expect(res.body.response).to.have.property("ip_address");
                expect(res.body.response).to.have.property("country_code");
                expect(res.body.response).to.have.property("country");
                expect(res.body.response).to.have.property("city");
                expect(res.body.response).to.have.property("latitude");
                expect(res.body.response).to.have.property("longitude");
                expect(res.body.response).to.have.property("mystery_value");
                expect(res.body.response.ip_address).to.not.equal(null);
                expect(res.body.response.country_code).to.not.equal(null);
                expect(res.body.response.country).to.not.equal(null);
                expect(res.body.response.city).to.not.equal(null);
                expect(res.body.response.latitude).to.not.equal(null);
                expect(res.body.response.longitude).to.not.equal(null);
                expect(res.body.response.mystery_value).to.not.equal(null);
            });
    });

    // GET - invalid IP address check.
    it('invalid IP address -> should return null', function () {
        return chai.request(app)
            .get('/api/getIPDetails?ip=200.106.141')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.response).to.be.equal(null);
            });
    });

});