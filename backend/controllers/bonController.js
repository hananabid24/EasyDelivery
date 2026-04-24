const pool = require("../config/db");

// CREATE BON
exports.createBon = async (req, res) => {
  try {
    const {
      type,
      client,
      produit,
      quantite,
      date_livraison,
    } = req.body;

    const user_id = req.user.id;

    const newBon = await pool.query(
      `INSERT INTO bons 
      (type, client, produit, quantite, date_livraison, user_id, statut) 
      VALUES ($1, $2, $3, $4, $5::date, $6, 'pending') 
      RETURNING *`,
      [type, client, produit, quantite, date_livraison, user_id]
    );

    res.status(201).json({
      message: "Bon created successfully",
      bon: newBon.rows[0],
    });

  } catch (err) {
    console.error("ERROR SQL:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllBons = async (req, res) => {
  try {
    console.log("GET /bons called");

    const result = await pool.query("SELECT * FROM bons");

    console.log("RESULT:", result.rows);

    return res.json({
      bons: result.rows,
    });

  } catch (err) {
    console.error("FULL ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getOneBon = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM bons WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Bon not found",
      });
    }

    return res.status(200).json({
      message: "Bon retrieved successfully",
      bon: result.rows[0],
    });

  } catch (err) {
    console.error("ERROR SQL:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.updateBonStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const allowedStatus = ["pending", "approved", "rejected"];

    if (!allowedStatus.includes(statut)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
      
    }

    const checkBon = await pool.query(
      "SELECT * FROM bons WHERE id = $1",
      [id]
    );

    if (checkBon.rows.length === 0) {
      return res.status(404).json({
        message: "Bon not found",
      });
    }

    const updatedBon = await pool.query(
      "UPDATE bons SET statut = $1 WHERE id = $2 RETURNING *",
      [statut, id]
    );

    return res.status(200).json({
      message: "Status updated successfully",
      bon: updatedBon.rows[0],
    });

  } catch (err) {
    console.error("ERROR SQL:", err);
    return res.status(500).json({ message: "Server error" });
  }
};