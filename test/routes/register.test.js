const request = require("supertest");
const assert = require("chai").assert;
const {User} = require("../../models/users");

let server;

describe("/api/register", () => {
    beforeEach(() => {
        server = require("../../app");
    });

    afterEach(async () => {
        server.close();
        await User.remove({});
    });

    const registerExec = (requestBody) => {
        return request(server)
        .post("/api/register")
        .send(requestBody)
    }

    it("Should return 400 when invalid request body is sent", async () => {
        let res = await registerExec({
            name : ""                         // Sending invalid request body
        });
        assert.equal(res.status, 400);
    });

    it("Should return 200 when registration is successful", async () => {
        let res = await registerExec({
            name : "abcd",
            email : "test@gmail.com",
            password : "test123"
        });
        assert.equal(res.status, 200);
        assert.equal(res.body.name, 'abcd');
        assert.equal(res.body.email, 'test@gmail.com');
    })
});
