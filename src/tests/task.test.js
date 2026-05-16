import request from "supertest";

import { app } from "../app.js";

import {
  connectDB,
  closeDB
} from "./setup.js";

let token;

beforeAll(async () => {

  await connectDB();

  // register
  await request(app)
    .post("/api/v1/users/register")
    .send({
      email: "admin@gmail.com",
      password: "123456",
      role: "admin"
    });

  // login
  const loginRes = await request(app)
    .post("/api/v1/users/login")
    .send({
      email: "admin@gmail.com",
      password: "123456"
    });

  token = loginRes.body.data.accessToken;
});

afterAll(async () => {
  await closeDB();
});

describe("Task API", () => {

  test("should create task", async () => {

    const res = await request(app)
      .post("/api/v1/tasks")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Test Task");

    expect(res.statusCode).toBe(201);

    expect(res.body.data.title)
      .toBe("Test Task");
  });

  test("should block unauthorized user", async () => {

    const res = await request(app)
      .get("/api/v1/tasks");

    expect(res.statusCode).toBe(401);
  });
});