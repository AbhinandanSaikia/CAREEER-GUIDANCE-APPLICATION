import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initDatabase, dbState } from './db.js';

import authRoutes from './routes/auth.js';
import categoriesRoutes from './routes/categories.js';
import careersRoutes from './routes/careers.js';
import coursesRoutes from './routes/courses.js';
import assessmentRoutes from './routes/assessment.js';
import aiRoutes from './routes/ai.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database Status & Neon Live Config Endpoints
app.get('/api/db/status', (req, res) => {
  res.json({
    success: true,
    status: dbState
  });
});

app.post('/api/db/connect', async (req, res) => {
  const { databaseUrl } = req.body;
  if (!databaseUrl || !databaseUrl.trim().startsWith('postgresql://')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Neon PostgreSQL URL. Format must begin with postgresql://...'
    });
  }

  const cleanUrl = databaseUrl.trim();
  const success = await initDatabase(cleanUrl);

  if (success) {
    // Save to .env file for persistence
    try {
      const envPath = path.join(__dirname, '..', '.env');
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf-8');
      }

      if (envContent.includes('DATABASE_URL=')) {
        envContent = envContent.replace(/DATABASE_URL=.*/g, `DATABASE_URL="${cleanUrl}"`);
      } else {
        envContent += `\nDATABASE_URL="${cleanUrl}"\n`;
      }
      fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf-8');
    } catch (fsErr) {
      console.warn('Could not update .env file:', fsErr.message);
    }

    return res.json({
      success: true,
      message: 'Successfully connected and synced with Neon PostgreSQL database!',
      status: dbState
    });
  } else {
    return res.status(500).json({
      success: false,
      message: dbState.lastError || 'Could not connect to Neon PostgreSQL with provided URL.',
      status: dbState
    });
  }
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    project: 'Career Guidance Application',
    author: 'Diapanita Paul',
    supervisor: 'Mrs Emi Kalita',
    year: 2026,
    neonDatabase: dbState.connected ? 'Connected' : 'Local Fallback (Ready for Neon URL)',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start server and initialize database
async function startServer() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Career Guidance Application API Backend running on port ${PORT}`);
    console.log(`📡 Neon PostgreSQL Status: ${dbState.connected ? '🟢 Connected (' + dbState.host + ')' : '🟡 Local Storage Fallback'}`);
    console.log(`🎓 Project Synopsis: Diapanita Paul`);
    console.log(`======================================================\n`);
  });
}

startServer();
