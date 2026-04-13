// backend/routes/users.js
import express from "express";
import pool from "../db.js"; // ta connexion PostgreSQL
import { hashPassword, checkPassword, generateToken, authenticateToken } from "../auth.js";

const router = express.Router();

// Inscription
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashed = await hashPassword(password);
    const result = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role",
      [username, hashed, role],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Connexion
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    if (result.rows.length === 0)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    const user = result.rows[0];
    const valid = await checkPassword(password, user.password);
    if (!valid) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Exemple route protégée
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Bonjour ${req.user.id}, vous êtes autorisé!` });
});

export default router;
