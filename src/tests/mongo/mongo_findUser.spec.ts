import { getUser, signUp } from "../../../helper/user";

const { MongoClient, Db } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

describe("MONGODB connection", () => {
  let connection;
  let db: typeof Db;

  beforeAll(async () => {
    try {
      connection = await MongoClient.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = await connection.db();
      console.log(process.env.DATABASE_URL, " connection");
    } catch (error) {
      console.log("Error connecting to MongoDB:", error);
    }
  });
  afterAll(async () => {
    await connection.close();
  });

  it("Connect to the collection and find user", async () => {
    const users = db.collection("users");
    console.log(users, "users");
    //Retrieve the documents in the collection
    const user = await users.findOne({ name: "Rudolph Larson" });
    console.log(user, "user"); // console.table(user);
  });

  it("Create new user with imported data, delete and check", async () => {
    //Create a new user
    const userImport = getUser("admin");
    console.log(userImport, "userImport");

    //Check if the user exists
    try {
      const res = await signUp(userImport);
      expect(res.statusCode).toBe(201);
      console.log(res.body);
      const users = db.collection("users");
      const userData = await users.findOne({ name: userImport.name });
      if(!userData){
        throw new Error("User not found");
      };
      expect(userData.name).toEqual(userImport.name);
        expect(userData.email).toEqual(userImport.email.toLowerCase());
        expect(userData.role).toBe("admin");
        expect(userData._id).toEqual(res.body.data.user._id);
    } catch (error) {
      console.log("Error creating user:", error);
    }
    //Delete the user
    //Check if the user is deleted
  });
});
