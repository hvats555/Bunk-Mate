const assert = require('chai').assert;
const request = require('supertest');
const {Subject} = require('../../models/subjects');
const {User} = require('../../models/users');
let token;
let server;

describe("Auth middleware test", () => {
    beforeEach(() => {
        server = require('../../app');
        token = new User().generateAuthToken();
    });

    afterEach(() => {
        server.close();
    });

    const exec = () => {
        return request(server)
            .get('/api/subjects')
            .set('x-auth-token', token);
    }

    it("Should return 401 if no token is provided", async () => {
        token = '';
        const res = await exec();
        assert.equal(res.status, 401);
    });

    it("Should return 400 if token is invalid", async () => {
        token = 'a'; // sending invalid token
        const res = await exec();
        assert.equal(res.status, 400);
    });

    it("Should return 200 if token is valid ", async () => {
        const res = await exec();
        assert.equal(res.status, 200);
    });

});