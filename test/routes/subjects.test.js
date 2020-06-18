const assert = require('chai').assert;
const mongoose = require('mongoose');
const request = require('supertest');
const {User} = require("../../models/users");
const {Subject} = require("../../models/subjects");
let server;
let token;

describe("/api/subjects", () => {
    beforeEach(() => {
        server = require("../../app");
        token = new User().generateAuthToken();
    });
    afterEach(async () => {
        server.close();
        await Subject.remove({});
    });
    //let token = new User().generateAuthToken(); // auth token is providede to by default, set token to null to remove token

    const getExec = (route) => {
        return request(server)
        .get(route)
        .set('x-auth-token', token);
    }

    const postExec = (title) => {
        return request(server)
                .post('/api/subjects')
                .send({
                    user : {
                        _id : mongoose.Types.ObjectId().toHexString()
                    },
                    title : title
                })
                .set('x-auth-token', token);
    }

    const putExec = (id, newTitle) => {
        return request(server)
            .put(`/api/subjects/${id}`)
            .send({title : newTitle})
            .set('x-auth-token', token);
    }

    const deleteExec = (id) => {
        return request(server)
        .delete(`/api/subjects/${id}`)
        .set('x-auth-token', token);
    }

    describe("GET /", () => {
        it("should return all subjects", async () => {
            await Subject.collection.insertMany([
                {"title" : "subject1"},
                {"title" : "subject2"}
            ]);

            let res = await getExec("/api/subjects");
            
            assert.equal(res.status, 200);
            assert.lengthOf(res.body, 2);
            assert.equal(res.body[0].title, 'subject1');
            assert.equal(res.body[1].title, 'subject2');
        })
    });

    describe("GET /:id", () => {
        it("Should return single subject if id is valid", async () => {
            const subject = new Subject({
                user : {
                    _id : mongoose.Types.ObjectId().toHexString()
                },
                title : "subject"
            });
            await subject.save();
            let res = await getExec(`/api/subjects/${subject._id}`);
            assert.equal(res.status, 200);
        });
    });

    describe("POST /", () => {
        it("Should send 400 if title length is less than 2", async () => {
            const testTitle = "a" // title length is less than 2
            
            let res = await postExec(testTitle);

            assert.equal(res.status, 400);
        });

        it("Should send 400 if title length is more than 100", async () => {
            const testTitle = new Array(110).join()
            let res = await postExec(testTitle);

            assert.equal(res.status, 400);
        });

        it("Should add a new subject input is valid", async () => {
            let res = await postExec("subject");

            const subject = Subject.findById(res.body._id);

            assert.equal(res.status, 200);
            assert.notEqual(subject, null);
        });
    });

    describe("PUT /:id", () =>{
        it("Should return 400 if updated title is less than 2", async () => {
            let newTitle = 'a';
            let res = await postExec("subject");

            let updateResponse = await putExec(res.body._id, newTitle);

            assert.equal(updateResponse.status, 400);
        });

        it("Should return 400 if updated title is more than 100", async () => {
            let newTitle = new Array(110).join();
            let res = await postExec("subject");

            let updateResponse = await putExec(res.body._id, newTitle);

            assert.equal(updateResponse.status, 400);
        });

        it("Should update the subject title", async () => {
            let newTitle = "newSubject"
            let res = await postExec("subject");

            let updateResponse = await putExec(res.body._id, newTitle);

            assert.equal(updateResponse.body.title, 'newSubject');
        });
    });

    describe("DELETE /:id", () => {
        it("Should send 404 if subject not found with given id", async () => {
            const subjectId = mongoose.Types.ObjectId().toHexString();
            let deleteRes = await deleteExec(subjectId);

            assert.equal(deleteRes.status, 404);
        });

        it("Should delete the subject", async () => {
            let res = await postExec("subject");
            let deleteRes = await deleteExec(res.body._id);

            assert.equal(deleteRes.status, 200);
        });
    });
});
