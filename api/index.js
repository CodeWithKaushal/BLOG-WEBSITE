import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();

// Improved MongoDB connection with better error handling
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.error("Error details:", err);
    console.log("Please check your MongoDB connection string in .env file");
    console.log(
      "Make sure your username, password, and cluster name are correct"
    );
    process.exit(1); // Exit process with failure
  });

const __dirname = path.resolve();

const app = express();

// Configure CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-website-ia3l.vercel.app",
  "https://blog-website-three-lilac.vercel.app",
  "https://blog-website-git-main-kaushals-projects-3a6db958.vercel.app",
  "https://blog-website-3xzdjtinl-kaushals-projects-3a6db958.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(null, true); // Temporarily allow all origins while debugging
      }
    },
    credentials: true, // Allow cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
