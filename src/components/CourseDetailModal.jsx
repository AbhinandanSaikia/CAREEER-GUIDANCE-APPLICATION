import React from 'react';
import { X, GraduationCap, Clock, CheckCircle2, Award, Building2, BookOpen } from 'lucide-react';

export default function CourseDetailModal({ course, onClose, onExploreCategory }) {
  if (!course) return null;

  const entranceExams = Array.isArray(course.entrance_exams)
    ? course.entrance_exams
    : typeof course.entrance_exams === 'string'
    ? JSON.parse(course.entrance_exams || '[]')
    : [];

  const topColleges = Array.isArray(course.top_colleges)
    ? course.top_colleges
    : typeof course.top_colleges === 'string'
    ? JSON.parse(course.top_colleges || '[]')
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5 mb-4 pr-8">
          <div className="p-3 rounded-2xl bg-blue-100 text-blue-600 shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
              {course.degree_type}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{course.title}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
              </span>
              <span>•</span>
              <span className="font-medium text-slate-600">{course.category_name}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t border-slate-100 text-sm">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Course Curriculum & Scope
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
              {course.description}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900">
            <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600" /> Eligibility Criteria
            </div>
            <p className="text-xs leading-relaxed font-medium">{course.eligibility}</p>
          </div>

          {/* Entrance Exams */}
          {entranceExams.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Mandatory / Major Entrance Examinations
              </h4>
              <div className="flex flex-wrap gap-2">
                {entranceExams.map((exam, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Top Colleges & Universities */}
          {topColleges.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Premier Colleges & Institutes in India
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topColleges.map((col, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 flex items-center gap-2 shadow-2xs"
                  >
                    <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{col}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

