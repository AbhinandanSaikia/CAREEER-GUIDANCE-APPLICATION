-- ================================================================
-- CAREER GUIDANCE APPLICATION - NEON POSTGRESQL SCHEMA
-- Submitted by Diapanita Paul (Enrolment No - 2433154715, Roll No. 14)
-- Academic Year 2026
-- Under Guidance of Mrs Emi Kalita, Assistant Professor, Dept of CS
-- ================================================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    education_level VARCHAR(100) DEFAULT 'Undergraduate',
    stream_interest VARCHAR(100) DEFAULT 'General',
    bio TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'Compass',
    color VARCHAR(50) DEFAULT 'blue',
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS careers (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_desc TEXT,
    full_desc TEXT,
    educational_qualifications TEXT,
    required_skills JSONB DEFAULT '[]'::jsonb,
    job_roles JSONB DEFAULT '[]'::jsonb,
    career_pathway JSONB DEFAULT '[]'::jsonb,
    future_opportunities TEXT,
    salary_entry VARCHAR(100) DEFAULT '₹3.5 - 6 LPA',
    salary_mid VARCHAR(100) DEFAULT '₹7 - 15 LPA',
    salary_senior VARCHAR(100) DEFAULT '₹18 - 35+ LPA',
    growth_outlook VARCHAR(50) DEFAULT 'High',
    work_environment VARCHAR(100) DEFAULT 'Hybrid / Office',
    top_recruiters JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    degree_type VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    eligibility TEXT NOT NULL,
    entrance_exams JSONB DEFAULT '[]'::jsonb,
    top_colleges JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    category_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assessment_results (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    scores JSONB NOT NULL,
    top_categories JSONB NOT NULL,
    recommended_careers JSONB NOT NULL,
    ai_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_careers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    career_id INT REFERENCES careers(id) ON DELETE CASCADE,
    notes TEXT DEFAULT '',
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, career_id)
);

CREATE TABLE IF NOT EXISTS user_roadmaps (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    career_id INT REFERENCES careers(id) ON DELETE CASCADE,
    completed_steps JSONB DEFAULT '[]'::jsonb,
    custom_notes TEXT DEFAULT '',
    target_year VARCHAR(50) DEFAULT '2026',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, career_id)
);

