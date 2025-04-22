const db = require('../db');

// Lấy tất cả danh mục báo cáo
exports.getAllReportCategories = (req, res) => {
  db.query('SELECT * FROM report_categories', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Lấy theo ID
exports.getReportCategoryById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM report_categories WHERE category_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Không tìm thấy danh mục');
    res.json(results[0]);
  });
};

// Thêm mới
exports.createReportCategory = (req, res) => {
  const { category_name } = req.body;
  db.query('INSERT INTO report_categories (category_name) VALUES (?)', [category_name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Đã thêm danh mục', id: result.insertId });
  });
};

// Cập nhật
exports.updateReportCategory = (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  db.query('UPDATE report_categories SET category_name = ? WHERE category_id = ?', [category_name, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Đã cập nhật danh mục' });
  });
};

// Xoá
exports.deleteReportCategory = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM report_categories WHERE category_id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Đã xoá danh mục' });
  });
};
