const assert = require('chai').assert;
const request = require('supertest');
const mongoose = require('mongoose');
const {Subject} = require('../../models/subjects');
const {User} = require('../../models/users');
let server;
let token;

describe("Testing validate object id middleware", () => {
    beforeEach(() => {
        server = require('../../app');
        token = new User().generateAuthToken();
    });

    afterEach(async () => {
        server.close();
        await Subject.remove({});
    });

    const exec = (id) => {
        return request(server)
        .get(`/api/subjects/${id}`)
        .set('x-auth-token', token);
    }

    it("Should return 400 if object id is invalid", async () => {
        let subjectId = 'a'; // passing invalid id 
        let res = await exec(subjectId);
        assert.equal(res.status, 400);
    });

    it("Should return 200 if object id is valid", async () => {
        const subject = new Subject({
            user : {
                _id : mongoose.Types.ObjectId().toHexString()
            },
            title : "subject"
        });
        await subject.save();
        let res = await exec(subject._id);
        assert.equal(res.status, 200);
    });
})