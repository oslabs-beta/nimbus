const request = require('supertest');
const dotenv = require('dotenv');
dotenv.config();

const app = require('../server/server.js');


describe ("POST /", () => {
    describe("should respond to a successful login", () => {
        test("should respond with a JWT access token", async () => {
            const response = await request(app).post("/login").send({
                email: process.env.DEMO_USERNAME, 
                password: process.env.DEMO_PASSWORD,
            });
            expect(response.body.accessToken).toBeDefined();
        }); 
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/login").send({
                email: process.env.DEMO_USERNAME, 
                password: process.env.DEMO_PASSWORD,
            })
            expect(response.statusCode).toBe(200);
        });
    });

    describe("should reject invalid credentials on login", () => {
        test("should send error when user does not exist", async () => {
            const response = await request(app).post("/login").send({
                email: process.env.DEMO_USERNAME, 
                password: "invalid",
            })
            expect(response.body.err).toEqual("Wrong password");
        });
        test("should send error when user does not exist", async () => {
            const response = await request(app).post("/login").send({
                email: "invalid", 
                password: "invalid",
            })
            expect(response.body.err).toEqual("User not in database");
        });
    });
}); 



