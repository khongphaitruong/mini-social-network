const db = require('../db');

// Lấy tất cả tài khoản
exports.getAllAccounts = (req, res) => {
  db.query('SELECT * FROM accounts', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Lấy tài khoản theo ID
exports.getAccountById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM accounts WHERE account_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Không tìm thấy tài khoản');
    res.json(result[0]);
  });
};

// Tạo tài khoản mới
exports.createAccount = (req, res) => {
  const { username, password, role, status } = req.body;
  db.query(
    'INSERT INTO accounts (username, password, role, status) VALUES (?, ?, ?, ?)',
    [username, password, role || 'người dùng', status || 'hoạt động'],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Tài khoản đã được tạo', account_id: result.insertId });
    }
  );
};

// Cập nhật tài khoản
exports.updateAccount = (req, res) => {
  const { id } = req.params;
  const { username, password, role, status } = req.body;
  db.query(
    'UPDATE accounts SET username = ?, password = ?, role = ?, status = ? WHERE account_id = ?',
    [username, password, role, status, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Đã cập nhật tài khoản' });
    }
  );
};

// Xoá tài khoản
exports.deleteAccount = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM accounts WHERE account_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Đã xoá tài khoản' });
  });
};
