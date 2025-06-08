import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const router = express.Router();

// REGISTER
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const checkSql = "SELECT * FROM user WHERE userEmail = ?";
  db.query(checkSql, [email], (err, data) => {
    if (err) return res.status(500).json({ Error: "Database error" });
    if (data.length > 0) return res.status(400).json({ Error: "Email already exists" });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ Error: "Hashing error" });

      const insertSql = `
        INSERT INTO user (userName, userEmail, userPassword)
        VALUES (?, ?, ?)
      `;
      db.query(insertSql, [name, email, hash], (err, result) => {
        if (err) return res.status(500).json({ Error: "Insert error" });
        return res.status(200).json({ Status: "Success" });
      });
    });
  });
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM user WHERE userEmail = ?";
  db.query(sql, [email], (err, data) => {
    if (err) return res.status(500).json({ Error: "Database error" });
    if (data.length === 0) return res.status(401).json({ Error: "User not found" });

    const user = data[0];
    const hashedPassword = user.userPassword;

    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) return res.status(500).json({ Error: "Compare error" });
      if (!isMatch) return res.status(401).json({ Error: "Wrong email or password" });

      const token = jwt.sign({ id: user.userID }, "jwt-secret-key", { expiresIn: '1d' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
      });

      // Check kalo profile dah lengkap
      const isComplete =
        user.userDescription &&
        user.userSkills &&
        user.userSearchedSkills;

      return res.status(200).json({
        Status: "Success",
        profileComplete: !!isComplete
      });
    });
  });
});


export default router;
