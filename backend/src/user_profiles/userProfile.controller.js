const db = require('../db');

// Lấy tất cả user profiles
exports.getAllProfiles = (req, res) => {
  db.query('SELECT * FROM user_profiles', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Lấy profile theo account_id
exports.getProfileByAccountId = (req, res) => {
  const { account_id } = req.params;
  db.query('SELECT * FROM user_profiles WHERE account_id = ?', [account_id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Không tìm thấy profile');
    res.json(result[0]);
  });
};

// Thêm profile mới
exports.createProfile = (req, res) => {
  const { account_id, full_name, avatar_url, bio, dob, gender } = req.body;
  db.query(
    'INSERT INTO user_profiles (account_id, full_name, avatar_url, bio, dob, gender) VALUES (?, ?, ?, ?, ?, ?)',
    [account_id, full_name, avatar_url, bio, dob, gender],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Tạo profile thành công' });
    }
  );
};

// Cập nhật profile
exports.updateProfile = (req, res) => {
  const { account_id } = req.params;
  const { full_name, avatar_url, bio, dob, gender } = req.body;
  db.query(
    'UPDATE user_profiles SET full_name = ?, avatar_url = ?, bio = ?, dob = ?, gender = ? WHERE account_id = ?',
    [full_name, avatar_url, bio, dob, gender, account_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Cập nhật profile thành công' });
    }
  );
};

// Xoá profile
exports.deleteProfile = (req, res) => {
  const { account_id } = req.params;
  db.query('DELETE FROM user_profiles WHERE account_id = ?', [account_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Xoá profile thành công' });
  });
};
