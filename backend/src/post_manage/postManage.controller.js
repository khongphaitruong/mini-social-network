const db = require('../db');

// Lấy tất cả bài viết
exports.getAllPosts = (req, res) => {
  db.query('SELECT * FROM posts', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Lấy bài viết theo ID
exports.getPostById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM posts WHERE post_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Không tìm thấy bài viết');
    res.json(result[0]);
  });
};

// Thêm bài viết mới
exports.createPost = (req, res) => {
  const { account_id, category_id, content } = req.body;
  db.query('INSERT INTO posts (account_id, category_id, content) VALUES (?, ?, ?)', [account_id, category_id, content], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Đã thêm bài viết', post_id: result.insertId });
  });
};

// Cập nhật bài viết
exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { content, category_id } = req.body;
  db.query('UPDATE posts SET content = ?, category_id = ? WHERE post_id = ?', [content, category_id, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Đã cập nhật bài viết' });
  });
};

// Xoá bài viết
exports.deletePost = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM posts WHERE post_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Đã xoá bài viết' });
  });
};
