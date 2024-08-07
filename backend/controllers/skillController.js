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
export const getSkills = async (req, res) => {};
export const getSkillById = async (req, res) => {};
export const updateSkill = async (req, res) => {};
export const deleteSkill = async (req, res) => {};
