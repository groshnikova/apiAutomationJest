import * as supertest from "supertest";
import {
  createUserWithMissingField,
  getUser,
  signUp,
  validateErrorResponse,
} from "../../helper/user";
import { PartialUser, User } from "../../helper/interface";

const request = supertest("http://localhost:8001/api/v1");

describe("USER SIGN UP", () => {
  //Test cases for negative scenarios
  const negativeTestCases = [
    { description: "User sign up is missing name", field: "name" },
    { description: "User sign up is missing email", field: "email" },
    { description: "User sign up is missing password", field: "password" },
    {
      description: "User sign up is missing password confirmation",
      field: "passwordConfirm",
    },
  ];

  //Setup and teardown hooks
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("POSITIVE TESTING SCENARIOS", () => {
    it("Should sign up a new user", async () => {
      try {
        //Getting a random user from the helper function
        const user : User = getUser("user");
        console.log("Test user data:", user);

        //Make the POST request
        const res = await signUp(user);
        console.log("Response body:", res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        expect(res.body.data.user.name).toBe(user.name);
        expect(res.body.data.user.email).toBe(user.email);
        expect(res.body.token).toBeDefined();
      } catch (error) {
        console.error("Error during sign up:", error);
        throw error;
      }
    });
  });

  describe("NEGATIVE TESTING SCENARIOS", () => {
    negativeTestCases.forEach(({ description, field }) => {
      it(description, async () => {
        try {
          //Creating a user with a missing field
          const invalidUser : PartialUser = createUserWithMissingField([field]);
          console.log(`Test data for ${description}:`, invalidUser);

          const res = await signUp(invalidUser);
          console.log("Response body:", res.body);

          validateErrorResponse(res, field);
        } catch (error) {
          console.error(`Error during test (${description})`, error);
          throw error;
        }
      });
    });
  });
});
