//helper functions for tour 
//create signup
//beforeEach
//afterEach delete user
//each line use faker for the data about tour

import { faker } from "@faker-js/faker";
import {TourData, PartialTour} from "./interface";
import * as supertest from "supertest";
import { Response } from "superagent";
const request = supertest("http://localhost:8001/api/v1");

export function generateRandomTourData(): TourData{
    return {
        name: faker.lorem.words(3),
        duration: faker.number.int({min: 3, max: 20}),
        description: faker.lorem.paragraph(),
        maxGroupSize: faker.number.int({min: 5, max: 30}),
        summary: faker.lorem.sentence(),
        difficulty: faker.helpers.arrayElement(["easy", "medium", "difficult"]),
        price: faker.number.int({min: 100, max: 5000}),
        ratingsAverage: faker.number.float({min: 1, max: 5, fractionDigits: 0.1}),//precision      is not known parameter???
        imageCover: faker.image.urlPicsumPhotos(),
        guides: [],
        startDates: [faker.date.future().toISOString()],
        startLocation: {
            type: "Point",
            coordinates: [faker.location.longitude(), faker.location.latitude()], // [longitude, latitude]
        },
        locations: {
            type: "Point",
            coordinates: [faker.location.longitude(), faker.location.latitude()], // [longitude, latitude]
        },
    }
}