import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Handler to create a new user
export const createUser = async (req, res) => {
	const { name, email, password, role, description } = req.body;
	// Validate required fields
	if (!name || !email || !password) {
		return res.status(400).json({
			message: "Name, email & password are required",
		});
	}
	try {
		const existingUser = await User.findOne({ email });
		// Check if the user already exists
		if (existingUser) {
			return res.status(400).json({
				message: "User is already Exists",
			});
		}
		// Hash the password

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			role: role || "guest",
			description,
		});

		// Save the user to the database

		await newUser.save();

		// Generate a token (optional, if you want to issue a token upon registration)

		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "20d",
		});

		// Send a response

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
