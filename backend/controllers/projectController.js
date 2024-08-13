import Projects from "../models/Projects.js";
import path from "path";

// Create a new project
export const createProject = async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({
			message: "Access Denied",
		});
	}
	const {
		name,
		description,
		githubUrl,
		liveUrl,
		categories,
		author,
		status,
		stack,
	} = req.body;
	const image = req.file?.path; // Get the image path from the uploaded file

	if (!image) {
		return res.status(400).json({ message: "Image is required" });
	}

	if (!["In Progress", "Completed", "On Hold", "Archived"].includes(status)) {
		return res.status(400).json({ message: "Invalid status value" });
	}

	try {
		const newProject = new Projects({
			name,
			description,
			image,
			githubUrl,
			liveUrl,
			categories,
			author,
			status,
			stack,
		});
		await newProject.save();

		res.status(201).json({
			message: "Project created successfully",
			project: newProject,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Get all projects
export const getProjects = async (req, res) => {
	try {
		const projects = await Projects.find();
		res.status(200).json(projects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Get a project by ID
export const getProjectById = async (req, res) => {
	const { id } = req.params;

	try {
		const project = await Projects.findById(id);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}
		res.status(200).json(project);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Update a project
export const updateProject = async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied" });
	}

	const { id } = req.params;
	const {
		name,
		description,
		githubUrl,
		liveUrl,
		categories,
		author,
		status,
		stack,
	} = req.body;
	const image = req.file?.path; // Get the image path from the uploaded file

	if (!image) {
		return res.status(400).json({ message: "Image is required" });
	}

	if (!["In Progress", "Completed", "On Hold", "Archived"].includes(status)) {
		return res.status(400).json({ message: "Invalid status value" });
	}

	try {
		const updatedProject = await Projects.findByIdAndUpdate(
			id,
			{
				name,
				description,
				image,
				githubUrl,
				liveUrl,
				categories,
				author,
				status,
				stack,
			},
			{ new: true }
		);

		if (!updatedProject) {
			return res.status(404).json({ message: "Project not found" });
		}

		res.status(200).json({
			message: "Project updated successfully",
			project: updatedProject,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Delete a project
export const deleteProject = async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied" });
	}

	const { id } = req.params;

	try {
		const deletedProject = await Projects.findByIdAndDelete(id);
		if (!deletedProject) {
			return res.status(404).json({ message: "Project not found" });
		}
		res.status(200).json({
			message: "Project deleted successfully",
			
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
