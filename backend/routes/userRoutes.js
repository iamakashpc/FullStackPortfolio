import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController.js";
import { authenticate,authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

// Route to create a new user
router.post("/register", createUser);
// Route to create login user
router.post("/auth/login", loginUser);
router.get("/users", authenticate, authorize("admin"), getUsers);

export default router;