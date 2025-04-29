import { User } from "../../helper/interface";
import {
  deleteFunction,
  deleteFunction2,
  getUser,
  loginUser,
  loginUser2,
  signUp,
  signUp2,
} from "../../helper/user";
import * as supertest from "supertest";
const request = supertest("http://localhost:8001/api/v1");

describe("USER SIGNUP AND LOGIN", () => {
  const user: User = getUser("admin");
  let cookie: string;
  describe("POSITIVE TESTING", () => {
    it("Should signup, login and delete user", async () => {
      try {
        //Make the POST request
        const res = await signUp(user);

        //validate the response
        expect(res.statusCode).toBe(201);
        expect(res.body.data.user.email).toEqual(user.email);
        expect(res.body.status).toEqual("success");

        //Login the user
        const loginResponse = await loginUser(user);

        //Validate the login response
        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body.status).toBe("success");
        expect(loginResponse.body.token).toBeDefined();

        console.log(loginResponse.body);
        cookie = loginResponse.headers["set-cookie"][0].split(";")[0];

        //Delete the user
        const deleteResponse = await deleteFunction(cookie);

        //Validate the delete response
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.message).toBe("User deleted successfully");

        //Login the user again
        const loginAfterDeleteResponse = await loginUser(user);

        //Validate the login response
        expect(loginAfterDeleteResponse.statusCode).toBe(401);
        expect(loginAfterDeleteResponse.body.status).toBe("fail");
        expect(loginAfterDeleteResponse.body.message).toBe(
          "Incorrect email or password"
        );
      } catch (error) {
        console.error("Error during sign up:", error);
        throw error;
      }
    });
  });

  it("Should signup, login and delete user using then()", () => {
    return signUp(user)
      .then((res) => {
        console.log(res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body.data.user.email).toEqual(user.email);
        expect(res.body.status).toEqual("success");

        return loginUser(user);
      })
      .then((loginResponse) => {
        console.log(loginResponse.body);

        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body.status).toBe("success");

        console.log("cookie", loginResponse.headers["set-cookie"][0]);
        cookie = loginResponse.headers["set-cookie"][0].split(";")[0];

        return deleteFunction(cookie);
      })
      .then((deleteResponse) => {
        console.log(deleteResponse.body);

        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.message).toBe("User deleted successfully");

        return loginUser(user);
      })
      .then((loginAfterDeleteResponse) => {
        console.log(loginAfterDeleteResponse.body);

        expect(loginAfterDeleteResponse.statusCode).toBe(401);
        expect(loginAfterDeleteResponse.body.status).toBe("fail");
        expect(loginAfterDeleteResponse.body.message).toBe(
          "Incorrect email or password"
        );
      });
  });
  it("Should signup, login and delete user using .end(done callback)", (done) => {
    signUp2(user).end((err, res) => {
      if (err) return done(err);
      console.log(res.body);
      expect(res.statusCode).toBe(201);
      expect(res.body.data.user.email).toEqual(user.email);

      loginUser2(user).end((err, loginResponse) => {
        if (err) return done(err);
        console.log(loginResponse.body);
        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body.status).toBe("success");
        console.log("cookie", loginResponse.headers["set-cookie"][0]);
        cookie = loginResponse.headers["set-cookie"][0].split(";")[0];
        deleteFunction2(cookie).end((err, deleteResponse) => {
          if (err) return done(err);
          console.log(deleteResponse.body);
          expect(deleteResponse.statusCode).toBe(200);
          expect(deleteResponse.body.message).toBe("User deleted successfully");

          loginUser2(user).end((err, loginAfterDeleteResponse) => {
            if (err) return done(err);
            console.log(loginAfterDeleteResponse.body);
            expect(loginAfterDeleteResponse.statusCode).toBe(401);
            expect(loginAfterDeleteResponse.body.status).toBe("fail");
            expect(loginAfterDeleteResponse.body.message).toBe(
              "Incorrect email or password"
            );
            done();
          });
        });
      });
    });
  });
});
