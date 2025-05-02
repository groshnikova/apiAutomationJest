import { User } from "../../helper/interface";
import { deleteFunction, getUser, loginUser, signUp } from "../../helper/user";
let cookie: string;
describe("USER UPDATE - /users/updateMe", () => {
  beforeAll(async () => {
    const user: User = getUser("admin");

    const signUpResponse = await signUp(user);
    expect(signUpResponse.statusCode).toBe(201);

    const loginResponse = await loginUser({
      email: user.email,
      password: user.password,
    });
    expect(loginResponse.statusCode).toBe(200);

    cookie = loginResponse.headers["set-cookie"][0].split(";")[0];
  });
  afterAll(async () => {
    await deleteFunction(cookie).then((res) => {
      expect(res.statusCode).toBe(200);
    });
  });
  it("Should update user's photo", async () => {
    const responsePhoto = await request
      .patch("/users/updateMe")
      .set("Cookie", cookie)
      .attach("photo", "data/photo/pasv.png");

    expect(responsePhoto.statusCode).toBe(200);
  });
  it("Should update user's name", async () => {
    const responseName = await request
      .patch("/users/updateMe")
      .set("Cookie", cookie)
      .send({
        name: "Updated Name",
      });

    expect(responseName.statusCode).toBe(200);
  });
});
