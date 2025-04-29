// const userData: UserData = {
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     password: "test12345",
//     passwordConfirm: "test12345",
//   };
import { faker } from "@faker-js/faker";
import { User } from "./interface";
import * as supertest from "supertest";
const request = supertest("http://localhost:8001/api/v1");

export function getUser(role: string): User {
  const randomUser = createRandomUser();
  const password = "test12345";
  return {
    name: randomUser.username,
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
  };
  omitFields.forEach((field) => {
    delete randomUser[field as keyof User];
  });
    return randomUser;
}

export function createUserWithMissingField(omitFields: string, role: string): User {
    const randomUser = createRandomUser();
    const password = "test12345";
    const userData: User = {
        name: randomUser.username,
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
export async function signUp(user: User): Promise<any> {
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

export function signUp2(user: User): Promise<any> {
  return request
  .post("/users/signup")
  .send(user)
  .expect(201)
};

//Login user (Promise with async/await)
export async function loginUser(user: User): Promise<any> {
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

export function  loginUser2(user: User): Promise<any> {
  return request
  .post("/users/login")
  .send(user)
  .expect(200)
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

export function deleteFunction2(cookie: string): Promise<any> {
  return request
  .delete("/users/deleteMe")
  .set("Cookie", cookie)
  .expect(200)
}


export function validateErrorResponse(res: Response, missingField: string):void {
    
}


