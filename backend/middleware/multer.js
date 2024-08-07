import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir); // Folder where images will be stored
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase();
		cb(null, `${Date.now()}${ext}`); // Rename file to avoid conflicts
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
			cb(new Error("Error: Images only!"), false);
		}
	},
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;
