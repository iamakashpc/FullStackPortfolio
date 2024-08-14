import express from "express";
import {
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	getProjects,
	getProjectById,
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for managing users
router.get("/users", authenticate, authorize("admin"), getUsers);
router.get("/users/:id", authenticate, authorize("admin"), getUserById);
router.put("/users/:id", authenticate, authorize("admin"), updateUser);
router.delete("/users/:id", authenticate, authorize("admin"), deleteUser);

// Routes for managing projects
router.get("/projects", authenticate, authorize("admin"), getProjects);
router.get("/projects/:id", authenticate, authorize("admin"), getProjectById);

export default router;
