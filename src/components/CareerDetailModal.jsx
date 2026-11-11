import React, { useState } from 'react';
import {
  X,
  Bookmark,
  GraduationCap,
  Sparkles,
  TrendingUp,
  IndianRupee,
  Briefcase,
  Layers,
  Building,
  CheckCircle,
  ArrowRight,
  GitCompare,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RoadmapView from './RoadmapView';

export default function CareerDetailModal({ career, onClose, onSelectCareer, onCompare, openAuthModal }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'roadmap', 'skills', 'salary'
  const { savedCareerIds, toggleBookmark, user } = useAuth();

  if (!career) return null;

  const isSaved = savedCareerIds.has(career.id);

  const skills = Array.isArray(career.required_skills)
    ? career.required_skills
    : typeof career.required_skills === 'string'
    ? JSON.parse(career.required_skills || '[]')
    : [];

  const jobRoles = Array.isArray(career.job_roles)
    ? career.job_roles
    : typeof career.job_roles === 'string'
    ? JSON.parse(career.job_roles || '[]')
    : [];

  const topRecruiters = Array.isArray(career.top_recruiters)
    ? career.top_recruiters
    : typeof career.top_recruiters === 'string'
    ? JSON.parse(career.top_recruiters || '[]')
    : [];

  async function handleBookmark() {
    if (!user) {
      if (openAuthModal) openAuthModal('login');
      return;
    }
    await toggleBookmark(career.id);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header */}
        <div className="relative h-60 w-full overflow-hidden shrink-0 bg-slate-900">
          <img
            src={career.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}
            alt={career.title}
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Header text container */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600/90 text-white backdrop-blur-md">
                {career.category_name || 'Category'}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/90 text-white flex items-center gap-1 backdrop-blur-md">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{career.growth_outlook || 'High'} Growth Outlook</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {career.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl line-clamp-2">
              {career.short_desc}
            </p>
          </div>
        </div>

        {/* Tab Navigation & Action Bar */}
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview & Qualifications' },
              { id: 'roadmap', label: 'Career Roadmap' },
              { id: 'skills', label: 'Skills & Job Roles' },
              { id: 'salary', label: 'Salary & Recruiters' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {onCompare && (
              <button
                onClick={() => {
                  onCompare(career);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <GitCompare className="w-3.5 h-3.5 text-blue-600" />
                <span>Compare</span>
              </button>
            )}

            <button
              onClick={handleBookmark}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                isSaved
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
              <span>{isSaved ? 'Bookmarked' : 'Save Career'}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW & QUALIFICATIONS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Career In-Depth Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                  {career.full_desc || career.short_desc}
                </p>
              </div>

              {/* Educational Qualifications Box */}
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>Required Educational Qualifications</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {career.educational_qualifications}
                </p>
              </div>

              {/* Future Opportunities & Industry Trends */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Future Opportunities & Emerging Trends
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {career.future_opportunities || 'Growing market demand with strong long-term career stability.'}
                </p>
              </div>

              {/* Work Environment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs text-slate-600 font-medium">Work Environment</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">
                    {career.work_environment || 'Hybrid / Corporate Office'}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs text-slate-600 font-medium">Average Starting Salary</div>
                  <div className="text-sm font-bold text-emerald-700 mt-1">
                    {career.salary_entry || '₹4 - 8 LPA'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL ROADMAP */}
          {activeTab === 'roadmap' && (
            <div>
              <div className="mb-4">
                <h4 className="text-base font-bold text-slate-900">Step-by-Step Educational & Career Pathway</h4>
                <p className="text-xs text-slate-500">
                  Follow this verified sequential roadmap from school education through senior leadership.
                </p>
              </div>
              <RoadmapView career={career} openAuthModal={openAuthModal} />
            </div>
          )}

          {/* TAB 3: SKILLS & JOB ROLES */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Technical & Soft Skills */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Key Technical & Core Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/60 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Job Roles & Designations */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Typical Job Roles & Designations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {jobRoles.map((role, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2.5"
                    >
                      <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SALARY & RECRUITERS */}
          {activeTab === 'salary' && (
            <div className="space-y-6">
              {/* Salary Breakdown Cards */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Estimated Compensation Growth in India
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
                    <div className="text-xs font-semibold text-emerald-800">Entry Level (0 - 2 Yrs)</div>
                    <div className="text-lg font-extrabold text-emerald-900 mt-1">{career.salary_entry || '₹4 - 8 LPA'}</div>
                    <div className="text-[11px] text-emerald-700 mt-1">Associate / Junior Roles</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
                    <div className="text-xs font-semibold text-blue-800">Mid Level (3 - 6 Yrs)</div>
                    <div className="text-lg font-extrabold text-blue-900 mt-1">{career.salary_mid || '₹10 - 22 LPA'}</div>
                    <div className="text-[11px] text-blue-700 mt-1">Senior Practitioner / Specialist</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-center">
                    <div className="text-xs font-semibold text-purple-800">Senior Level (7+ Yrs)</div>
                    <div className="text-lg font-extrabold text-purple-900 mt-1">{career.salary_senior || '₹25 - 60+ LPA'}</div>
                    <div className="text-[11px] text-purple-700 mt-1">Lead / Manager / Director</div>
                  </div>
                </div>
              </div>

              {/* Top Recruiters */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Top Hiring Companies & Organizations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topRecruiters.map((rec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5"
                    >
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50/90 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Career Guidance Application
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

