import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const router = express.Router();

// POST: Update user profile (name, age, about)
router.post('/update-profile', (req, res) => {
  const { email, name, age, about } = req.body;

  const sql = "UPDATE user SET userName = ?, userAge = ?, userDescription = ? WHERE userEmail = ?";
  db.query(sql, [name, age, about, email], (err, result) => {
    if (err) {
      console.error("❌ Profile update failed:", err);
      return res.status(500).json({ Error: "Database update failed" });
    }
    return res.status(200).json({ Status: "Profile updated successfully" });
  });
});

// GET: Get user profile by email
router.get('/get-profile', (req, res) => {
  const { email } = req.query;

  const sql = "SELECT userName, userAge, userDescription FROM user WHERE userEmail = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ Error: "Database fetch failed" });
    if (results.length === 0) return res.status(404).json({ Error: "User not found" });

    const user = results[0];
    res.status(200).json({ name: user.userName, age: user.userAge, about: user.userDescription });
  });
});

// GET: Get authenticated user's email from JWT token
router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    const sql = "SELECT userEmail FROM user WHERE userID = ?";
    db.query(sql, [decoded.id], (err, result) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (!result.length) return res.status(404).json({ error: 'User not found' });

      return res.json({ email: result[0].userEmail });
    });
  });
});

export default router;