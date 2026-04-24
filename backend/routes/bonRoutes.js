const express = require("express");
const router = express.Router();
const pool = require("../config/db");


const {
  createBon,
  getAllBons,
  getOneBon,
  updateBonStatus
} = require("../controllers/bonController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, createBon);

// GET ALL
router.get("/", authMiddleware, getAllBons);

// CLIENTS
router.get("/clients", async (req, res) => {
  const result = await pool.query("SELECT * FROM clients");
  res.json(result.rows);
});

// PRODUITS
router.get("/produits", async (req, res) => {
  const result = await pool.query("SELECT * FROM produits");
  res.json(result.rows);
});

// GET ONE (TOUJOURS EN DERNIER)
router.get("/:id", authMiddleware, getOneBon);

// UPDATE STATUS
router.put("/:id", authMiddleware, updateBonStatus);

module.exports = router;