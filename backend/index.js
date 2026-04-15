require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

// ✅ METTRE ICI
app.use(cors());
app.use(express.json());

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user
  });
});
console.log("authRoutes:", authRoutes);

// ✅ ensuite les routes
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("❌ DB connection error:", err);
  } else {
    console.log("✅ DB connected successfully:", res.rows);
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
