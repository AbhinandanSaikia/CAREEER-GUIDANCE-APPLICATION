import express from 'express';
import { dbState, memoryStore, getPool } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get saved careers
router.get('/saved', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    if (dbState.connected) {
      const pool = getPool();
      const result = await pool.query(`
        SELECT sc.id AS save_id, sc.saved_at, sc.notes,
               cr.*, cat.name AS category_name, cat.color AS category_color
        FROM saved_careers sc
        JOIN careers cr ON sc.career_id = cr.id
        JOIN categories cat ON cr.category_id = cat.id
        WHERE sc.user_id = $1
        ORDER BY sc.saved_at DESC
      `, [userId]);

      return res.json({ success: true, data: result.rows });
    } else {
      const userSaves = memoryStore.savedCareers.filter(s => s.user_id === userId);
      const data = userSaves.map(s => {
        const cr = memoryStore.careers.find(c => c.id === s.career_id) || {};
        const cat = memoryStore.categories.find(c => c.id === cr.category_id) || {};
        return {
          save_id: s.id,
          saved_at: s.saved_at,
          notes: s.notes,
          ...cr,
          category_name: cat.name || '',
          category_color: cat.color || ''
        };
      });
      return res.json({ success: true, data });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Toggle save/unsave career
router.post('/save-career', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { careerId, notes } = req.body;

    if (!careerId) {
      return res.status(400).json({ success: false, message: 'Career ID is required.' });
    }

    if (dbState.connected) {
      const pool = getPool();
      const existing = await pool.query(
        'SELECT id FROM saved_careers WHERE user_id = $1 AND career_id = $2',
        [userId, careerId]
      );

      if (existing.rows.length > 0) {
        await pool.query('DELETE FROM saved_careers WHERE id = $1', [existing.rows[0].id]);
        return res.json({ success: true, saved: false, message: 'Career removed from bookmarks.' });
      } else {
        await pool.query(
          'INSERT INTO saved_careers (user_id, career_id, notes) VALUES ($1, $2, $3)',
          [userId, careerId, notes || '']
        );
        return res.json({ success: true, saved: true, message: 'Career saved to your bookmarks!' });
      }
    } else {
      const existingIdx = memoryStore.savedCareers.findIndex(
        s => s.user_id === userId && s.career_id === parseInt(careerId, 10)
      );

      if (existingIdx >= 0) {
        memoryStore.savedCareers.splice(existingIdx, 1);
        return res.json({ success: true, saved: false, message: 'Career removed from bookmarks.' });
      } else {
        memoryStore.savedCareers.push({
          id: memoryStore.savedCareers.length + 1,
          user_id: userId,
          career_id: parseInt(careerId, 10),
          notes: notes || '',
          saved_at: new Date().toISOString()
        });
        return res.json({ success: true, saved: true, message: 'Career saved to your bookmarks!' });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get user roadmaps
router.get('/roadmaps', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    if (dbState.connected) {
      const pool = getPool();
      const result = await pool.query(`
        SELECT ur.*, cr.title AS career_title, cr.slug AS career_slug, cr.career_pathway
        FROM user_roadmaps ur
        JOIN careers cr ON ur.career_id = cr.id
        WHERE ur.user_id = $1
      `, [userId]);
      return res.json({ success: true, data: result.rows });
    } else {
      const userRoadmaps = memoryStore.userRoadmaps.filter(r => r.user_id === userId);
      const data = userRoadmaps.map(ur => {
        const cr = memoryStore.careers.find(c => c.id === ur.career_id) || {};
        return {
          ...ur,
          career_title: cr.title,
          career_slug: cr.slug,
          career_pathway: cr.career_pathway
        };
      });
      return res.json({ success: true, data });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update roadmap milestone
router.post('/roadmaps/step', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { careerId, stepNumber, completed } = req.body;

    if (!careerId || stepNumber === undefined) {
      return res.status(400).json({ success: false, message: 'Career ID and step number required.' });
    }

    if (dbState.connected) {
      const pool = getPool();
      const existing = await pool.query(
        'SELECT * FROM user_roadmaps WHERE user_id = $1 AND career_id = $2',
        [userId, careerId]
      );

      let steps = [];
      if (existing.rows.length > 0) {
        steps = Array.isArray(existing.rows[0].completed_steps) ? existing.rows[0].completed_steps : [];
        if (completed) {
          if (!steps.includes(stepNumber)) steps.push(stepNumber);
        } else {
          steps = steps.filter(s => s !== stepNumber);
        }

        await pool.query(
          `UPDATE user_roadmaps
           SET completed_steps = $1::jsonb, updated_at = CURRENT_TIMESTAMP
           WHERE id = $2`,
          [JSON.stringify(steps), existing.rows[0].id]
        );
      } else {
        steps = completed ? [stepNumber] : [];
        await pool.query(
          `INSERT INTO user_roadmaps (user_id, career_id, completed_steps)
           VALUES ($1, $2, $3::jsonb)`,
          [userId, careerId, JSON.stringify(steps)]
        );
      }

      return res.json({ success: true, completedSteps: steps, message: 'Milestone updated!' });
    } else {
      let rRecord = memoryStore.userRoadmaps.find(
        r => r.user_id === userId && r.career_id === parseInt(careerId, 10)
      );

      if (!rRecord) {
        rRecord = {
          id: memoryStore.userRoadmaps.length + 1,
          user_id: userId,
          career_id: parseInt(careerId, 10),
          completed_steps: [],
          updated_at: new Date().toISOString()
        };
        memoryStore.userRoadmaps.push(rRecord);
      }

      if (completed) {
        if (!rRecord.completed_steps.includes(stepNumber)) {
          rRecord.completed_steps.push(stepNumber);
        }
      } else {
        rRecord.completed_steps = rRecord.completed_steps.filter(s => s !== stepNumber);
      }

      return res.json({ success: true, completedSteps: rRecord.completed_steps, message: 'Milestone updated!' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

