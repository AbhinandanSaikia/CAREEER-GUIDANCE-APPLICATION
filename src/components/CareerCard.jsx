import React from 'react';
import { Bookmark, TrendingUp, IndianRupee, ArrowRight, Briefcase, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CareerCard({ career, onSelect, openAuthModal }) {
  const { savedCareerIds, toggleBookmark, user } = useAuth();
  const isSaved = savedCareerIds.has(career.id);

  async function handleBookmarkClick(e) {
    e.stopPropagation();
    if (!user) {
      if (openAuthModal) openAuthModal('login');
      return;
    }
    await toggleBookmark(career.id);
  }

  // Parse JSON fields if they come as string from DB
  const skills = Array.isArray(career.required_skills)
    ? career.required_skills
    : typeof career.required_skills === 'string'
    ? JSON.parse(career.required_skills || '[]')
    : [];

  return (
    <div
      onClick={() => onSelect(career)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 relative"
    >
      {/* Thumbnail with overlay gradient */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={career.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'}
          alt={career.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/95 text-slate-800 backdrop-blur-md shadow-xs">
          {career.category_name || 'Career Field'}
        </span>

        {/* Bookmark button */}
        <button
          onClick={handleBookmarkClick}
          title={isSaved ? 'Remove from bookmarks' : 'Save career to profile'}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-slate-700'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Match score if present */}
        {career.matchScore && (
          <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3" />
            <span>{career.matchScore}% Match</span>
          </div>
        )}

        {/* Growth tag */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[11px] font-medium flex items-center gap-1 backdrop-blur-sm">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span>{career.growth_outlook || 'High'} Growth</span>
        </div>
      </div>

      {/* Body content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {career.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {career.short_desc}
          </p>

          {/* Key Skill Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                +{skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bottom Salary & Action */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-600">Starting Salary</div>
            <div className="text-xs font-bold text-slate-800 flex items-center">
              <span>{career.salary_entry || '₹4 - 8 LPA'}</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

