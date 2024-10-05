import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import doctorModel from "../models/doctorModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  console.error("MONGODB_URL is not defined in the environment variables.");
  process.exit(1);
}

function transformDoctorData(doctor) {
  return {
    ...doctor,
    _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
    experience: parseInt(doctor.experience),
    date: new Date(),
    password: "defaultPassword",
    email: `${doctor.name.replace(/\s+/g, "").toLowerCase()}@example.com`,
    available: true,
    slots_booked: {},
  };
}

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
    console.log("Database name:", mongoose.connection.name);

    const dataPath = path.join(__dirname, "..", "assets", "doctorsData.json");
    const doctorsData = JSON.parse(await fs.readFile(dataPath, "utf-8"));

    await doctorModel.deleteMany({});
    console.log("Cleared existing doctor data from MongoDB");

    for (let doctor of doctorsData) {
      const transformedDoctor = transformDoctorData(doctor);
      try {
        await doctorModel.create(transformedDoctor);
        console.log(`Inserted ${doctor.name} into MongoDB`);
      } catch (error) {
        console.error(`Error inserting ${doctor.name}:`, error.message);
      }
    }

    console.log("Database seeding completed successfully!");

    // Verify the data
    const count = await doctorModel.countDocuments();
    console.log(`Total documents in collection: ${count}`);

    const firstDoctor = await doctorModel.findOne();
    console.log("First doctor in the collection:", firstDoctor);

    const allDoctors = await doctorModel.find();
    console.log("All doctors' names:");
    allDoctors.forEach((doctor) => console.log(doctor.name));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedDatabase();
