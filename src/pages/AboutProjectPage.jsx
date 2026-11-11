import React from 'react';
import { GraduationCap, Award, BookOpen, Database, CheckCircle2, Cpu, Server, Code } from 'lucide-react';

export default function AboutProjectPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title Card / Front Page of Synopsis */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
          <GraduationCap className="w-9 h-9" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest font-extrabold text-blue-600">
            Project Synopsis
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            CAREER GUIDANCE APPLICATION
          </h1>
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-2">
            Academic Year 2026
          </p>
        </div>

        {/* Candidate & Supervisor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-6 border-t border-slate-100 text-left">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Submitted By
            </div>
            <div className="text-base font-extrabold text-slate-900 mt-1">Diapanita Paul</div>
            <div className="text-xs text-slate-600 mt-0.5">Enrolment No: 2433154715</div>
            <div className="text-xs text-slate-600">Roll No: 14</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Under The Guidance Of
            </div>
            <div className="text-base font-extrabold text-slate-900 mt-1">Mrs Emi Kalita</div>
            <div className="text-xs text-slate-600 mt-0.5">Assistant Professor</div>
            <div className="text-xs text-slate-600">Department of Computer Science</div>
          </div>
        </div>
      </div>

      {/* Introduction & Problem Statement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Introduction</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Career Guidance Website is a web-based platform designed to help students explore different career opportunities and make better decisions about their future. Choosing a suitable career can be difficult for students because there are many career options, courses, qualifications, skills, and job opportunities available.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            The application provides career-related information in an organized and easy-to-understand manner. Users can explore different career fields, view the educational qualifications required, understand the skills needed, and learn about possible career paths.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>Problem Statement</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Choosing a career is an important decision for students, but many students face difficulties because they do not have sufficient information about available career options. Students may be confused about which course to choose, what qualifications are required, which skills they need to develop, and what career opportunities are available after completing their education.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Searching through multiple sources takes time and makes it difficult to compare different options. Although professional counselling is useful, it may not always be easily accessible to every student.
          </p>
        </div>
      </div>

      {/* Objectives from Synopsis */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Project Objectives</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Develop a web-based platform that provides career guidance to students.',
            'Provide information about different career options, qualifications, and required skills.',
            'AI-based personalized career recommendations and match scoring.',
            'Help students explore careers according to their interests and preferences.',
            'Structured roadmaps detailing step-by-step progression from high school to senior leadership.',
            'Interactive comparison matrix between multiple career pathways.'
          ].map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-700 leading-relaxed font-medium">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies & Neon Database */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Technology Architecture</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <Code className="w-6 h-6 text-blue-600 mb-2" />
            <div className="font-bold text-sm text-slate-900">Frontend</div>
            <div className="text-xs text-slate-600 mt-1">
              HTML5, Modern CSS, JavaScript, React 19, Tailwind CSS v4, Lucide Icons.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <Server className="w-6 h-6 text-indigo-600 mb-2" />
            <div className="font-bold text-sm text-slate-900">Backend API</div>
            <div className="text-xs text-slate-600 mt-1">
              Node.js, Express, RESTful endpoints, JWT Authentication, bcrypt password hashing.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <Database className="w-6 h-6 text-emerald-600 mb-2" />
            <div className="font-bold text-sm text-slate-900">Neon Database</div>
            <div className="text-xs text-slate-600 mt-1">
              Neon Serverless PostgreSQL, automatic migrations, connection pooling, SSL encryption.
            </div>
          </div>
        </div>
      </div>

      {/* 10 Synopsis Categories Defined */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-xl font-bold text-slate-900">10 Specified Career Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {[
            '1. Information Technology',
            '2. Engineering',
            '3. Medical and Healthcare',
            '4. Government Services',
            '5. Business and Management',
            '6. Finance and Banking',
            '7. Education and Teaching',
            '8. Design and Creative Fields',
            '9. Media and Communication',
            '10. Science and Research'
          ].map((cat, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-100 font-bold text-slate-800 text-center">
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

