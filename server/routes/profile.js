import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// POST: Update user profile
router.post('/update-profile', (req, res) => {
    const { email, name, age, about, skills, lookingFor, projects } = req.body;
    
    const query = `
        UPDATE user 
        SET userName=?, userAge=?, userDescription=?, userSkills=?, userSearchedSkills=?, userProjects=? 
        WHERE userEmail=?`;
    
    db.query(query, [
        name,
        age,
        about,
        skills.join(','),
        lookingFor.join(','),
        projects.join(','),
        email
    ], (err, result) => {
        if (err) return res.status(500).json({ Error: "Update failed" });
        return res.json({ Status: "Profile updated successfully" });
    });
});


// GET: Get user profile by email
router.get('/get-profile', (req, res) => {
    const { email } = req.query;

    const sql = "SELECT * FROM user WHERE userEmail = ?";
    db.query(sql, [email], (err, data) => {
        if (err) return res.status(500).json({ Error: "Query error" });
        if (data.length === 0) return res.status(404).json({ Error: "User not found" });

        const user = data[0];
        res.json({
            name: user.userName,
            age: user.userAge,
            about: user.userDescription,
            skills: user.userSkills ? user.userSkills.split(',').map(s => s.trim()) : [],
            lookingFor: user.userSearchedSkills ? user.userSearchedSkills.split(',').map(s => s.trim()) : [],
            projects: user.userProjects ? user.userProjects.split(',') : [],
            profilePic: user.userProfilePic || null
        });
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

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Upload profile photo
router.post('/upload-photo', upload.single('profilePic'), (req, res) => {
    const email = req.body.email;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Get old photo filename
    const getSql = 'SELECT userProfilePic FROM user WHERE userEmail = ?';
    db.query(getSql, [email], (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to get old photo' });

        const oldFilename = data[0]?.userProfilePic;
        const newFilename = file.filename;

        // Update DB with new filename
        const updateSql = 'UPDATE user SET userProfilePic = ? WHERE userEmail = ?';
        db.query(updateSql, [newFilename, email], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update photo in DB' });

            // Delete old photo (if exists and not default)
            if (oldFilename && oldFilename !== newFilename) {
            const oldPath = path.join('uploads', oldFilename);
            fs.unlink(oldPath, (err) => {
                if (err && err.code !== 'ENOENT') console.error('Error deleting old photo:', err);
            });
            }

            return res.json({ Status: 'Profile picture updated!', filename: newFilename });
        });
    });
});


// GET: Protected Route
router.get('/check-profile-complete', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ complete: false });

  jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
    if (err) return res.status(403).json({ complete: false });

    const sql = "SELECT userDescription, userSkills, userSearchedSkills, userAge FROM user WHERE userID = ?";
    db.query(sql, [decoded.id], (err, data) => {
      if (err || data.length === 0) return res.status(500).json({ complete: false });

      const user = data[0];
      const isComplete =
        !!(user.userDescription?.trim() &&
           user.userSkills?.trim() &&
           user.userSearchedSkills?.trim() &&
           user.userAge != null);

      return res.json({ complete: isComplete });
    });
  });
});

// GET: Fetch potential users excluding those already declined or matched
router.get('/potential-users', (req, res) => {
  const { email } = req.query;

  const getUserSql = "SELECT * FROM user WHERE userEmail = ?";
  db.query(getUserSql, [email], (err, result) => {
    if (err || result.length === 0) {
      return res.status(500).json({ error: "User not found" });
    }

    const currentUser = result[0];
    const declined = currentUser.userDeclines ? currentUser.userDeclines.split(',') : [];
    const matched = currentUser.userMatches ? currentUser.userMatches.split(',') : [];
    const searchedSkills = currentUser.userSearchedSkills ? currentUser.userSearchedSkills.split(',').map(s => s.trim()) : [];

    const excluded = [email, ...declined, ...matched];
    const placeholders = excluded.map(() => '?').join(',');

    const sql = `SELECT * FROM user WHERE userEmail NOT IN (${placeholders})`;

    db.query(sql, excluded, (err2, allUsers) => {
      if (err2) return res.status(500).json({ error: "Failed to fetch users" });

      // Score each user by number of matched skills
      const scoredUsers = allUsers.map(user => {
        const skills = user.userSkills ? user.userSkills.split(',').map(s => s.trim()) : [];
        const matches = skills.filter(skill => searchedSkills.includes(skill));
        return { score: matches.length, user };
      });

      // Sort by score (descending)
      scoredUsers.sort((a, b) => b.score - a.score);

      // Return only the user objects
      const sortedUsers = scoredUsers.map(entry => entry.user);
      res.json(sortedUsers);
    });
  });
});


// POST: Handle match or decline
router.post('/action', (req, res) => {
  const { currentEmail, targetEmail, action } = req.body;

  const field = action === 'match' ? 'userMatches' : 'userDeclines';

  const getSql = `SELECT ${field} FROM user WHERE userEmail = ?`;
  db.query(getSql, [currentEmail], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });

    let currentList = result[0][field] ? result[0][field].split(',') : [];

    // Prevent duplicate
    if (!currentList.includes(targetEmail)) {
      currentList.push(targetEmail);
    }

    const updated = currentList.join(',');
    const updateSql = `UPDATE user SET ${field} = ? WHERE userEmail = ?`;
    db.query(updateSql, [updated, currentEmail], (err2) => {
      if (err2) return res.status(500).json({ error: "Failed to update" });
      return res.json({ status: 'updated' });
    });
  });
});




export default router;