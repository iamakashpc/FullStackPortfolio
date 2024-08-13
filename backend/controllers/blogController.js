import Blog from "../models/Blogs.js";
import multer from "multer";
import path from "path";

// Configure multer for image uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/blog_images/");
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, `${Date.now()}${ext}`);
	},
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb("Error: Images only!");
		}
	},
}).array("images");

// Create a new blog
export const createBlog = async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied" });
	}

	upload(req, res, async (err) => {
		if (err) return res.status(400).json({ message: err });

		const { title, content, author, tags, published } = req.body;
		const images = req.files.map((file) => file.path);

		try {
			const newBlog = new Blog({
				title,
				content,
				author,
				image: images,
				tags,
				published,
			});
			await newBlog.save();
			res
				.status(201)
				.json({ message: "Blog created successfully", blog: newBlog });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	});
};

// Get all blogs
export const getBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find();
		res.status(200).json(blogs);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
	const { id } = req.params;
	try {
		const blog = await Blog.findById(id);
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		res.status(200).json(blog);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Update a blog
export const updateBlog = async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied" });
	}

	upload(req, res, async (err) => {
		if (err) return res.status(400).json({ message: err });

		const { id } = req.params;
		const { title, content, tags, published } = req.body;
		const images = req.files.map((file) => file.path);

		try {
			const updatedBlog = await Blog.findByIdAndUpdate(
				id,
				{
					title,
					content,
					image: images,
					tags,
					published,
					updatedAt: Date.now(),
				},
				{ new: true }
			);

			if (!updatedBlog)
				return res.status(404).json({ message: "Blog not found" });
			res
				.status(200)
				.json({ message: "Blog updated successfully", blog: updatedBlog });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	});
};

// Delete a blog
export const deleteBlog = async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied" });
	}

	const { id } = req.params;
	try {
		const deletedBlog = await Blog.findByIdAndDelete(id);
		if (!deletedBlog)
			return res.status(404).json({ message: "Blog not found" });
		res.status(200).json({ message: "Blog deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
