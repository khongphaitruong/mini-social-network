const db = require('../db');

// Lấy tất cả danh mục
exports.getCategories = (req, res) => {
  db.query('SELECT * FROM post_categories', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};
//lấy theo id
exports.getCategoryByID = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM post_categories WHERE category_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    res.json(result[0]);
  });
};
// Thêm danh mục mới
exports.createCategory = (req, res) => {
  const { category_name } = req.body;
  if (!category_name) return res.status(400).send("Tên danh mục không được để trống.");

  db.query('INSERT INTO post_categories (category_name) VALUES (?)', [category_name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, category_name });
  });
};

// Cập nhật danh mục
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  db.query('UPDATE post_categories SET category_name = ? WHERE category_id = ?', [category_name, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Cập nhật thành công");
  });
};

// Xoá danh mục
exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM post_categories WHERE category_id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Xoá thành công");
  });
};
