import Skills from "../models/Skills.js";
export const createSkill = async (req, res) => {
	const { name, proficiency } = req.body;
	const image = req.file ? req.file.path : null;

	if (!name || !proficiency) {
		return res.status(400).json({
			message: "Name and proficiency are required",
		});
	}
	try {
		const newSkill = new Skills({
			name,
			proficiency,
			image,
		});
		await newSkill.save();
		res.status(201).json({
			message: "Skill created successfully",
			skill: newSkill,
		});
	} catch (error) {
        console.error("Error creating skill:", error);
				res.status(500).json({ message: "Server error while creating skill" });
    }
};
export const getSkills = async (req, res) => {
    try {
			// Fetch all skills from the database
			const skill = await Skills.find();

			// Send the list of skills in the response
			res.status(200).json(skill);
		} catch (error) {
			console.error("Error fetching skills:", error);
			res.status(500).json({ message: "Server error while fetching skills" });
		}
};
export const getSkillById = async (req, res) => {
	const { id } = req.params;

	try {
		// Fetch the skill from the database
		const skill = await Skills.findById(id);

		// Check if the skill exists
		if (!skill) {
			return res.status(404).json({ message: "Skill not found" });
		}

		// Send the skill data in the response
		res.status(200).json(skill);
	} catch (error) {
		console.error("Error fetching skill:", error);
		res.status(500).json({ message: "Server error while fetching skill" });
	}
};
export const updateSkill = async (req, res) => {
	const { id } = req.params;
	const { name, proficiency } = req.body;
	const image = req.file ? req.file.path : null; // Get the image path if a new image is uploaded

	try {
		// Find and update the skill
		const updatedSkill = await Skills.findByIdAndUpdate(
			id,
			{
				name,
				proficiency,
				image: image || undefined, // Update the image if provided
			},
			{ new: true } // Return the updated document
		);

		// Check if the skill exists
		if (!updatedSkill) {
			return res.status(404).json({ message: "Skill not found" });
		}

		// Send the updated skill in the response
		res.status(200).json(updatedSkill);
	} catch (error) {
		console.error("Error updating skill:", error);
		res.status(500).json({ message: "Server error while updating skill" });
	}
};
export const deleteSkill = async (req, res) => {
	const { id } = req.params;

	try {
		// Find and delete the skill
		const deletedSkill = await Skills.findByIdAndDelete(id);

		// Check if the skill exists
		if (!deletedSkill) {
			return res.status(404).json({ message: "Skill not found" });
		}

		// Send a success message
		res.status(200).json({ message: "Skill deleted successfully" });
	} catch (error) {
		console.error("Error deleting skill:", error);
		res.status(500).json({ message: "Server error while deleting skill" });
	}
};
