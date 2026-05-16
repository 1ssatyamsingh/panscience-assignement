import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))
app.use(morgan("dev"));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true , limit: '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());

import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';

// routes declaration
app.use("/api/v1/users", userRouter);

app.use("/api/v1/tasks", taskRouter);
app.use("/uploads", express.static("public/uploads"));
// http://localhost:8000/api/v1/users/register

export {app};