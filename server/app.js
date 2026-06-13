const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const healthRoutes = require("./routes/healthRoutes");

const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// For uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Consultation Recording Manager API is running 🚀",
  });
});

// Health check
app.use(healthRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api", noteRoutes);
app.use("/api/dashboard", dashboardRoutes,
);

module.exports = app;
