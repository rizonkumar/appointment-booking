import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.get("/", (req, res) => {
  res.send("Welcome to Appointment Booking API");
});

app.use("/api/admin", adminRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
