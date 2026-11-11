# Career Guidance Application

**Project Synopsis Implementation**  
- **Submitted by:** Diapanita Paul (Enrolment No - 2433154715, Roll No. 14)  
- **Under the Guidance of:** Mrs Emi Kalita, Assistant Professor, Department of Computer Science  
- **Academic Year:** 2026  

---

## 🌟 Overview

The **Career Guidance Application** is a full-stack web platform built to help students explore diverse career pathways, understand required qualifications and skills, calculate personality fit through an AI-powered questionnaire, and track milestone roadmaps.

### ✨ Key Features Aligned with Synopsis
1. **User Authentication & Profiles:** Secure registration and login (JWT auth) with role separation (Student and Admin). Students can maintain custom profiles, bookmark career paths, and view their assessment history.
2. **10 Specified Career Categories:**
   - Information Technology
   - Engineering
   - Medical and Healthcare
   - Government Services
   - Business and Management
   - Finance and Banking
   - Education and Teaching
   - Design and Creative Fields
   - Media and Communication
   - Science and Research
3. **Comprehensive Career Profiles:** Detailed entries including overview, educational qualifications, technical and soft skills, salary brackets in India, job roles, top recruiters, and future outlook.
4. **Interactive Milestone Roadmaps:** Visual step-by-step pathways from high school to senior leadership with checklist milestone tracking.
5. **Academic Degree & Course Catalog:** Filterable catalog of courses (B.Tech, MBBS, BCA, CA, BBA, B.Des, UPSC Track) with eligibility criteria, duration, entrance exams (JEE, NEET, CUET, CAT), and premier institutions.
6. **Career Assessment & AI Recommendation Engine:** 8-question cognitive aptitude quiz computing compatibility percentages across all 10 categories, complete with AI synthesis feedback and matched professions.
7. **24/7 AI Career Counselor:** Built-in floating chat widget that answers student questions regarding stream selection after 10th/12th, preparation strategies, and roadmaps.
8. **Side-by-Side Career Comparison:** Compare up to 3 professions across qualifications, salaries, outlook, and required skills.
9. **Admin Management Module:** Dedicated administrative portal with analytics, metrics, and full CRUD operations to add/edit/delete careers and courses.
10. **Neon Serverless PostgreSQL Database:** Connected to Neon PostgreSQL (`@neondatabase/serverless` & `pg`), automated schema migrations, and seeding with automatic fallback.

---

## 🚀 Getting Started

### 1. Environment Configuration
The database connection string is stored in `.env`:
```env
DATABASE_URL="postgresql://neondb_owner:YOUR_KEY@ep-cool-meadow-a1vamcck-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
PORT=5000
JWT_SECRET="career_guidance_jwt_secret_dr_college_2026"
```

### 2. Run the Full-Stack Application
To start both the Node.js Express backend (Port 5000) and the Vite frontend (Port 5173):
```bash
npm run dev
```

Or run them individually:
```bash
npm run server   # Starts Express API server on http://localhost:5000
npm run client   # Starts Vite React frontend on http://localhost:5173
```

---

## 🔑 Demo Academic Credentials

- **Admin Account:**
  - Email: `admin@career.edu`
  - Password: `admin123`
- **Student Account:**
  - Email: `student@career.edu`
  - Password: `student123`

*(You can also use the 1-Click Demo buttons on the sign-in modal or register a new student account!)*
