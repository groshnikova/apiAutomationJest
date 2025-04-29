export interface User {
    userId?: string;
    username?: string;
    email: string;
    avatar?: string;
    password: string;
    birthdate?: Date;
    registeredAt?: Date;
    name: string;
    passwordConfirm: string;
    role?: string;
  }

//   export type User = {
//     userId?: string;
//     username?: string;
//     email: string;
//     avatar?: string;
//     password: string;
//     birthdate?: Date;
//     registeredAt?: Date;
//     name: string;
//     passwordConfirm: string;
//     role?: string;
//   }

export interface ApiResponse {
    status: string;
    message?: string;
    data?: {
        user:{
            name: string;
            email: string;
            _id: string;
            [key: string]: any; 
        }
    };
    token?: string;
}