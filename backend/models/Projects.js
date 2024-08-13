import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		githubUrl: {
			type: String,
		},
		liveUrl: [String],
		categories: {
			type: String,
		},
		author: { type: String },
		status: {
			type: String,
			enum: ["In Progress", "Completed", "On Hold", "Archived"], // Correct enum values
			required: true,
		},
		stack: [String],
	},
	{ timestamps: true }
);

export default mongoose.model("Project", projectSchema);
