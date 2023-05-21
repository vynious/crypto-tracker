import request from "supertest";
import {app} from "../app.js";

// check if can login. 
describe("authentication cases", () => {
    it("correctly return user (admin)", async () => {
        const mock = {
            email: "admin@admin.com",
            password: "admin"
        };
        await request(app).post('/auth/login')
                                    .send(mock)
                                    .expect(res => {
                                        expect(res.statusCode).toBe(201)
                                        expect(res.body.user).toHaveProperty("username")
                                    })
    });

    // it("password validation", async () => {
    //     const mockRegistration = {
    //         username: "jest",
    //         email: "jest@jest.com",
    //         password: "jest1234"
    //     };
    //     await request(app).post('/auth/register')
    //                     .send(mockRegistration)
    //                     .expect(res => {
    //                         expect(res.statusCode).toBe(201)
    //                         expect(res.body.user).toHaveProperty("_id")
    //                     });
    // })
})

