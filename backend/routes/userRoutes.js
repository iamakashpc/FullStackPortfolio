import express from "express";
import { createUser, getUserById, getUsers, loginUser } from "../controllers/userController.js";
import { authenticate,authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

// Route to create a new user
router.post("/register", createUser);
// Route to create login user
router.post("/auth/login", loginUser);
router.get("/users", authenticate, authorize("admin"), getUsers);
router.get("/user/:id", authenticate, authorize("admin"), getUserById);

export default router;