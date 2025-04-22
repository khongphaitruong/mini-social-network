const db = require('../db');

// Gửi tin nhắn
exports.sendMessage = (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  if (!sender_id || !receiver_id || !content) {
    return res.status(400).json({ message: 'Thiếu thông tin' });
  }

  const query = 'INSERT INTO messengers (sender_id, receiver_id, content) VALUES (?, ?, ?)';
  db.query(query, [sender_id, receiver_id, content], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Đã gửi tin nhắn', mess_id: result.insertId });
  });
};

// Lấy tin nhắn giữa 2 người
exports.getMessages = (req, res) => {
  const { user1, user2 } = req.params;

  const query = `
    SELECT * FROM messengers 
    WHERE (sender_id = ? AND receiver_id = ?) 
       OR (sender_id = ? AND receiver_id = ?)
    ORDER BY send_time ASC
  `;

  db.query(query, [user1, user2, user2, user1], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Xoá tin nhắn theo ID
exports.deleteMessage = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM messengers WHERE mess_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy tin nhắn' });

    res.json({ message: 'Đã xoá tin nhắn' });
  });
};

// Lấy danh sách người đã nhắn tin với user
exports.getConversations = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT DISTINCT 
      CASE 
        WHEN sender_id = ? THEN receiver_id 
        ELSE sender_id 
      END AS other_user_id
    FROM messengers 
    WHERE sender_id = ? OR receiver_id = ?
  `;

  db.query(query, [userId, userId, userId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};
