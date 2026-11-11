import express from 'express';
import { dbState, memoryStore, getPool } from '../db.js';

const router = express.Router();

// List courses with search and filter
router.get('/', async (req, res) => {
  try {
    const { category, search, degree_type } = req.query;

    if (dbState.connected) {
      const pool = getPool();
      let queryStr = 'SELECT * FROM courses WHERE 1=1';
      const params = [];

      if (category && category !== 'all') {
        params.push(category);
        queryStr += ` AND category_name = $${params.length}`;
      }

      if (degree_type && degree_type !== 'all') {
        params.push(degree_type);
        queryStr += ` AND degree_type = $${params.length}`;
      }

      if (search && search.trim() !== '') {
        params.push(`%${search.trim().toLowerCase()}%`);
        queryStr += ` AND (LOWER(title) LIKE $${params.length} OR LOWER(description) LIKE $${params.length} OR LOWER(eligibility) LIKE $${params.length})`;
      }

      queryStr += ' ORDER BY id ASC';
      const result = await pool.query(queryStr, params);
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      let filtered = [...memoryStore.courses];

      if (category && category !== 'all') {
        filtered = filtered.filter(c => c.category_name?.toLowerCase() === category.toLowerCase());
      }

      if (degree_type && degree_type !== 'all') {
        filtered = filtered.filter(c => c.degree_type?.toLowerCase() === degree_type.toLowerCase());
      }

      if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(c =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.eligibility.toLowerCase().includes(q)
        );
      }

      return res.json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Single course
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (dbState.connected) {
      const pool = getPool();
      const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Course not found.' });
      }
      return res.json({ success: true, course: result.rows[0] });
    } else {
      const course = memoryStore.courses.find(c => c.id === parseInt(id, 10));
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found.' });
      }
      return res.json({ success: true, course });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

