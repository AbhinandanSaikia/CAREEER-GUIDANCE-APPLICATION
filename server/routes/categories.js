import express from 'express';
import { dbState, memoryStore, getPool } from '../db.js';

const router = express.Router();

// List all categories
router.get('/', async (req, res) => {
  try {
    if (dbState.connected) {
      const pool = getPool();
      const catRes = await pool.query(`
        SELECT c.*, COUNT(cr.id) AS career_count
        FROM categories c
        LEFT JOIN careers cr ON c.id = cr.category_id
        GROUP BY c.id
        ORDER BY c.display_order ASC
      `);
      return res.json({ success: true, data: catRes.rows });
    } else {
      const data = memoryStore.categories.map(cat => {
        const count = memoryStore.careers.filter(c => c.category_id === cat.id).length;
        return { ...cat, career_count: count };
      }).sort((a, b) => a.display_order - b.display_order);
      return res.json({ success: true, data });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single category by slug or id
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const isNumeric = !isNaN(identifier);

    if (dbState.connected) {
      const pool = getPool();
      const queryText = isNumeric
        ? 'SELECT * FROM categories WHERE id = $1'
        : 'SELECT * FROM categories WHERE slug = $1';
      const catRes = await pool.query(queryText, [identifier]);

      if (catRes.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Category not found.' });
      }

      const cat = catRes.rows[0];
      const careersRes = await pool.query('SELECT * FROM careers WHERE category_id = $1 ORDER BY title ASC', [cat.id]);
      return res.json({ success: true, category: cat, careers: careersRes.rows });
    } else {
      const cat = memoryStore.categories.find(c =>
        isNumeric ? c.id === parseInt(identifier, 10) : c.slug === identifier
      );

      if (!cat) {
        return res.status(404).json({ success: false, message: 'Category not found.' });
      }

      const careers = memoryStore.careers.filter(c => c.category_id === cat.id);
      return res.json({ success: true, category: cat, careers });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

