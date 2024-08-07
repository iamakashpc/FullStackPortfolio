import express from "express"
import { createSkill, deleteSkill, getSkillById, getSkills, updateSkill } from "../controllers/skillController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/skill/create", upload.single("image"), createSkill);

// Route to get all skills
router.get("/", getSkills);

// Route to get a specific skill by ID
router.get("/:id", getSkillById);

// Route to update a skill by ID (admin only)
router.put("/:id", authenticate, authorize("admin"), updateSkill);

// Route to delete a skill by ID (admin only)
router.delete("/:id", authenticate, authorize("admin"), deleteSkill);

export default router;