import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import router from "./routes/index.routes.js";
import connectDB from "./database/database.js";

const app = express();

// Best to avoid console.clear in production code to maintain log integrity.
// console.clear();

connectDB();

// Setup for serving static HTML form and uploaded files
// Ensure these directories are appropriately configured in your Vercel project
app.use("/html-form", express.static("public")); // Static HTML forms
app.use("/files", express.static("uploads")); // Folder for uploaded files (consider using cloud storage in production)

app.use(cors()); // Apply CORS
app.use(logger); // Apply custom logger middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Main API routes
app.use("/api/v1/", router);

// Root endpoint to serve HTML directly (consider serving through static files)
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const landingHTML = `<h1>Welcome to Our HTML API</h1>`;
  res.send(landingHTML);
});

// Since you're deploying to Vercel, listening locally is not needed here
// The app will be exported and Vercel will handle the invocation
export default app;
