import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Cpu,
  Activity,
  Building2,
  Briefcase,
  Landmark,
  Palette,
  Radio,
  FlaskConical,
  Code2,
  CheckCircle,
  Database
} from 'lucide-react';
import CareerCard from '../components/CareerCard';
import { api } from '../services/api';

const categoryIcons = {
  'Information Technology': Code2,
  'Engineering': Cpu,
  'Medical and Healthcare': Activity,
  'Government Services': Building2,
  'Business and Management': Briefcase,
  'Finance and Banking': Landmark,
  'Education and Teaching': GraduationCap,
  'Design and Creative Fields': Palette,
  'Media and Communication': Radio,
  'Science and Research': FlaskConical
};

export default function HomePage({ setActiveTab, onSelectCareer, setSelectedCategory, openAuthModal }) {
  const [categories, setCategories] = useState([]);
  const [featuredCareers, setFeaturedCareers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, carRes] = await Promise.all([
          api.getCategories(),
          api.getFeaturedCareers()
        ]);
        if (catRes.success) setCategories(catRes.data);
        if (carRes.success) setFeaturedCareers(carRes.data);
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('explore');
    }
  }

  function handleCategoryClick(cat) {
    if (setSelectedCategory) setSelectedCategory(cat.slug);
    setActiveTab('explore');
  }

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Academic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold mb-6 shadow-2xs">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Career Guidance Platform • Academic Project 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Chart Your Future with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              AI-Powered Career Guidance
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-5 leading-relaxed">
            Eliminate career uncertainty. Explore 10 distinct professional domains, detailed educational roadmaps, entrance exams, and tailored recommendations.
          </p>

          {/* Quick Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 max-w-2xl mx-auto flex items-center bg-white p-2 rounded-2xl shadow-xl border border-slate-200/90 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
          >
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers (e.g. Software Engineer, Doctor, UPSC, CA, UI Designer)..."
              className="flex-1 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Take Free AI Career Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-sm border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Explore All 10 Categories</span>
            </button>
          </div>

          {/* Key Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 pt-10 border-t border-slate-200/70 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">10 Categories</div>
                <div className="text-xs text-slate-500">Curated from synopsis</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">AI Guidance</div>
                <div className="text-xs text-slate-500">Personalized match score</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Neon Database</div>
                <div className="text-xs text-slate-500">Serverless PostgreSQL</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Step Roadmaps</div>
                <div className="text-xs text-slate-500">Interactive milestone tracking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Synopsis Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Career Domains
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Careers by Industry Categories
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2 md:mt-0 cursor-pointer"
          >
            <span>View All Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.name] || Compass;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-600">
                    {cat.career_count || 2} Career Paths
                  </span>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured High Growth Careers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> In-Demand Paths
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured High-Growth Careers for 2026
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2 md:mt-0 cursor-pointer"
          >
            <span>Explore All Careers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCareers.slice(0, 6).map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onSelect={onSelectCareer}
              openAuthModal={openAuthModal}
            />
          ))}
        </div>
      </section>

      {/* Interactive AI Assessment Promotion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI-Powered Questionnaire
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Unsure which path fits your personality?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Complete our 8-question cognitive aptitude assessment. Our AI engine computes your affinity scores across all 10 career categories and maps out the exact degrees and entry pathways.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('assessment')}
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-blue-900 font-bold text-sm shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Start Free Assessment (3 Mins)</span>
                <ArrowRight className="w-4 h-4 text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

