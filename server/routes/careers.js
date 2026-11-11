import express from 'express';
import { dbState, memoryStore, getPool } from '../db.js';

const router = express.Router();

// Get careers with search, filter, and pagination
router.get('/', async (req, res) => {
  try {
    const { category, search, growth, limit } = req.query;

    if (dbState.connected) {
      const pool = getPool();
      let queryStr = `
        SELECT cr.*, cat.name AS category_name, cat.slug AS category_slug, cat.color AS category_color
        FROM careers cr
        JOIN categories cat ON cr.category_id = cat.id
        WHERE 1=1
      `;
      const params = [];

      if (category && category !== 'all') {
        params.push(isNaN(category) ? category : parseInt(category, 10));
        if (isNaN(category)) {
          queryStr += ` AND cat.slug = $${params.length}`;
        } else {
          queryStr += ` AND cat.id = $${params.length}`;
        }
      }

      if (search && search.trim() !== '') {
        params.push(`%${search.trim().toLowerCase()}%`);
        queryStr += ` AND (
          LOWER(cr.title) LIKE $${params.length} OR
          LOWER(cr.short_desc) LIKE $${params.length} OR
          LOWER(cr.full_desc) LIKE $${params.length} OR
          cr.required_skills::text ILIKE $${params.length}
        )`;
      }

      if (growth && growth !== 'all') {
        params.push(growth);
        queryStr += ` AND cr.growth_outlook = $${params.length}`;
      }

      queryStr += ' ORDER BY cr.id ASC';

      if (limit) {
        params.push(parseInt(limit, 10));
        queryStr += ` LIMIT $${params.length}`;
      }

      const result = await pool.query(queryStr, params);
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      // Memory fallback
      let filtered = [...memoryStore.careers].map(cr => {
        const cat = memoryStore.categories.find(c => c.id === cr.category_id);
        return {
          ...cr,
          category_name: cat ? cat.name : 'General',
          category_slug: cat ? cat.slug : '',
          category_color: cat ? cat.color : 'from-blue-600 to-indigo-600'
        };
      });

      if (category && category !== 'all') {
        if (!isNaN(category)) {
          filtered = filtered.filter(cr => cr.category_id === parseInt(category, 10));
        } else {
          filtered = filtered.filter(cr => cr.category_slug === category);
        }
      }

      if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(cr =>
          cr.title.toLowerCase().includes(q) ||
          cr.short_desc.toLowerCase().includes(q) ||
          cr.full_desc.toLowerCase().includes(q) ||
          (Array.isArray(cr.required_skills) && cr.required_skills.some(s => s.toLowerCase().includes(q)))
        );
      }

      if (growth && growth !== 'all') {
        filtered = filtered.filter(cr => cr.growth_outlook.toLowerCase() === growth.toLowerCase());
      }

      if (limit) {
        filtered = filtered.slice(0, parseInt(limit, 10));
      }

      return res.json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Featured careers for homepage
router.get('/featured', async (req, res) => {
  try {
    if (dbState.connected) {
      const pool = getPool();
      const resData = await pool.query(`
        SELECT cr.*, cat.name AS category_name, cat.slug AS category_slug, cat.color AS category_color
        FROM careers cr
        JOIN categories cat ON cr.category_id = cat.id
        WHERE cr.growth_outlook = 'Very High'
        LIMIT 6
      `);
      return res.json({ success: true, data: resData.rows });
    } else {
      const featured = memoryStore.careers
        .filter(c => c.growth_outlook === 'Very High')
        .slice(0, 6)
        .map(cr => {
          const cat = memoryStore.categories.find(c => c.id === cr.category_id);
          return {
            ...cr,
            category_name: cat ? cat.name : '',
            category_slug: cat ? cat.slug : '',
            category_color: cat ? cat.color : ''
          };
        });
      return res.json({ success: true, data: featured });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single career by id or slug
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const isNumeric = !isNaN(identifier);

    if (dbState.connected) {
      const pool = getPool();
      const queryStr = `
        SELECT cr.*, cat.name AS category_name, cat.slug AS category_slug, cat.color AS category_color
        FROM careers cr
        JOIN categories cat ON cr.category_id = cat.id
        WHERE ${isNumeric ? 'cr.id = $1' : 'cr.slug = $1'}
      `;
      const result = await pool.query(queryStr, [identifier]);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Career path not found.' });
      }

      const career = result.rows[0];

      // Related courses
      const coursesRes = await pool.query(
        'SELECT * FROM courses WHERE category_name = $1 LIMIT 4',
        [career.category_name]
      );

      // Similar careers in same category
      const similarRes = await pool.query(
        'SELECT id, title, slug, short_desc, image_url, salary_entry, growth_outlook FROM careers WHERE category_id = $1 AND id != $2 LIMIT 3',
        [career.category_id, career.id]
      );

      return res.json({
        success: true,
        career,
        relatedCourses: coursesRes.rows,
        similarCareers: similarRes.rows
      });
    } else {
      const careerRaw = memoryStore.careers.find(c =>
        isNumeric ? c.id === parseInt(identifier, 10) : c.slug === identifier
      );

      if (!careerRaw) {
        return res.status(404).json({ success: false, message: 'Career path not found.' });
      }

      const cat = memoryStore.categories.find(c => c.id === careerRaw.category_id);
      const career = {
        ...careerRaw,
        category_name: cat ? cat.name : '',
        category_slug: cat ? cat.slug : '',
        category_color: cat ? cat.color : ''
      };

      const relatedCourses = memoryStore.courses
        .filter(c => c.category_name === career.category_name)
        .slice(0, 4);

      const similarCareers = memoryStore.careers
        .filter(c => c.category_id === career.category_id && c.id !== career.id)
        .slice(0, 3);

      return res.json({
        success: true,
        career,
        relatedCourses,
        similarCareers
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

