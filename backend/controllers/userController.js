import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
	const { name, email, password, role, description } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({
			message: "Name, email & password are required",
		});
	}

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			role: role || "guest",
			description,
		});

		await newUser.save();

		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "365d",
		});

		res.status(201).json({
			message: "User created successfully",
			user: {
				id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
				description: newUser.description,
			},
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			message: "Please enter email and password",
		});
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				message: "Invalid email or password",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({
				message: "Invalid email or password",
			});
		}

		const token = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET,
			{
				expiresIn: "365d",
			}
		);

		res.status(200).json({
			message: "Login successful",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				description: user.description,
			},
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Server error",
		});
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Server error while fetching users" });
	}
};

export const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ message: "Server error while fetching user" });
	}
};

export const updateUser = async (req,res) => {
	const { id } = req.params;
	const { name, email, password, description, status } = req.body;
	try {
		if (req.user.role !== "admin" && req.user.id !== id) {
			return res.status(400).json({
				message: "You are not authorized ",
			});
		}
		const user = await User.findById(id);
		if (!user) {
			return res.status(400).json({
				message: "User is notfound",
			});
		}
		if (name) user.name = name;
		if (email) user.email = email;
		if (description) user.description = description;
		if (status) user.status = status;

		if (password) {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
		}

		const updatedUser = await user.save();

		res.status(200).json({
			message: "User updated successfully",
			user: {
				id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				role: updatedUser.role,
				description: updatedUser.description,
				status: updatedUser.status,
			},
		});
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: "Server error while updating user" });
	}
};
