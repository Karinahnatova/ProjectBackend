import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import router from "./routes/index.routes.js";
import connectDB from "./database/database.js";

const app = express();

// Connect to MongoDB
connectDB().then(() => {
  // Middleware to serve static files from 'public' and 'uploads'
  app.use("/html-form", express.static("public")); // Static HTML forms
  app.use("/files", express.static("uploads")); // Consider cloud storage for production

  // General middleware
  app.use(cors()); // Enable CORS
  app.use(logger); // Custom logger middleware
  app.use(express.json()); // Parse JSON payloads
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

  // API routing
  app.use("/API/v1/", router);

  // Serve an HTML landing page at the root
  app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    const landingHTML = `<h1>Welcome to Our HTML API</h1>`;
    res.send(landingHTML);
  });

  // Since you're deploying to Vercel, the app does not need to listen on a local port here
  // The app will be exported and Vercel will handle the invocation
});

export default app;
