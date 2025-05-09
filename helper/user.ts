// const userData: UserData = {
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     password: "test12345",
//     passwordConfirm: "test12345",
//   };
import { faker } from "@faker-js/faker";
import { PartialUser, User } from "./interface";
import * as supertest from "supertest";
import { Response } from "superagent";
const request = supertest("http://localhost:8001/api/v1");

export function getUser(role: string): User {
  const randomUser = createRandomUser();
  const password = "test12345";
  return {
    name: randomUser.username || faker.person.fullName(),
    email: randomUser.email.toLowerCase(),
    password: password,
    passwordConfirm: password,
    role: role,
  };
}

export function createRandomUser(omitFields: string[] = []): User {
  const randomUser: User = {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    name: faker.person.fullName(),
    passwordConfirm: faker.internet.password(),
  };
  omitFields.forEach((field) => {
    delete randomUser[field as keyof User];
  });
    return randomUser;
}

export function createUserWithMissingField(omitFields: string[] = [], role: string = "user"): User {
    const randomUser = createRandomUser();
    
    const password = "test12345";
    const userData: User = {
        name: randomUser.username || faker.person.fullName(),
        email: randomUser.email.toLowerCase(),
        password: password,
        passwordConfirm: password,
        role: "user",
    };
    omitFields.forEach((field) => {
        delete userData[field as keyof User];
    });
        return userData;
}

//Sign up user (Promise with async/await)
export async function signUp(user: User | PartialUser): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .post("/users/signup")
      .send(user)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
};

export function signUp2(user: User | PartialUser) {
  return request
  .post("/users/signup")
  .send(user)
};

//Login user (Promise with async/await)
export async function loginUser(user: User | PartialUser): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .post("/users/login")
      .send(user)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
};

export function  loginUser2(user: User | PartialUser) {
  return request
  .post("/users/login")
  .send(user)
}

export async function deleteFunction(cookie: string): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .delete("/users/deleteMe")
      .set("Cookie", cookie)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}

export function deleteFunction2(cookie: string){
  return request
  .delete("/users/deleteMe")
  .set("Cookie", cookie)
  .expect(200)
}


export function validateErrorResponse(res: any, missingField: string):void {
    expect(res.status).toBe(400);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toBe(`Missing required fields: ${missingField}`);
    
}


