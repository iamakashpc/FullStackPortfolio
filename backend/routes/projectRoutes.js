import express from "express";
import upload from "../middleware/multer.js"; // Path to your multer middleware
import {
	createProject,
	getProjects,
	getProjectById,
	updateProject,
	deleteProject,
} from "../controllers/projectController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate,authorize("admin"), upload.single("image"), createProject); // Ensure the field name matches "image"
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", authenticate,authorize("admin"), upload.single("image"), updateProject);
router.delete("/:id", authenticate,authorize("admin"), deleteProject);

export default router;
