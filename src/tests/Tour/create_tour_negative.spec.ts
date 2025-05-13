import * as supertest from "supertest";
import {Response} from "superagent";
import {PartialTourData} from "../../../helper/interface";
import { deleteFunction, getUser, signUp } from "../../../helper/user";

const request = supertest("http://localhost:8001/api/v1");

let cookie: string;
let adminUser: any;

describe("TOUR CREATE",() => {
    beforeAll(async () => {
        //Create an admin user
        adminUser = getUser("admin");
        //Sign up the admin user
        const signUpResponse: Response = await signUp(adminUser);
        expect(signUpResponse.statusCode).toBe(201);
        expect(signUpResponse.body.data.user.email).toEqual(
            adminUser.email.toLowerCase()
        );
        //Store authentication cookie
        cookie = signUpResponse.headers["set-cookie"][0].split(";")[0];
    });

    afterAll(async() => {
        await deleteFunction(cookie).then((res) => {
            expect(res.statusCode).toBe(200);
        });
    });
    it("should not create a tour with empty request body", async () => {
        const response: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send({});

            console.log("Response body:", response.body); // Log the response body for debugging

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("fail");
        expect(response.body.message).toContain("Request body cannot be empty");
    });
    it("should not create a tour with missing name", async () => {});
    it("should not create a tour with missing duration", async () => {});
    it("should not create a tour with missing maxGroupSize", async () => {});
    it("should not create a tour with missing difficulty", async () => {});
    it("should not create a tour with invalid difficulty", async () => {});
    it("should not create a tour with invalid rating (out of range)", async () => {});
    it("should not create a tour with discount price higher than regular price", async () => {});   
    it("should not create a tour with missing summary", async () => {});
    it("should not create a tour with missing image cover", async () => {});
    it("should not create a tour with missing start location coordinates", async () => {});
    it("should not create a tour with non-numeric start location coordinates", async () => {});
    it("should not create a tour with unauthorized user", async () => {});
})