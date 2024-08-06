import express from "express";
import { createUser } from "../controllers/userController.js";
const router = express.Router();

// Route to create a new user

router.post("/users", createUser);
export default router;