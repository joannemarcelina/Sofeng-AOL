// ✅ discover.js (FIXED VERSION)
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const router = express.Router();

// GET /discover/data
router.get('/data', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    const currentUserID = decoded.id;
    const getCurrentUser = `SELECT userEmail, userSearchedSkills FROM user WHERE userID = ?`;

    db.query(getCurrentUser, [currentUserID], (err, data) => {
      if (err || data.length === 0) return res.status(500).json({ error: 'Failed to fetch current user' });

      const currentEmail = data[0].userEmail;
      const searchedSkills = data[0].userSearchedSkills?.split(',').map(s => s.trim()) || [];

      // 1. Find latest person who liked (matched) current user
      const findLiked = `SELECT * FROM user WHERE FIND_IN_SET(?, userMatches) > 0 ORDER BY userID DESC LIMIT 1`;
      db.query(findLiked, [currentEmail], (err2, likedData) => {
        if (err2) return res.status(500).json({ error: 'Error finding liked users' });

        const likedUser = likedData[0] || null;

        // 2. Find recommended user based on matched searched skills
        const getAllUsers = `SELECT * FROM user WHERE userEmail != ?`;
        db.query(getAllUsers, [currentEmail], (err3, allUsers) => {
          if (err3) return res.status(500).json({ error: 'Error getting users' });

          let bestMatch = null;
          let maxMatches = 0;

          allUsers.forEach(user => {
            const skillSet = user.userSkills?.split(',').map(s => s.trim()) || [];
            const matches = skillSet.filter(skill => searchedSkills.includes(skill)).length;

            if (matches > maxMatches) {
              bestMatch = user;
              maxMatches = matches;
            }
          });

          return res.json({ likedUser, recommendedUser: bestMatch });
        });
      });
    });
  });
});

export default router;
