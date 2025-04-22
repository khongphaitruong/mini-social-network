const db = require('../db');

// Lấy tất cả báo cáo
exports.getAllReports = (req, res) => {
  db.query('SELECT * FROM reports', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Lấy báo cáo theo ID
exports.getReportById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM reports WHERE report_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Không tìm thấy báo cáo');
    res.json(result[0]);
  });
};

// Tạo mới báo cáo
exports.createReport = (req, res) => {
  const { post_id, account_id, category_id, description } = req.body;
  db.query(
    'INSERT INTO reports (post_id, account_id, category_id, description) VALUES (?, ?, ?, ?)',
    [post_id, account_id, category_id, description],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Báo cáo đã được gửi', report_id: result.insertId });
    }
  );
};

// Xoá báo cáo
exports.deleteReport = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM reports WHERE report_id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Đã xoá báo cáo' });
  });
};
