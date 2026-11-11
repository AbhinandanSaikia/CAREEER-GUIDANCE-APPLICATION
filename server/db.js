import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialCategories,
  initialCareers,
  initialCourses,
  assessmentQuestions
} from './seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export let dbState = {
  connected: false,
  provider: 'local_fallback',
  host: null,
  database: null,
  tableCounts: {},
  lastError: null,
  message: 'Initializing...'
};

let pool = null;

// Local in-memory state for fallback
export const memoryStore = {
  users: [],
  categories: [...initialCategories],
  careers: [...initialCareers],
  courses: [...initialCourses],
  assessmentQuestions: [...assessmentQuestions],
  assessmentResults: [],
  savedCareers: [],
  userRoadmaps: []
};

// Initialize seed users in memory
const initMemoryUsers = async () => {
  const adminHashed = await bcrypt.hash('admin123', 10);
  const studentHashed = await bcrypt.hash('student123', 10);

  memoryStore.users = [
    {
      id: 1,
      name: 'Diapanita Paul (Admin)',
      email: 'admin@career.edu',
      password: adminHashed,
      role: 'admin',
      education_level: 'Postgraduate / Faculty',
      stream_interest: 'Computer Science',
      bio: 'Administrator for Career Guidance System.',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Sample Student',
      email: 'student@career.edu',
      password: studentHashed,
      role: 'student',
      education_level: 'Undergraduate (BCA / B.Sc)',
      stream_interest: 'Information Technology',
      bio: 'Enthusiastic student exploring career pathways in software and artificial intelligence.',
      created_at: new Date().toISOString()
    }
  ];
};

await initMemoryUsers();

export async function initDatabase(customUrl = null) {
  const connectionString = customUrl || process.env.DATABASE_URL;

  if (!connectionString || connectionString.trim() === '' || connectionString.includes('your_neon_database_url_here')) {
    console.log('ℹ️ [Database] No Neon DATABASE_URL provided. Running in high-performance local memory fallback mode.');
    dbState = {
      connected: false,
      provider: 'local_fallback',
      host: 'localhost (in-memory demo)',
      database: 'memory_store',
      tableCounts: {
        categories: memoryStore.categories.length,
        careers: memoryStore.careers.length,
        courses: memoryStore.courses.length,
        users: memoryStore.users.length,
        assessments: memoryStore.assessmentResults.length
      },
      lastError: null,
      message: 'Running in demo mode. Provide a Neon connection string in .env to connect to your live Neon PostgreSQL database.'
    };
    return false;
  }

  try {
    console.log('⏳ [Database] Attempting connection to Neon PostgreSQL...');
    if (pool) {
      await pool.end().catch(() => {});
    }

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      },
      connectionTimeoutMillis: 10000
    });

    // Test query
    const res = await pool.query('SELECT current_database(), current_user, version()');
    const dbName = res.rows[0]?.current_database || 'neondb';
    const parsedUrl = new URL(connectionString.replace('postgresql://', 'http://'));

    console.log(`✅ [Database] Connected successfully to Neon PostgreSQL! Host: ${parsedUrl.hostname}, DB: ${dbName}`);

    dbState.connected = true;
    dbState.provider = 'neon';
    dbState.host = parsedUrl.hostname;
    dbState.database = dbName;
    dbState.message = 'Connected to Neon PostgreSQL';

    // Read and run schema
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await pool.query(schemaSql);
    console.log('✅ [Database] Neon PostgreSQL schema verified/created successfully.');

    // Sync updated career images in Neon
    await pool.query(`
      UPDATE careers SET image_url = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80' WHERE id = 2 OR slug = 'ai-ml-engineer';
      UPDATE careers SET image_url = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' WHERE id = 5 OR slug = 'civil-engineer';
      UPDATE careers SET image_url = 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=800&q=80' WHERE id = 20 OR slug = 'aerospace-engineer';
    `).catch(() => {});

    // Check if seed data is needed
    const catCheck = await pool.query('SELECT count(*) FROM categories');
    const careerCheck = await pool.query('SELECT count(*) FROM careers');
    const courseCheck = await pool.query('SELECT count(*) FROM courses');
    const userCheck = await pool.query('SELECT count(*) FROM users');

    const needsSeed =
      parseInt(catCheck.rows[0].count, 10) < 10 ||
      parseInt(careerCheck.rows[0].count, 10) < 10 ||
      parseInt(courseCheck.rows[0].count, 10) < 5 ||
      parseInt(userCheck.rows[0].count, 10) < 2;

    if (needsSeed) {
      console.log('🌱 [Database] Seeding initial data into Neon PostgreSQL...');
      await seedNeonDatabase();
      console.log('✅ [Database] Neon seeding completed!');
    }

    // Refresh counts
    const catFinal = await pool.query('SELECT count(*) FROM categories');
    const careerFinal = await pool.query('SELECT count(*) FROM careers');
    const courseFinal = await pool.query('SELECT count(*) FROM courses');
    const userFinal = await pool.query('SELECT count(*) FROM users');

    dbState = {
      connected: true,
      provider: 'neon',
      host: parsedUrl.hostname,
      database: dbName,
      tableCounts: {
        categories: parseInt(catFinal.rows[0].count, 10),
        careers: parseInt(careerFinal.rows[0].count, 10),
        courses: parseInt(courseFinal.rows[0].count, 10),
        users: parseInt(userFinal.rows[0].count, 10)
      },
      lastError: null,
      message: 'Successfully connected and synced with Neon Serverless PostgreSQL!'
    };

    return true;
  } catch (err) {
    console.error('❌ [Database] Failed to connect to Neon PostgreSQL:', err.message);
    dbState = {
      connected: false,
      provider: 'local_fallback',
      host: null,
      database: null,
      tableCounts: {
        categories: memoryStore.categories.length,
        careers: memoryStore.careers.length,
        courses: memoryStore.courses.length,
        users: memoryStore.users.length
      },
      lastError: err.message,
      message: `Failed to connect to Neon: ${err.message}. Using local storage fallback.`
    };
    return false;
  }
}

async function seedNeonDatabase() {
  if (!pool) return;

  // Insert categories
  for (const cat of initialCategories) {
    await pool.query(
      `INSERT INTO categories (id, name, slug, description, icon, color, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO NOTHING`,
      [cat.id, cat.name, cat.slug, cat.description, cat.icon, cat.color, cat.display_order]
    );
  }
  await pool.query("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))");

  // Insert careers
  for (const c of initialCareers) {
    await pool.query(
      `INSERT INTO careers (
        id, category_id, title, slug, short_desc, full_desc,
        educational_qualifications, required_skills, job_roles,
        career_pathway, future_opportunities, salary_entry,
        salary_mid, salary_senior, growth_outlook, work_environment,
        top_recruiters, image_url
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       ON CONFLICT (id) DO UPDATE SET image_url = EXCLUDED.image_url`,
      [
        c.id,
        c.category_id,
        c.title,
        c.slug,
        c.short_desc,
        c.full_desc,
        c.educational_qualifications,
        JSON.stringify(c.required_skills),
        JSON.stringify(c.job_roles),
        JSON.stringify(c.career_pathway),
        c.future_opportunities,
        c.salary_entry,
        c.salary_mid,
        c.salary_senior,
        c.growth_outlook,
        c.work_environment,
        JSON.stringify(c.top_recruiters),
        c.image_url
      ]
    );
  }
  await pool.query("SELECT setval('careers_id_seq', (SELECT MAX(id) FROM careers))");

  // Insert courses
  for (const cr of initialCourses) {
    await pool.query(
      `INSERT INTO courses (id, title, degree_type, duration, eligibility, entrance_exams, top_colleges, description, category_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO NOTHING`,
      [
        cr.id,
        cr.title,
        cr.degree_type,
        cr.duration,
        cr.eligibility,
        JSON.stringify(cr.entrance_exams),
        JSON.stringify(cr.top_colleges),
        cr.description,
        cr.category_name
      ]
    );
  }
  await pool.query("SELECT setval('courses_id_seq', (SELECT MAX(id) FROM courses))");

  // Insert default users
  const adminHashed = await bcrypt.hash('admin123', 10);
  const studentHashed = await bcrypt.hash('student123', 10);

  await pool.query(
    `INSERT INTO users (id, name, email, password, role, education_level, stream_interest, bio)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (id) DO NOTHING`,
    [1, 'Diapanita Paul (Admin)', 'admin@career.edu', adminHashed, 'admin', 'Postgraduate / Faculty', 'Computer Science', 'Administrator for Career Guidance System.']
  );

  await pool.query(
    `INSERT INTO users (id, name, email, password, role, education_level, stream_interest, bio)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (id) DO NOTHING`,
    [2, 'Sample Student', 'student@career.edu', studentHashed, 'student', 'Undergraduate (BCA / B.Sc)', 'Information Technology', 'Enthusiastic student exploring career pathways in software and AI.']
  );
  await pool.query("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
}

// Unified query wrapper
export async function query(text, params = []) {
  if (dbState.connected && pool) {
    return await pool.query(text, params);
  }

  // If running in local fallback, emulate basic SQL queries or handled directly by services
  return null;
}

export function getPool() {
  return pool;
}
