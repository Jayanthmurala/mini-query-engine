const express = require("express");
const jwt = require("jsonwebtoken");
const queryEngine = require("./logic");
const logic = require("./logic");
const dotEnv = require("dotenv");

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to check if the user is logged in
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Please provide a token." });

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

// Quick way to get a token for testing
router.get("/login", (req, res) => {
  const token = jwt.sign({ user: "test" }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Endpoint to handle queries
router.post("/query", authenticate, (req, res) => {
  const { query } = req.body;
  if (!query)
    return res.status(400).json({ error: "You didn’t send a query!" });

  try {
    const pseudoSql = logic.translateQuery(query);
    const result = logic.executeQuery(pseudoSql);
    res.json({ query, pseudoSql, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to explain a query
router.post("/explain", authenticate, (req, res) => {
  const { query } = req.body;
  if (!query)
    return res.status(400).json({ error: "You didn’t send a query!" });

  try {
    const pseudoSql = queryEngine.translateQuery(query);
    const explanation = queryEngine.explainQuery(pseudoSql);
    res.json(explanation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to validate a query
router.post("/validate", authenticate, (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "You didn’t send aquery!" });

  const validation = queryEngine.validateQuery(query);
  res.json(validation);
});

module.exports = router;
