import * as supertest from "supertest";
import { faker } from "@faker-js/faker";
import { Response } from "superagent";

const request = supertest("http://localhost:8001/api/v1");

interface UserData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

describe("USER SIGN UP", () => {
  describe("POSITIVE TESTING SCENARIOS with async/await", () => {
    it("Should sign up a new user", async () => {
      const userData: UserData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "test12345",
        passwordConfirm: "test12345",
      };

      console.log(userData);

      try {
        //make POST request to sign up a new user
        const res = await request
          .post("/users/signup")
          .send(userData)
          .expect(201);

        //log the response
        console.log(res.body);

        //validate the response
        expect(res.body.status).toBe("success");
        expect(res.body.data.user.name).toBe(userData.name);
        expect(typeof res.body.data.user.name).toBe("string");
        expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
        expect(typeof res.body.data.user.email).toBe("string");
        expect(res.body.token).toBeDefined();
        expect(typeof res.body.token).toBe("string");
      } catch (error) {
        console.error("Error during sign up:", error);
        throw error;
      }
    });
  });
  describe("POSITIVE TESTING with .then", () => {
    it("Should sign up a new user", async () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "test12345",
        passwordConfirm: "test12345",
      };

      console.log(userData);

      //Make POST request to sign up a new user
      return request
        .post("/users/signup")
        .send(userData)
        .expect(201)
        .then((res: Response) => {
          //log the response
          console.log(res.body);

          //validate the response
          expect(res.body.status).toBe("success");
          expect(res.body.data.user.name).toBe(userData.name);
          expect(typeof res.body.data.user.name).toBe("string");
          expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
          expect(typeof res.body.data.user.email).toBe("string");
          expect(res.body.token).toBeDefined();
          expect(typeof res.body.token).toBe("string");

          //Additional validation for user object
          expect(res.body.data.user).toHaveProperty("_id");
          expect(res.body.data.user).not.toHaveProperty("password");
        })
        .catch((error) => {
          console.error("Error during sign up:", error);
          throw error;
        });
    });
  });

  describe("POSITIVE TESTING SCENARIOS with done() and end()", () => {
    it("Should sign up a new user", (done) => {
      const userData: UserData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "test12345",
        passwordConfirm: "test12345",
      };

      console.log(userData);

      request
        .post("/users/signup")
        .send(userData)
        .expect(201)
        .end((err: Error | null, res: Response) => {
          if (err) return done(err);
          try {
            expect(res.body.status).toBe("success");
            expect(res.body.data.user.name).toBe(userData.name);
            expect(typeof res.body.data.user.name).toBe("string");
            expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
            expect(typeof res.body.data.user.email).toBe("string");
            expect(res.body.token).toBeDefined();
            expect(typeof res.body.token).toBe("string");
            done();
          } catch (error) {
            console.error("Error during sign up:", error);
            done(error);
          }
        });
    });

    describe("NEGATIVE TESTING SCENARIOS with async/await", () => {
      it("Missing name", async () => {
        //create user data without name
        const userData = {
          email: faker.internet.email(),
          password: "test12345",
          passwordConfirm: "test12345",
          role: "user",
        };

        console.log(userData);

        try {
          //make POST request to sign up a new user without name
          const res = await request
            .post("/users/signup")
            .send(userData)
            .expect(400);

          console.log(res.body);

          //validate the response
          expect(res.body.status).toBe("fail");
          expect(res.body.message).toBe("Missing required fields: name");
        } catch (error) {
          console.error("Error during sign up:", error);
          throw error;
        }
      });
      it("User sign up is missing email", async () => {
        //create user data without email
        const userData = {
          name: faker.person.fullName(),
          password: "test12345",
          passwordConfirm: "test12345",
        };
        try {
          //make POST request to sign up a new user without email
          const res = await request
            .post("/users/signup")
            .send(userData)
            .expect(400);
          //log the response
          console.log(res.body);

          //validate the response
          expect(res.body.status).toBe("fail");
          expect(res.body.message).toBe("Missing required fields: email");
        } catch (error) {
          console.error("Error during sign up:", error);
          throw error;
        }
      });

      it("User sign up is missing password", async () => {
        const userData = {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          passwordConfirm: "test12345",
        };
        try {
          //make POST request to sign up a new user without password
          const res = await request
            .post("/users/signup")
            .send(userData)
            .expect(400);
          //log the response
          console.log(res.body);

          //validate the response
          expect(res.body.status).toBe("fail");
          expect(res.body.message).toBe("Missing required fields: password");
        } catch (error) {
          console.error("Error during sign up:", error);
          throw error;
        }
      });
      it("User sign up is missing password confirmation", async () => {
        //create user data without password confirmation
        const userData = {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: "test12345",
        };
        try {
          //make POST request to sign up a new user without password confirmation
          const res = await request
            .post("/users/signup")
            .send(userData)
            .expect(400);
          //log the response
          console.log(res.body);

          //validate the response
          expect(res.body.status).toBe("fail");
          expect(res.body.message).toBe(
            "Missing required fields: passwordConfirm"
          );
        } catch (error) {
          console.error("Error during sign up:", error);
          throw error;
        }
      });
    });

    describe("NEGATIVE TESTING SCENARIOS with .then", () => {
      it("Missing name", async () => {
        //create user data without name
        const userData = {
          email: faker.internet.email(),
          password: "test12345",
          passwordConfirm: "test12345",
          role: "user",
        };

        console.log(userData);

        //make POST request to sign up a new user without name
        return request
          .post("/users/signup")
          .send(userData)
          .expect(400)
          .then((res: Response) => {
            //log the response
            console.log(res.body);

            //validate the response
            expect(res.body.status).toBe("fail");
            expect(res.body.message).toBe("Missing required fields: name");
          })
          .catch((error) => {
            console.error("Error during sign up:", error);
            throw error;
          });
      });
    });
    describe("NEGATIVE TESTING SCENARIOS with .done() and .end()", () => {
      it("User sign up is missing name", (done) => {
        const userData = {
          email: faker.internet.email(),
          password: "test12345",
          passwordConfirm: "test12345",
          role: "user",
        };
        console.log(userData);
        request
          .post("/users/signup")
          .send(userData)
          .expect(400)
          .end((err: Error | null, res: Response) => {
            if (err) return done(err);
            try {
              expect(res.body.status).toBe("fail");
              expect(res.body.message).toBe("Missing required fields: name");
              done();
            }catch(error) {
              console.error("Error during sign up:", error);
              done(error);
            }
          })
      });
      it("User sign up is missing email", (done) => {
        const userData = {
          name: faker.person.fullName(),
          password: "test12345",
          passwordConfirm: "test12345",
          role: "user",
        };
        console.log(userData);
        request
          .post("/users/signup")
          .send(userData)
          .expect(400)
          .end((err: Error | null, res: Response) => {
            if (err) return done(err);
            try {
              expect(res.body.status).toBe("fail");
              expect(res.body.message).toBe("Missing required fields: email");
              done();
            }catch(error) {
              console.error("Error during sign up:", error);
              done(error);
            }
          })
      });
      it("User sign up is missing password", (done) => {
        const userData = {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          passwordConfirm: "test12345",
          role: "user",
        };
        console.log(userData);
        request
          .post("/users/signup")
          .send(userData)
          .expect(400)
          .end((err: Error | null, res: Response) => {
            if (err) return done(err);
            try {
              expect(res.body.status).toBe("fail");
              expect(res.body.message).toBe("Missing required fields: password");
              done();
            }catch(error) {
              console.error("Error during sign up:", error);
              done(error);
            }
          })
      });
      it("User sign up is missing password confirmation", (done) => {
        const userData = {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: "test12345",
          role: "user",
        };
        console.log(userData);
        request
          .post("/users/signup")
          .send(userData)
          .expect(400)
          .end((err: Error | null, res: Response) => {
            if (err) return done(err);
            try {
              expect(res.body.status).toBe("fail");
              expect(res.body.message).toBe("Missing required fields: passwordConfirm");
              done();
            }catch(error) {
              console.error("Error during sign up:", error);
              done(error);
            }
          })
      });
    });
  });
});
