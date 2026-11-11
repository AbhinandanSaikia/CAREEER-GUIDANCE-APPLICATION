import express from 'express';
import bcrypt from 'bcryptjs';
import { dbState, memoryStore, getPool } from '../db.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, education_level, stream_interest, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (dbState.connected) {
      const pool = getPool();
      const existing = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1', [cleanEmail]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertRes = await pool.query(
        `INSERT INTO users (name, email, password, role, education_level, stream_interest, bio)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, name, email, role, education_level, stream_interest, bio, created_at`,
        [name, cleanEmail, hashedPassword, 'student', education_level || 'Undergraduate', stream_interest || 'General', bio || '']
      );

      const newUser = insertRes.rows[0];
      const token = generateToken(newUser);
      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: newUser
      });
    } else {
      // Memory fallback
      const exists = memoryStore.users.find(u => u.email.toLowerCase() === cleanEmail);
      if (exists) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: memoryStore.users.length + 1,
        name,
        email: cleanEmail,
        password: hashedPassword,
        role: 'student',
        education_level: education_level || 'Undergraduate',
        stream_interest: stream_interest || 'General',
        bio: bio || '',
        created_at: new Date().toISOString()
      };

      memoryStore.users.push(newUser);
      const token = generateToken(newUser);

      const { password: _, ...userSafe } = newUser;
      return res.status(201).json({
        success: true,
        message: 'Account created successfully (local mode)!',
        token,
        user: userSafe
      });
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (dbState.connected) {
      const pool = getPool();
      const userRes = await pool.query('SELECT * FROM users WHERE LOWER(email) = $1', [cleanEmail]);
      if (userRes.rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const user = userRes.rows[0];
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const token = generateToken(user);
      const { password: _, ...userSafe } = user;
      return res.json({
        success: true,
        message: 'Signed in successfully!',
        token,
        user: userSafe
      });
    } else {
      // Memory fallback
      const user = memoryStore.users.find(u => u.email.toLowerCase() === cleanEmail);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const token = generateToken(user);
      const { password: _, ...userSafe } = user;
      return res.json({
        success: true,
        message: 'Signed in successfully (local mode)!',
        token,
        user: userSafe
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    if (dbState.connected) {
      const pool = getPool();
      const userRes = await pool.query(
        'SELECT id, name, email, role, education_level, stream_interest, bio, created_at FROM users WHERE id = $1',
        [req.user.id]
      );
      if (userRes.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      return res.json({ success: true, user: userRes.rows[0] });
    } else {
      const user = memoryStore.users.find(u => u.id === req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      const { password: _, ...userSafe } = user;
      return res.json({ success: true, user: userSafe });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, education_level, stream_interest, bio } = req.body;

    if (dbState.connected) {
      const pool = getPool();
      const updateRes = await pool.query(
        `UPDATE users
         SET name = COALESCE($1, name),
             education_level = COALESCE($2, education_level),
             stream_interest = COALESCE($3, stream_interest),
             bio = COALESCE($4, bio)
         WHERE id = $5
         RETURNING id, name, email, role, education_level, stream_interest, bio, created_at`,
        [name, education_level, stream_interest, bio, req.user.id]
      );
      return res.json({ success: true, message: 'Profile updated!', user: updateRes.rows[0] });
    } else {
      const user = memoryStore.users.find(u => u.id === req.user.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

      if (name) user.name = name;
      if (education_level) user.education_level = education_level;
      if (stream_interest) user.stream_interest = stream_interest;
      if (bio !== undefined) user.bio = bio;

      const { password: _, ...userSafe } = user;
      return res.json({ success: true, message: 'Profile updated!', user: userSafe });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

