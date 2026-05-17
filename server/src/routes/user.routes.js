import { Router } from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,

  getAllUsers,
  updateUser,
  deleteUser,
  getUserList

} from "../controllers/user.controller.js";

import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.route("/register").post(registerUser);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.route("/login").post(loginUser);


//secured routes
router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/")
.get(
  verifyJWT,
  verifyAdmin,
  getAllUsers
);

router.route("/list")
.get(
  verifyJWT,
  getUserList
);

router.route("/:id")
.put(
  verifyJWT,
  verifyAdmin,
  updateUser
)
.delete(
  verifyJWT,
  verifyAdmin,
  deleteUser
);

export default router;
