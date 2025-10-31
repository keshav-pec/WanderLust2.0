// Load environment variables (Vercel handles this in production)
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// Import routes
const listingRoutes = require("./routes/listing.routes");
const reviewRoutes = require("./routes/review.routes");
const authRoutes = require("./routes/auth.routes");

// Import middleware
const { errorHandler } = require("./middleware/errorHandler");

// Import passport configuration
require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;
const dbURL = process.env.ATLASDB_URL;

// Database connection
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// CORS configuration - allows frontend to communicate with backend
const allowedOrigins = [
  // Local development
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  // Production domains
  "https://wanderlust-org.vercel.app",
  "https://wander-lust2-0.vercel.app",
  "https://wanderlust-pec.vercel.app",
];

// Add custom frontend URL from environment if provided
if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies to be sent
  })
);

// Body parsing middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Initialize Passport
app.use(passport.initialize());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// API Routes
app.use("/api/auth", authRoutes); // Authentication routes (login, signup, logout)
app.use("/api/listings", listingRoutes); // Listing CRUD operations
app.use("/api/reviews", reviewRoutes); // Review operations (changed from nested route)

// Global error handler (must be after all routes)
app.use(errorHandler);

// 404 handler for unknown routes (must be last)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Start server (only for local development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}/api`);
  });
}

// Export app for Vercel serverless
module.exports = app;
