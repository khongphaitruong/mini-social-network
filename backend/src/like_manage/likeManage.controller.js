const db = require('../db');

// Toggle like (like hoặc bỏ like)
exports.toggleLike = (req, res) => {
  const { post_id, account_id } = req.body;

  const checkQuery = 'SELECT * FROM likes WHERE post_id = ? AND account_id = ?';
  db.query(checkQuery, [post_id, account_id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length > 0) {
      // Đã like → huỷ like
      const deleteQuery = 'DELETE FROM likes WHERE post_id = ? AND account_id = ?';
      db.query(deleteQuery, [post_id, account_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ liked: false, message: 'Đã huỷ like' });
      });
    } else {
      // Chưa like → thêm like
      const insertQuery = 'INSERT INTO likes (post_id, account_id) VALUES (?, ?)';
      db.query(insertQuery, [post_id, account_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ liked: true, message: 'Đã like' });
      });
    }
  });
};

// Đếm số lượt like cho 1 bài viết
exports.getLikeCount = (req, res) => {
  const { post_id } = req.params;
  const countQuery = 'SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?';
  db.query(countQuery, [post_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ post_id, likeCount: result[0].likeCount });
  });
};
