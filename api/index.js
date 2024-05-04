import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import router from "./routes/index.routes.js";
import connectDB from "./database/database.js";

const app = express();

// console.clear();

// connectDB();
app.use("/html-form", express.static("public"));
app.use("/files", express.static("uploads"));

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const landingHTML = `<h1>Welcome to Our HTML API</h1>`;
  res.send(landingHTML);
});

export default app;
