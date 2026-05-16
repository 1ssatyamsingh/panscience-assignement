import request from "supertest";

import mongoose from "mongoose";

import { app } from "../app.js";

import {
  connectDB,
  closeDB
} from "./setup.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe("Auth API", () => {

  test("should register a user", async () => {

    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        email: "test@gmail.com",
        password: "123456",
        role: "admin"
      });

    expect(res.statusCode).toBe(201);

    expect(res.body.data.email)
      .toBe("test@gmail.com");
  });

  test("should login user", async () => {

    const res = await request(app)
      .post("/api/v1/users/login")
      .send({
        email: "test@gmail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);

    expect(res.body.data.accessToken)
      .toBeDefined();
  });
});