import express from "express";
import dotenv from "dotenv";
import DataBaseConnection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import skillRoutes from "./routes/skillRoutes.js"
import projectRoute from "./routes/projectRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
// import blogRoute from "./routes/blogRoutes.js"
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	res.send("Server is running");
});
DataBaseConnection()

app.use("/api", userRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/project", projectRoute);
app.use("/api/admin", adminRoute);
// app.use("/api/blog", blogRoute);
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})