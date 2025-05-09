import { User } from "../../helper/interface";
import { deleteFunction, getUser, loginUser, signUp } from "../../helper/user";
let cookie: string;
<<<<<<< HEAD

=======
>>>>>>> master
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
<<<<<<< HEAD

  it("Should reject password update via updateMe route", async () => {
    const responsePassword = await request
      .patch("/users/updateMe")
      .set("Cookie", cookie)
      .send({
        password: "newpassword123",
      });
      

    expect(responsePassword.statusCode).toBe(400);
    expect(responsePassword.body.status).toBe("fail");
    expect(responsePassword.body.message).toContain("This route is not for password updates.");
  });
  it("Should reject updates without a token", async () => {
    const responseNoToken = await request
      .patch("/users/updateMe")
      .send({
        name: "Updated Name",
      });
      console.log("Response body:", responseNoToken.body);
    expect(responseNoToken.statusCode).toBe(401);
    expect(responseNoToken.body.status).toBe("fail");
    expect(responseNoToken.body.message).toContain("You are not logged in!");
  });
  it("Should reject invalid email format", async () => {
    const responseInvalidEmail = await request
      .patch("/users/updateMe")
      .set("Cookie", cookie)
      .send({
        email: "invalid-email",
      })
      
    expect(responseInvalidEmail.statusCode).toBe(500);
    expect(responseInvalidEmail.body.status).toBe("error");
    expect(responseInvalidEmail.body.message).toContain("Validation failed: email: Please provide a valid email");
    
  });
  it("Should reject empty request body", async () => {
    const responseEmptyBody = await request
      .patch("/users/updateMe")
      .set("Cookie", cookie)
      .send({});

    expect(responseEmptyBody.statusCode).toBe(400);
    expect(responseEmptyBody.body.status).toBe("fail");
    expect(responseEmptyBody.body.message).toContain("No fields to update.");
  });
  it.only ("Should reject unauthorized field updates(role, reset token", async () => {
    const responseUnauthorizedField = await request
      .patch("/users/updateMe")
      .set("Cookie", cookie)
      .send({
        role: "user",
        name: "Updated Name",
        
      });

      console.log("Response body:", responseUnauthorizedField.body);

      expect(responseUnauthorizedField.body.data.user.role).toBe("user");
 

    expect(responseUnauthorizedField.statusCode).toBe(400);
    expect(responseUnauthorizedField.body.status).toBe("fail");
    expect(responseUnauthorizedField.body.message).toContain("This route is not for password updates.");
  });
  it ("Should reject requests with an invalid token", async () => {
    const responseInvalidToken = await request
      .patch("/users/updateMe")
      .set("Cookie", "invalid-token")
      .send({
        name: "Updated Name",
      });

    expect(responseInvalidToken.statusCode).toBe(401);
    expect(responseInvalidToken.body.status).toBe("fail");
    expect(responseInvalidToken.body.message).toContain("You are not logged in!");
  });
  it ("Should successfully update user name and email and the user can login", async () => {
    const newEmail = "bulkaandKarina@gmail.com"
    const responseUpdate = await request
      .patch("/users/updateMe")
      .set("Cookie", cookie)
      .send({
        name: "Updated Name",
        email: newEmail,
      });
    expect(responseUpdate.statusCode).toBe(200);
    expect(responseUpdate.body.status).toBe("success");
    expect(responseUpdate.body.data.user.name).toBe("Updated Name");
    expect(responseUpdate.body.data.user.email).toBe("bulkaandkarina@gmail.com");

    const user = getUser("admin");
    const originalPassword = user.password;

    const loginResponse = await loginUser({ email: newEmail, password: user.password });
    console.log("Login response:", loginResponse.body);

    expect(loginResponse.statusCode).toBe(200);

  });
=======
>>>>>>> master
});
