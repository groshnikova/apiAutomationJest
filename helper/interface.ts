export interface User {
    userId?: string;
    username?: string;
    email: string; // Required!
    avatar?: string;
    password: string; // Required!
    birthdate?: Date;
    registeredAt?: Date;
    name: string; // Required!
    passwordConfirm: string; // Required!
    role?: string;
  }


  // making all the fields optional
  export type PartialUser = Partial<User>;

  
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