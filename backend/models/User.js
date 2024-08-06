import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["guest", "user", "admin"],
			default: "guest",
		},
		description: {
			type: String,
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
		lastLogin: {
			type: Date,
		},
	},
	{ timestamps: true }
);
export default mongoose.model("User", userSchema);
