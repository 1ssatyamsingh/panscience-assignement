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

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.route("/")
.post(
  verifyJWT,
  upload.array("documents", 3),
  createTask
);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
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