const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO accounts (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Tên người dùng đã tồn tại' });
          }
          return res.status(500).send(err);
        }
        res.status(201).json({ message: 'Đăng ký thành công' });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

// Đăng nhập
exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM accounts WHERE username = ?', [username], async (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(401).json({ message: 'Sai tên người dùng hoặc mật khẩu' });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Sai tên người dùng hoặc mật khẩu' });

    const token = jwt.sign(
      { account_id: user.account_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Đăng nhập thành công', token });
  });
};

//đổi mật khẩu
exports.changePassword = async (req, res) => {
    const { account_id, oldPassword, newPassword } = req.body;
  
    if (!account_id || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết.' });
    }
  
    db.query('SELECT password FROM accounts WHERE account_id = ?', [account_id], async (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).json({ message: 'Không tìm thấy tài khoản.' });
  
      const isMatch = await bcrypt.compare(oldPassword, result[0].password);
      if (!isMatch) return res.status(401).json({ message: 'Mật khẩu cũ không đúng.' });
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      db.query('UPDATE accounts SET password = ? WHERE account_id = ?', [hashedNewPassword, account_id], (err2) => {
        if (err2) return res.status(500).send(err2);
        res.json({ message: 'Đổi mật khẩu thành công!' });
      });
    });
  };
