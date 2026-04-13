import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Hasher un mot de passe
export const hashPassword = async (password) => {
  const saltRounds = 10; // nombre de rounds pour le hash
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

// Vérifier un mot de passe
export const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Générer un JWT
export const generateToken = (user) => {
  // user = { id, role } par exemple
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }, // token valable 1 heure
  );
};

// Middleware pour protéger les routes
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Token manquant" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user; // user.id et user.role disponibles dans req.user
    next();
  });
};
