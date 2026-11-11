import React from 'react';
import { Compass, Database } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Project Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">Career Guidance</span>
                <span className="block text-xs text-blue-400 font-medium">Student Navigator</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A comprehensive career navigation platform designed to empower students with verified career paths, qualifications, skills, and AI-powered recommendations.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Powered by Neon Serverless PostgreSQL</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Explore Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="hover:text-blue-400 transition"
                >
                  Explore 10 Career Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="hover:text-blue-400 transition"
                >
                  Degrees & Course Directories
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('assessment')}
                  className="hover:text-blue-400 transition"
                >
                  AI Aptitude Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('compare')}
                  className="hover:text-blue-400 transition"
                >
                  Compare Career Options
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-blue-400 transition"
                >
                  Project Synopsis & Objectives
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Highlights */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Core Fields</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Information Technology',
                'Engineering',
                'Medical & Healthcare',
                'Civil Services / UPSC',
                'Finance & CA',
                'Business Management',
                'UI/UX & Design',
                'Science & Research'
              ].map((cat, i) => (
                <span
                  key={i}
                  onClick={() => setActiveTab('explore')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer transition"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 Career Guidance Application.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with React, Node.js & Neon PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

