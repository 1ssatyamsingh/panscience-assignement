import dotenv from "dotenv";

dotenv.config();
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

export const connectDB = async () => {

  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
};

export const closeDB = async () => {

  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

  await mongoServer.stop();
};