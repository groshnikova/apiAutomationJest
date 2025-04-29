import * as supertest from "supertest";

const request = supertest("http://localhost:8001/api/v1");

describe("USER SIGN UP", () => {
  describe("POSITIVE TESTING SCENARIOS", () => {
    it("Should sign up a new user", async () => {
      const userData = {
        name: "John Doe",
        email: "john5555@example.com",
        password: "mypassword123",
        passwordConfirm: "mypassword123",
        role: "user",
      };
      const res = await request.post("/users/signup").send(userData);
      console.log(res.body);
      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
    });
  });

  describe.only("NEGATIVE TESTING SCENARIOS", () => {
    it("User sign up is missing name", async () => {
      const userData = {
        email: "john555@example.com",
        password: "mypassword123",
        passwordConfirm: "mypassword123",
        role: "user",
      };
      const res = await request.post("/users/signup").send(userData);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Missing required fields: name");
    });
    it("User sign up is missing email", async () => {
      const userData = {
        name: "John Doe",
        password: "mypassword123",
        passwordConfirm: "mypassword123",
      };
      console.log(userData);
      const res = await request.post("/users/signup").send(userData);
      console.log(res.body.message);
      console.log(res.body);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Missing required fields: email");
    });
    it("User sign up is missing password", async () => {
      const userData = {
        name: "John Doe",
        email: "john9@example.com",
        passwordConfirm: "mypassword123",
      };
      console.log(userData);
      const res = await request.post("/users/signup").send(userData);
      console.log(res.body.message);
      console.log(res.body);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Missing required fields: password");
    });
    it("User sign up is missing password confirmation", async () => {
      const userData = {
        name: "John Doe",
        email: "john9@example.com",
        password: "mypassword123",
      };
      console.log(userData);
      const res = await request.post("/users/signup").send(userData);
      console.log(res.body.message);
      console.log(res.body);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Missing required fields: passwordConfirm");
    });
  });
});
