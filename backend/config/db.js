import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DataBaseConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDb Database Is Connected");
	} catch (err) {
		console.error("MongoDb Connection Error", err.message);
		process.exit(1);
	}
};
export default DataBaseConnection;
