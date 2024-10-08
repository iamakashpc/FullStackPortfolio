// import express from "express";
// import {
// 	createBlog,
// 	getBlogs,
// 	getBlogById,
// 	updateBlog,
// 	deleteBlog,
// } from "../controllers/blogController.js";
// import { authenticate, authorize } from "../middleware/authMiddleware.js";
// import upload from "../middleware/multer.js";
//  // Add this if you have role-based authorization

// const router = express.Router();

// // Route to create a blog (admin only)
// router.post("/", authenticate, authorize("admin"),upload.array("images", 5), createBlog);

// // Route to get all blogs
// router.get("/", getBlogs);

// // Route to get a single blog by ID
// router.get("/:id", getBlogById);

// // Route to update a blog (admin only)
// router.put("/:id", authenticate, authorize("admin"), upload.array("images", 5),updateBlog);

// // Route to delete a blog (admin only)
// router.delete("/:id", authenticate, authorize("admin"), deleteBlog);

// export default router;
