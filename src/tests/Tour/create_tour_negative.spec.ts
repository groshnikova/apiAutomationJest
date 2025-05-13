import * as supertest from "supertest";
import {Response} from "superagent";
import {PartialTourData} from "../../../helper/interface";
import { deleteFunction, getUser, signUp } from "../../../helper/user";
import { generateRandomTourData } from "../../../helper/tour";

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
    it("should not create a tour with missing name", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        delete tourData.name; // Remove the name property to simulate missing data
        const noNameRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);
        console.log("Response body:", noNameRes.body); // Log the response body for debugging

        expect(noNameRes.statusCode).toBe(400);
        expect(noNameRes.body.status).toBe("fail");
        expect(noNameRes.body.message).toContain("A tour must have a name");
    });
    it("should not create a tour with missing duration", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        delete tourData.duration; // Remove the duration property to simulate missing data
        const noDurationRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);
        console.log("Response body:", noDurationRes.body); // Log the response body for debugging

        expect(noDurationRes.statusCode).toBe(400);
        expect(noDurationRes.body.status).toBe("fail");
        expect(noDurationRes.body.message).toContain("A tour must have duration");
    });
    it("should not create a tour with missing maxGroupSize", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        delete tourData.maxGroupSize; // Remove the maxGroupSize property to simulate missing data
        const noMaxGroupSizeRes: Response  = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);
        console.log("Response body:", noMaxGroupSizeRes.body); // Log the response body for debugging

        expect(noMaxGroupSizeRes.statusCode).toBe(400);
        expect(noMaxGroupSizeRes.body.status).toBe("fail");
        expect(noMaxGroupSizeRes.body.message).toContain("A tour must have a group size");
    });
    it("should not create a tour with missing difficulty", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        delete tourData.difficulty; // Remove the difficulty property to simulate missing data
        const noDifficultyRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);
        console.log("Response body:", noDifficultyRes.body); // Log the response body for debugging

        expect(noDifficultyRes.statusCode).toBe(400);
        expect(noDifficultyRes.body.status).toBe("fail");
        expect(noDifficultyRes.body.message).toContain("Difficulty is either: easy, medium, difficult");
    });
    it("should not create a tour with invalid difficulty", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        tourData.difficulty = "extreme" as "easy" | "medium" | "difficult";// Set an invalid difficulty
        const invalidDifficultyRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);

        console.log("Response body:", invalidDifficultyRes.body); // Log the response body for debugging

        expect(invalidDifficultyRes.statusCode).toBe(400);
        expect(invalidDifficultyRes.body.status).toBe("fail");
        expect(invalidDifficultyRes.body.message).toContain("Difficulty is either: easy, medium, difficult");

    });
    it("should not create a tour with invalid rating (out of range)", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        tourData.ratingsAverage = 6; // Set an invalid rating

        const invalidRatingRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);

        console.log("Response body:", invalidRatingRes.body); // Log the response body for debugging

        expect(invalidRatingRes.statusCode).toBe(400);
        expect(invalidRatingRes.body.status).toBe("fail");
        expect(invalidRatingRes.body.message).toContain("Ratings average must be between 1 and 5");
    });
    
    it("should not create a tour with missing summary", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        delete tourData.summary; // Remove the summary property to simulate missing data
        const noSummaryRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);
        console.log("Response body:", noSummaryRes.body); // Log the response body for debugging

        expect(noSummaryRes.statusCode).toBe(400);
        expect(noSummaryRes.body.status).toBe("fail");
        expect(noSummaryRes.body.message).toContain("A tour must have a summary");
    });
    it("should not create a tour with missing image cover", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        delete tourData.imageCover; // Remove the imageCover property to simulate missing data
        const noImageCoverRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);

        console.log("Response body:", noImageCoverRes.body); // Log the response body for debugging

        expect(noImageCoverRes.statusCode).toBe(400);
        expect(noImageCoverRes.body.status).toBe("fail");
        expect(noImageCoverRes.body.message).toContain("A tour must have a cover image");
    });
    it("should not create a tour with missing start location coordinates", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        delete tourData.startLocation?.coordinates;

        const noStartLocationRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);

        console.log("Response body:", noStartLocationRes.body); // Log the response body for debugging

        expect(noStartLocationRes.statusCode).toBe(400);
        expect(noStartLocationRes.body.status).toBe("fail");
        expect(noStartLocationRes.body.message).toContain("Invalid location format");
    });
    it("should not create a tour with non-numeric start location coordinates", async () => {
        const tourData: PartialTourData = generateRandomTourData();
        tourData.startLocation.coordinates = ["invalid", "data"] as any; // Set invalid coordinates

        const invalidCoordinatesRes: Response = await request
            .post("/tours")
            .set("Cookie", cookie)
            .send(tourData);

        console.log("Response body:", invalidCoordinatesRes.body); // Log the response body for debugging
        expect(invalidCoordinatesRes.statusCode).toBe(400);
        expect(invalidCoordinatesRes.body.status).toBe("fail");
        expect(invalidCoordinatesRes.body.message).toContain("Invalid location format");
    });
    it("should not create a tour with unauthorized user", async () => {});
})