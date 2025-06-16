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
  // Add all possible Vercel preview URLs and variants
  "https://*.vercel.app",
  "https://*.now.sh",
];

// Improved CORS middleware with better origin handling
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Check exact matches first
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Check wildcard matches for Vercel deployments
      const wildcardMatches = allowedOrigins
        .filter((allowed) => allowed.includes("*"))
        .some((pattern) => {
          const regexPattern = new RegExp(
            "^" + pattern.replace("*", ".*") + "$"
          );
          return regexPattern.test(origin);
        });

      if (wildcardMatches) {
        return callback(null, true);
      }

      console.log("Blocked origin:", origin);
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Access-Control-Allow-Origin"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400, // Cache preflight response for 24 hours
  })
);

// Add specific middleware to handle OPTIONS requests properly
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    const origin = req.headers.origin;
    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.some(
        (allowed) =>
          allowed.includes("*") &&
          new RegExp("^" + allowed.replace("*", ".*") + "$").test(origin)
      )
    ) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      return res.status(204).end();
    }
  }
  next();
});

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
