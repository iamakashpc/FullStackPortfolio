import User from "../models/User.js";
import Projects from "../models/Projects.js";

// Function to get all users
export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Function to get a single user by ID
export const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Function to update a user
export const updateUser = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;
	try {
		const updatedUser = await User.findByIdAndUpdate(id, updates, {
			new: true,
		});
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Function to delete a user
export const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Function to get all projects
export const getProjects = async (req, res) => {
	try {
		const projects = await Projects.find();
		res.status(200).json(projects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Function to get a single project by ID
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
