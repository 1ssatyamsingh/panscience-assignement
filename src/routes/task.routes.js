import { Router } from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// create task
router.route("/")
.post(
  verifyJWT,
  upload.array("documents", 3),
  createTask
);

// get all tasks
router.route("/")
.get(
  verifyJWT,
  getTasks
);

// get single task
router.route("/:id")
.get(
  verifyJWT,
  getTaskById
);

// update task
router.route("/:id")
.put(
  verifyJWT,
  upload.array("documents", 3),
  updateTask
);

// delete task
router.route("/:id")
.delete(
  verifyJWT,
  deleteTask
);

export default router;