import express from 'express';
import { db } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

/**
 * POST /chat/start-chat
 * Creates a new chatroom if not exists
 */
router.post('/start-chat', (req, res) => {
  const { chatroomName, senderEmail } = req.body;
  if (!chatroomName || !senderEmail) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const findUserSql = `SELECT userID, userName, userProfilePic FROM user WHERE userEmail = ?`;
  db.query(findUserSql, [senderEmail], (err, result) => {
    if (err || result.length === 0) {
      return res.status(500).json({ error: 'User not found' });
    }

    const creatorID = result[0].userID;
    const partnerName = result[0].userName;
    const partnerPic = result[0].userProfilePic;
    const chatroomID = uuidv4().slice(0, 8);

    const insertRoomSql = `
      INSERT INTO chatroom (chatroomID, chatroomName, creatorID, timeCreated)
      VALUES (?, ?, ?, NOW())
    `;
    db.query(insertRoomSql, [chatroomID, chatroomName, creatorID], (err2) => {
      if (err2) {
        if (err2.code === 'ER_DUP_ENTRY') {
          return res.json({ chatroomID, partnerName, partnerPic }); // already exists
        }
        return res.status(500).json({ error: 'Insert failed' });
      }

      return res.json({ chatroomID, partnerName, partnerPic });
    });
  });
});




// Get all chatrooms for user
router.get('/list', (req, res) => {
  const { email } = req.query;
  const sql = "SELECT * FROM chatroom WHERE chatroomName LIKE ?";
  db.query(sql, [`%${email}%`], (err, data) => {
    if (err) return res.status(500).json({ error: "Query failed" });
    res.json(data);
  });
});

// Send message
router.post('/send', (req, res) => {
  const { chatroomID, content, senderID } = req.body;
  console.log('🟨 Incoming message payload:', req.body);

  if (!chatroomID || !content || !senderID) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const insertSql = `
    INSERT INTO chat_messages (chatroomID, content, senderID, timeSent)
    VALUES (?, ?, ?, NOW())
  `;
  db.query(insertSql, [chatroomID, content, senderID], (err) => {
    if (err) {
      console.error('❌ Send message DB error:', err);
      return res.status(500).json({ error: 'Message insert failed' });
    }
    res.json({ status: 'sent' });
  });
});



// Get messages
router.get('/messages', (req, res) => {
  const { chatroomID } = req.query;
  if (!chatroomID) return res.status(400).json({ error: 'Missing chatroomID' });

  const sql = `
    SELECT content, senderID, timeSent
    FROM chat_messages
    WHERE chatroomID = ?
    ORDER BY timeSent ASC
  `;

  db.query(sql, [chatroomID], (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load messages' });
    res.json(data);
  });
});


router.get('/my-chats', (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  const getUser = 'SELECT userID, userMatches FROM user WHERE userEmail = ?';
    db.query(getUser, [email], (err, result) => {
    if (err || result.length === 0) {
        console.error('❌ User lookup error:', err);
        return res.status(500).json({ error: 'User not found' });
    }

    const userID = result[0].userID;
    const matchedEmailsRaw = result[0].userMatches || '';
    const matchedEmails = matchedEmailsRaw
        .split(',')
        .map(e => e.trim())
        .filter(Boolean);

    if (matchedEmails.length === 0) {
        return res.json([]); // ✅ No matches, empty chat list
    }

    const placeholders = matchedEmails.map(() => '?').join(',');
    const sql = `
        SELECT c.chatroomID, c.chatroomName, cm.content, cm.timeSent,
                u.userName AS partnerName, u.userProfilePic AS partnerPic
        FROM chatroom c
        LEFT JOIN chat_messages cm ON cm.chatroomID = c.chatroomID
        JOIN user u ON c.chatroomName LIKE CONCAT('%', u.userEmail, '%')
        WHERE u.userEmail IN (${placeholders})
        GROUP BY c.chatroomID
        ORDER BY cm.timeSent DESC
    `;


    db.query(sql, [...matchedEmails], (err2, data) => {
        if (err2) {
        console.error('❌ Chat fetch error:', err2);
        return res.status(500).json({ error: 'Chat fetch failed' });
        }
        res.json(data);
    });
    });

});

export default router;