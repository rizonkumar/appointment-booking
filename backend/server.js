import express from "express";
import cors from "cors";
import "dotenv/config";

// app config
const app = express();
const PORT = process.env.PORT || 8000;

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
