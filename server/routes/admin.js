import express from 'express';
import { dbState, memoryStore, getPool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply requireAdmin to all admin routes
router.use(requireAdmin);

// Dashboard metrics
router.get('/metrics', async (req, res) => {
  try {
    if (dbState.connected) {
      const pool = getPool();
      const careersCount = await pool.query('SELECT count(*) FROM careers');
      const coursesCount = await pool.query('SELECT count(*) FROM courses');
      const categoriesCount = await pool.query('SELECT count(*) FROM categories');
      const usersCount = await pool.query('SELECT count(*) FROM users');
      const assessmentsCount = await pool.query('SELECT count(*) FROM assessment_results');

      return res.json({
        success: true,
        metrics: {
          careers: parseInt(careersCount.rows[0].count, 10),
          courses: parseInt(coursesCount.rows[0].count, 10),
          categories: parseInt(categoriesCount.rows[0].count, 10),
          users: parseInt(usersCount.rows[0].count, 10),
          assessments: parseInt(assessmentsCount.rows[0].count, 10)
        },
        dbState
      });
    } else {
      return res.json({
        success: true,
        metrics: {
          careers: memoryStore.careers.length,
          courses: memoryStore.courses.length,
          categories: memoryStore.categories.length,
          users: memoryStore.users.length,
          assessments: memoryStore.assessmentResults.length
        },
        dbState
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create career
router.post('/careers', async (req, res) => {
  try {
    const {
      title, category_id, short_desc, full_desc, educational_qualifications,
      required_skills, job_roles, career_pathway, future_opportunities,
      salary_entry, salary_mid, salary_senior, growth_outlook, work_environment,
      top_recruiters, image_url
    } = req.body;

    if (!title || !category_id) {
      return res.status(400).json({ success: false, message: 'Title and Category ID are required.' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    if (dbState.connected) {
      const pool = getPool();
      const result = await pool.query(
        `INSERT INTO careers (
          category_id, title, slug, short_desc, full_desc, educational_qualifications,
          required_skills, job_roles, career_pathway, future_opportunities,
          salary_entry, salary_mid, salary_senior, growth_outlook, work_environment,
          top_recruiters, image_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *`,
        [
          parseInt(category_id, 10),
          title,
          slug,
          short_desc || '',
          full_desc || '',
          educational_qualifications || '',
          JSON.stringify(required_skills || []),
          JSON.stringify(job_roles || []),
          JSON.stringify(career_pathway || []),
          future_opportunities || '',
          salary_entry || '₹4 - 8 LPA',
          salary_mid || '₹10 - 20 LPA',
          salary_senior || '₹22 - 45+ LPA',
          growth_outlook || 'High',
          work_environment || 'Office / Hybrid',
          JSON.stringify(top_recruiters || []),
          image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
        ]
      );
      return res.status(201).json({ success: true, message: 'Career created successfully!', career: result.rows[0] });
    } else {
      const newCareer = {
        id: memoryStore.careers.length + 1,
        category_id: parseInt(category_id, 10),
        title,
        slug,
        short_desc: short_desc || '',
        full_desc: full_desc || '',
        educational_qualifications: educational_qualifications || '',
        required_skills: required_skills || [],
        job_roles: job_roles || [],
        career_pathway: career_pathway || [],
        future_opportunities: future_opportunities || '',
        salary_entry: salary_entry || '₹4 - 8 LPA',
        salary_mid: salary_mid || '₹10 - 20 LPA',
        salary_senior: salary_senior || '₹22 - 45+ LPA',
        growth_outlook: growth_outlook || 'High',
        work_environment: work_environment || 'Office / Hybrid',
        top_recruiters: top_recruiters || [],
        image_url: image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
      };
      memoryStore.careers.push(newCareer);
      return res.status(201).json({ success: true, message: 'Career created successfully!', career: newCareer });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update career
router.put('/careers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, category_id, short_desc, full_desc, educational_qualifications,
      required_skills, job_roles, career_pathway, future_opportunities,
      salary_entry, salary_mid, salary_senior, growth_outlook, work_environment,
      top_recruiters, image_url
    } = req.body;

    if (dbState.connected) {
      const pool = getPool();
      const updateRes = await pool.query(
        `UPDATE careers
         SET title = COALESCE($1, title),
             category_id = COALESCE($2, category_id),
             short_desc = COALESCE($3, short_desc),
             full_desc = COALESCE($4, full_desc),
             educational_qualifications = COALESCE($5, educational_qualifications),
             required_skills = COALESCE($6, required_skills),
             job_roles = COALESCE($7, job_roles),
             career_pathway = COALESCE($8, career_pathway),
             future_opportunities = COALESCE($9, future_opportunities),
             salary_entry = COALESCE($10, salary_entry),
             salary_mid = COALESCE($11, salary_mid),
             salary_senior = COALESCE($12, salary_senior),
             growth_outlook = COALESCE($13, growth_outlook),
             work_environment = COALESCE($14, work_environment),
             top_recruiters = COALESCE($15, top_recruiters),
             image_url = COALESCE($16, image_url)
         WHERE id = $17
         RETURNING *`,
        [
          title,
          category_id ? parseInt(category_id, 10) : null,
          short_desc,
          full_desc,
          educational_qualifications,
          required_skills ? JSON.stringify(required_skills) : null,
          job_roles ? JSON.stringify(job_roles) : null,
          career_pathway ? JSON.stringify(career_pathway) : null,
          future_opportunities,
          salary_entry,
          salary_mid,
          salary_senior,
          growth_outlook,
          work_environment,
          top_recruiters ? JSON.stringify(top_recruiters) : null,
          image_url,
          id
        ]
      );
      if (updateRes.rows.length === 0) return res.status(404).json({ success: false, message: 'Career not found.' });
      return res.json({ success: true, message: 'Career updated!', career: updateRes.rows[0] });
    } else {
      const idx = memoryStore.careers.findIndex(c => c.id === parseInt(id, 10));
      if (idx === -1) return res.status(404).json({ success: false, message: 'Career not found.' });

      memoryStore.careers[idx] = {
        ...memoryStore.careers[idx],
        ...req.body,
        id: parseInt(id, 10)
      };
      return res.json({ success: true, message: 'Career updated!', career: memoryStore.careers[idx] });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete career
router.delete('/careers/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (dbState.connected) {
      const pool = getPool();
      await pool.query('DELETE FROM careers WHERE id = $1', [id]);
      return res.json({ success: true, message: 'Career deleted successfully.' });
    } else {
      const idx = memoryStore.careers.findIndex(c => c.id === parseInt(id, 10));
      if (idx === -1) return res.status(404).json({ success: false, message: 'Career not found.' });
      memoryStore.careers.splice(idx, 1);
      return res.json({ success: true, message: 'Career deleted successfully.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create course
router.post('/courses', async (req, res) => {
  try {
    const { title, degree_type, duration, eligibility, entrance_exams, top_colleges, description, category_name } = req.body;

    if (!title || !degree_type) {
      return res.status(400).json({ success: false, message: 'Title and degree type are required.' });
    }

    if (dbState.connected) {
      const pool = getPool();
      const insertRes = await pool.query(
        `INSERT INTO courses (title, degree_type, duration, eligibility, entrance_exams, top_colleges, description, category_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          title,
          degree_type,
          duration || '3-4 Years',
          eligibility || '10+2 passing marks',
          JSON.stringify(entrance_exams || []),
          JSON.stringify(top_colleges || []),
          description || '',
          category_name || 'Information Technology'
        ]
      );
      return res.status(201).json({ success: true, message: 'Course created successfully!', course: insertRes.rows[0] });
    } else {
      const newCourse = {
        id: memoryStore.courses.length + 1,
        title,
        degree_type,
        duration: duration || '3-4 Years',
        eligibility: eligibility || '10+2 passing marks',
        entrance_exams: entrance_exams || [],
        top_colleges: top_colleges || [],
        description: description || '',
        category_name: category_name || 'Information Technology'
      };
      memoryStore.courses.push(newCourse);
      return res.status(201).json({ success: true, message: 'Course created successfully!', course: newCourse });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete course
router.delete('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (dbState.connected) {
      const pool = getPool();
      await pool.query('DELETE FROM courses WHERE id = $1', [id]);
      return res.json({ success: true, message: 'Course deleted successfully.' });
    } else {
      const idx = memoryStore.courses.findIndex(c => c.id === parseInt(id, 10));
      if (idx === -1) return res.status(404).json({ success: false, message: 'Course not found.' });
      memoryStore.courses.splice(idx, 1);
      return res.json({ success: true, message: 'Course deleted successfully.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// List all registered students
router.get('/users', async (req, res) => {
  try {
    if (dbState.connected) {
      const pool = getPool();
      const usersRes = await pool.query(
        'SELECT id, name, email, role, education_level, stream_interest, created_at FROM users ORDER BY created_at DESC'
      );
      return res.json({ success: true, users: usersRes.rows });
    } else {
      const safeUsers = memoryStore.users.map(({ password, ...u }) => u);
      return res.json({ success: true, users: safeUsers });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// List student assessments
router.get('/assessments', async (req, res) => {
  try {
    if (dbState.connected) {
      const pool = getPool();
      const result = await pool.query('SELECT * FROM assessment_results ORDER BY created_at DESC LIMIT 50');
      return res.json({ success: true, assessments: result.rows });
    } else {
      return res.json({ success: true, assessments: memoryStore.assessmentResults });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

