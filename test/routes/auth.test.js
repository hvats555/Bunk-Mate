const request = require("supertest");
const assert = require("chai").assert;
const {User} = require("../../models/users");

let server;
let token;

describe("/api/auth", () => {
    beforeEach(async () => {
        server = require("../../app");

        //adding a new user
        await request(server)
        .post("/api/register")
        .send({
            name : "abcd",
            email : "test@gmail.com",
            password : "test123"
        })
    }); 

    afterEach(async () => {
        server.close();
        await User.remove({});
    })

    const detailsExec = (token) => {
        return request(server)
        .get('/api/auth/me')
        .set('x-auth-token', token);
    }

    const loginExec = (requestBody) => {
        return request(server)
        .post('/api/auth')
        .send(requestBody)
    }

    describe("POST /api/auth/", () => {
        it("Should send 404 if user does not exist", async () => {
            const res = await loginExec({
                email : "email@gmail.com", // sending email that dosent not exist
                password : "test123"
            });

            assert.equal(res.status, 404);
        })

        it("Should send 401 if incorrect password is sent", async () => {
            const res = await loginExec({
                email : "test@gmail.com",
                password : "xyz" // sending incorrect password
            });

            assert.equal(res.status, 401);
        })

        it("Should send 400 if invalid response format is sent", async () => {
            const res = await loginExec({
                email : "test@gmail.com" // sending invalid request format
            });

            assert.equal(res.status, 400);
        })

        it("Should send 200 if user is logged in successfully", async () => {
            const res = await loginExec({
                email : "test@gmail.com",
                password : "test123"
            });
            assert.equal(res.status, 200);
        })
    })

    describe("GET /api/auth/me", () => {
        it("Should 200 if details of logged in user found", async () => {
            const res = await loginExec({
                email : "test@gmail.com",
                password : "test123"
            });

            const detailsResponse = await detailsExec(res.text);
            console.log(detailsResponse.body)
            assert.equal(detailsResponse.status, 200);
            assert.equal(detailsResponse.body.name, 'abcd');
            assert.equal(detailsResponse.body.email, 'test@gmail.com');
        })
    });
});