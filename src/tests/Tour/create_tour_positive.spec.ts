import * as supertest from "supertest";
import { getUser, signUp } from "../../../helper/user";
const request = supertest("http://localhost:8001/api/v1");


let cookie: string;
describe("TOUR CREATE", () => {
  it("create tour", async () => {
    const userImport = getUser("admin");
    console.log("----------userImport----------", userImport);
    await signUp(userImport).then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.data.user.email).toEqual(userImport.email.toLowerCase());
      cookie = res.headers["set-cookie"][0].split(";")[0];
    });
    await request
      .post("/tours")
      .set("Cookie", cookie)
      .send(
      }).then(tourRes => {
        console.log(tourRes.body, "tourRes");
        expect(tourRes.statusCode).toBe(201);
        expect(tourRes.body.data.difficulty).toEqual("easy");

      })
  });
});
