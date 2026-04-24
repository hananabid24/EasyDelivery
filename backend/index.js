require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();


// =========================
// 🔥 MIDDLEWARES (TOUJOURS EN PREMIER)
// =========================
app.use(cors({
  origin: "*", // tu peux restreindre plus tard (React URL)
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // 🔥 bonus (évite bugs Postman form-data)


// =========================
// 🔍 TEST DATABASE CONNECTION
// =========================
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("❌ DB connection error:", err);
  } else {
    console.log("✅ DB connected:", res.rows[0]);
  }
});


// =========================
// 📦 ROUTES IMPORT
// =========================
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const bonRoutes = require("./routes/bonRoutes");
const authMiddleware = require("./middleware/authMiddleware");


// =========================
// 🚀 ROUTES USAGE
// =========================
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use("/api/bons", bonRoutes);


// =========================
// 🔐 PROTECTED TEST ROUTE
// =========================
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});


// =========================
// 🏠 HOME ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// =========================
// ❌ GLOBAL ERROR HANDLER (TRÈS IMPORTANT)
// =========================
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);

  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});


// =========================
// 🚀 START SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});