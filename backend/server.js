import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
