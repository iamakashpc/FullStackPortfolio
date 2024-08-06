import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		proficiency: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Skills", skillSchema);
