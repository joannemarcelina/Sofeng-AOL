// In your match.js (Express backend route)
import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET potential users for matching
router.get('/potential-users', (req, res) => {
  const currentEmail = req.query.email;
  if (!currentEmail) return res.status(400).json({ error: 'Missing email' });

  const query = `
    SELECT * FROM user
    WHERE userEmail != ?
      AND (userMatches IS NULL OR NOT FIND_IN_SET(?, userMatches))
      AND (userDeclines IS NULL OR NOT FIND_IN_SET(?, userDeclines))
  `;

  db.query(query, [currentEmail, currentEmail, currentEmail], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json(data);
  });
});

// POST: Match or Decline a user
router.post('/interact', (req, res) => {
  const { myEmail, targetEmail, action } = req.body;
  if (!myEmail || !targetEmail || !['match', 'decline'].includes(action)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const field = action === 'match' ? 'userMatches' : 'userDeclines';
  const updateQuery = `
    UPDATE user
    SET ${field} = IF(${field} IS NULL, ?, CONCAT_WS(',', ${field}, ?))
    WHERE userEmail = ?
  `;

  db.query(updateQuery, [targetEmail, targetEmail, myEmail], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update' });
    return res.json({ status: 'success', action });
  });
});

export default router;
