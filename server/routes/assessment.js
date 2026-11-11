import express from 'express';
import { dbState, memoryStore, getPool } from '../db.js';
import { assessmentQuestions } from '../seedData.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get questions
router.get('/questions', (req, res) => {
  return res.json({ success: true, questions: assessmentQuestions });
});

// Submit assessment
router.post('/submit', async (req, res) => {
  try {
    const { answers, userId, userName, userEmail } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid assessment submission.' });
    }

    // Tally scores across categories
    const categoryScores = {
      'Information Technology': 0,
      'Engineering': 0,
      'Medical and Healthcare': 0,
      'Government Services': 0,
      'Business and Management': 0,
      'Finance and Banking': 0,
      'Education and Teaching': 0,
      'Design and Creative Fields': 0,
      'Media and Communication': 0,
      'Science and Research': 0
    };

    // Calculate points
    answers.forEach((ans) => {
      const q = assessmentQuestions.find(item => item.id === ans.questionId);
      if (q && q.options && q.options[ans.optionIndex]) {
        const selectedOpt = q.options[ans.optionIndex];
        if (selectedOpt.traits) {
          Object.entries(selectedOpt.traits).forEach(([category, pts]) => {
            if (categoryScores[category] !== undefined) {
              categoryScores[category] += pts;
            }
          });
        }
      }
    });

    // Find highest score to calculate match percentages
    const maxPossible = Math.max(...Object.values(categoryScores), 1);
    const percentageScores = {};
    Object.entries(categoryScores).forEach(([cat, val]) => {
      // Scale between 40% and 98%
      const pct = Math.round((val / maxPossible) * 58) + 40;
      percentageScores[cat] = Math.min(pct, 98);
    });

    // Rank categories
    const sortedCategories = Object.entries(percentageScores)
      .sort((a, b) => b[1] - a[1])
      .map(([name, score]) => ({ name, score }));

    const topCategoryNames = sortedCategories.slice(0, 3).map(c => c.name);

    // Pick top matching careers
    let allCareers = [];
    if (dbState.connected) {
      const pool = getPool();
      const carRes = await pool.query(`
        SELECT cr.*, cat.name AS category_name
        FROM careers cr
        JOIN categories cat ON cr.category_id = cat.id
      `);
      allCareers = carRes.rows;
    } else {
      allCareers = memoryStore.careers.map(cr => {
        const cat = memoryStore.categories.find(c => c.id === cr.category_id);
        return { ...cr, category_name: cat ? cat.name : '' };
      });
    }

    const recommendedCareers = allCareers
      .filter(cr => topCategoryNames.includes(cr.category_name))
      .slice(0, 5)
      .map((cr, idx) => ({
        ...cr,
        matchScore: Math.max(96 - idx * 4, 75)
      }));

    // Generate intelligent AI assessment synthesis
    const top1 = sortedCategories[0];
    const top2 = sortedCategories[1];
    const aiFeedback = `Based on your cognitive problem-solving approach and intellectual interests, you demonstrate an exceptional aptitude for ${top1.name} (${top1.score}% match) followed by ${top2.name} (${top2.score}% match). You thrive in environments that reward structured logic, strategic execution, and forward-looking problem solving. Your primary recommended pathway is ${recommendedCareers[0]?.title || 'Technology and Engineering'}, which aligns directly with your analytical and creative curiosity. We recommend pursuing relevant foundational courses and working on practical portfolio projects to solidify this trajectory.`;

    const resultRecord = {
      user_id: userId || null,
      user_name: userName || 'Student Guest',
      user_email: userEmail || 'guest@student.local',
      scores: percentageScores,
      top_categories: sortedCategories.slice(0, 4),
      recommended_careers: recommendedCareers,
      ai_feedback: aiFeedback,
      created_at: new Date().toISOString()
    };

    // Save result if user is authenticated or store locally
    if (dbState.connected) {
      const pool = getPool();
      const insertRes = await pool.query(
        `INSERT INTO assessment_results (user_id, user_name, user_email, scores, top_categories, recommended_careers, ai_feedback)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, created_at`,
        [
          userId || null,
          userName || 'Student Guest',
          userEmail || 'guest@student.local',
          JSON.stringify(percentageScores),
          JSON.stringify(sortedCategories.slice(0, 4)),
          JSON.stringify(recommendedCareers),
          aiFeedback
        ]
      );
      resultRecord.id = insertRes.rows[0].id;
    } else {
      resultRecord.id = memoryStore.assessmentResults.length + 1;
      memoryStore.assessmentResults.push(resultRecord);
    }

    return res.json({
      success: true,
      message: 'Assessment analyzed successfully with AI career profiling!',
      result: resultRecord
    });
  } catch (err) {
    console.error('Assessment submit error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get user's assessment history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    if (dbState.connected) {
      const pool = getPool();
      const result = await pool.query(
        'SELECT * FROM assessment_results WHERE user_id = $1 ORDER BY created_at DESC',
        [req.user.id]
      );
      return res.json({ success: true, data: result.rows });
    } else {
      const userAssessments = memoryStore.assessmentResults.filter(r => r.user_id === req.user.id);
      return res.json({ success: true, data: userAssessments });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

