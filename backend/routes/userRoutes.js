import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
const router = express.Router();

// Route to create a new user
router.post("/register", createUser);
// Route to create login user
router.post("/auth/login", loginUser);
export default router;