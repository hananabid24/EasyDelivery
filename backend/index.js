// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import userRoutes from "./routes/users.js"; // <-- import du routeur

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Vérifier la DB
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("DB connected:", res.rows[0]);
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // <-- toutes les routes users ici

// Route test
app.get("/", (req, res) => res.send("Backend is running!"));

// Lancer le serveur
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
