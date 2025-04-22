const db = require('../db');

// Lấy tất cả bình luận của một bài viết, kèm tên + avatar người bình luận
exports.getCommentsByPostId = (req, res) => {
  const { postId } = req.params;
  const sql = `
    SELECT c.comment_id, c.content, c.create_time,
           a.account_id, up.full_name, up.avatar_url
    FROM comments c
    JOIN accounts a ON c.account_id = a.account_id
    LEFT JOIN user_profiles up ON a.account_id = up.account_id
    WHERE c.post_id = ?
    ORDER BY c.create_time DESC
  `;
  db.query(sql, [postId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// Thêm bình luận mới
exports.addComment = (req, res) => {
  const { post_id, account_id, content } = req.body;
  const sql = `INSERT INTO comments (post_id, account_id, content) VALUES (?, ?, ?)`;
  db.query(sql, [post_id, account_id, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Đã thêm bình luận', comment_id: result.insertId });
  });
};

// Cập nhật nội dung bình luận
exports.updateComment = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const sql = `UPDATE comments SET content = ? WHERE comment_id = ?`;
  db.query(sql, [content, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Đã cập nhật bình luận' });
  });
};

// Xoá bình luận
exports.deleteComment = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM comments WHERE comment_id = ?`;
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Đã xoá bình luận' });
  });
};
