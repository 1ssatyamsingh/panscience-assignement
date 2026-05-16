import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(morgan("dev"));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true , limit: '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';

// routes declaration
app.use("/api/v1/users", userRouter);

app.use("/api/v1/tasks", taskRouter);
app.use("/uploads", express.static("public/uploads"));
// http://localhost:8000/api/v1/users/register

export {app};