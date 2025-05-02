//Declaration file for TypeScript

import supertest from "supertest";

// declare global {
//   namespace NodeJS {
//     interface Global {
//       request: supertest.SuperTest<supertest.Test>;
//     }
//   }
// }

declare global{
    const request: supertest.SuperTest<supertest.Test>;
}

/// <reference types="jest" />