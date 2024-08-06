import express from "express";
import dotenv from "dotenv";
import DataBaseConnection from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	res.send("Server is running");
});
DataBaseConnection()
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})