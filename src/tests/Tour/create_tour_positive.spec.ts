import * as supertest from "supertest";
import { getUser, signUp, deleteFunction } from "../../../helper/user";
import { generateRandomTourData} from "../../../helper/tour";

import { Response } from "superagent";
import { TourData } from "../../../helper/interface";

const request = supertest("http://localhost:8001/api/v1");

let cookie: string;
let adminUser: any;

describe("TOUR CREATE", () => {
  beforeAll(async () => {
    // Create an admin user
    adminUser = getUser("admin");

    //Sign up the admin user
    const signUpRes: Response = await signUp(adminUser);
    expect(signUpRes.statusCode).toBe(201);
    expect(signUpRes.body.data.user.email).toEqual(
      adminUser.email.toLowerCase()
    );

    //Store authentication cookie
    cookie = signUpRes.headers["set-cookie"][0].split(";")[0];
  });
  afterAll(async () => {
    await deleteFunction(cookie).then((res) => {
      expect(res.statusCode).toBe(200);
    });
  });

  //Positive test: Create Tour
  it("should create tour successfully", async () => {
    // Generate random tour data
    const tourData: TourData = generateRandomTourData();
    const response: Response = await request
      .post("/tours")
      .set("Cookie", cookie)
      .send(tourData);

    console.log("Response body:", response.body); // Log the response body for debugging

    //Assertions
    expect(response.statusCode).toBe(201);
    expect(response.body.data.name).toBe(tourData.name);
    expect(response.body.data.price).toBe(tourData.price);
    expect(response.body.data.difficulty).toBe(tourData.difficulty);
    expect(response.body.data.startLocation.coordinates).toEqual(
      tourData.startLocation.coordinates
    );
  })
});
