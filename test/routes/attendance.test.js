const assert = require("chai").assert;
const mongoose = require("mongoose");
const {User} = require("../../models/users");
const {Subject} = require("../../models/subjects");
const request = require("supertest");

let server;
let token;


describe("/api/attendance", () => {
    beforeEach(() => {
        server = require("../../app");
        token = new User().generateAuthToken();
    });

    afterEach(async () => {
        server.close();
        await Subject.remove({});
    });

    const exec = async (attendanceStatus) => {
        let newsubjectResponse = await request(server)
        .post('/api/subjects')
        .send({
            user : {
                _id : mongoose.Types.ObjectId().toHexString()
            },
            title : "subject"
        })
        .set('x-auth-token', token);

        return request(server)
            .patch(`/api/attendance/${newsubjectResponse.body._id}`)
            .send({status : attendanceStatus})
            .set("x-auth-token", token);
    }

    describe("PATCH /api/attendance", () => {
        it("Should increase attended and total value by one when class is attended", async () => {
            let attendanceResponse = await exec("attended");

            assert.equal(attendanceResponse.body.attendance.attended, 1);
            assert.equal(attendanceResponse.body.attendance.total, 1);
            assert.equal(attendanceResponse.body.attendance.missed, 0);
            
        });

        it("Should increase missed and total value by one when class is missed", async () => {
            let attendanceResponse = await exec("missed");

            assert.equal(attendanceResponse.body.attendance.attended, 0);
            assert.equal(attendanceResponse.body.attendance.total, 1);
            assert.equal(attendanceResponse.body.attendance.missed, 1);  
        });

        it("Should return 400 in input is less than 6", async () => {
            let attendanceResponse = await exec("aaaaa"); //  status of length less than 6

            assert.equal(attendanceResponse.status, 400);
        });

        it("Should return 400 in input is more than 9", async () => {
            let attendanceResponse = await exec("aaaaaaaaaa"); //  status of length more than 9

            assert.equal(attendanceResponse.status, 400);
        });
    });
})