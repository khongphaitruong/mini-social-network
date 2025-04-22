const db = require('../db');

// Gửi lời mời kết bạn
exports.sendFriendRequest = (req, res) => {
  const { account_id_1, account_id_2 } = req.body;

  db.query('INSERT INTO friends (account_id_1, account_id_2, status) VALUES (?, ?, "đang chờ")',
    [account_id_1, account_id_2],
    (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Đã gửi lời mời kết bạn.' });
    });
};

// Chấp nhận lời mời
exports.acceptFriendRequest = (req, res) => {
  const { account_id_1, account_id_2 } = req.body;

  db.query('UPDATE friends SET status = "chấp nhận" WHERE account_id_1 = ? AND account_id_2 = ? AND status = "đang chờ"',
    [account_id_1, account_id_2],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Đã chấp nhận lời mời.' });
    });
};

// Từ chối lời mời
exports.rejectFriendRequest = (req, res) => {
  const { account_id_1, account_id_2 } = req.body;

  db.query('UPDATE friends SET status = "từ chối" WHERE account_id_1 = ? AND account_id_2 = ? AND status = "đang chờ"',
    [account_id_1, account_id_2],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Đã từ chối lời mời.' });
    });
};

// Huỷ lời mời đã gửi hoặc huỷ kết bạn
exports.removeFriend = (req, res) => {
  const { account_id_1, account_id_2 } = req.body;

  db.query('DELETE FROM friends WHERE (account_id_1 = ? AND account_id_2 = ?) OR (account_id_1 = ? AND account_id_2 = ?)',
    [account_id_1, account_id_2, account_id_2, account_id_1],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Đã huỷ kết bạn hoặc lời mời.' });
    });
};

// Lấy danh sách bạn bè (đã chấp nhận)
exports.getFriends = (req, res) => {
  const { account_id } = req.params;

  db.query(`
    SELECT * FROM friends 
    WHERE 
      (account_id_1 = ? OR account_id_2 = ?) 
      AND status = 'chấp nhận'`,
    [account_id, account_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
};

// Lấy danh sách lời mời đến
exports.getReceivedRequests = (req, res) => {
  const { account_id } = req.params;

  db.query('SELECT * FROM friends WHERE account_id_2 = ? AND status = "đang chờ"',
    [account_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
};
