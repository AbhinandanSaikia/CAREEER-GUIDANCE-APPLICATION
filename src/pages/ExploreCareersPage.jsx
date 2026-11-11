import React, { useState, useEffect } from 'react';
import { Search, Filter, Compass, RotateCcw, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import CareerCard from '../components/CareerCard';
import { api } from '../services/api';

export default function ExploreCareersPage({
  onSelectCareer,
  selectedCategory,
  setSelectedCategory,
  openAuthModal
}) {
  const [careers, setCareers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [growth, setGrowth] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await api.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadCategories();
  }, []);

  // Fetch careers whenever filters change
  useEffect(() => {
    async function fetchCareers() {
      setLoading(true);
      try {
        const res = await api.getCareers({
          category: selectedCategory || 'all',
          search: search || '',
          growth: growth !== 'all' ? growth : ''
        });
        if (res.success) {
          setCareers(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchCareers, 250);
    return () => clearTimeout(timer);
  }, [selectedCategory, search, growth]);

  function handleReset() {
    setSearch('');
    setSelectedCategory('all');
    setGrowth('all');
  }

  const activeCategoryObj = categories.find(c => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1.5">
          <Compass className="w-4 h-4" /> Career Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Professional Career Pathways
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Search across 10 specialized categories, examine qualification requirements, starting salaries, and detailed progression roadmaps.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, keyword, or skills (e.g. Python, AI, Surgery)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory || 'all'}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            >
              <option value="all">All 10 Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name} ({cat.career_count || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Growth Outlook */}
          <div className="md:col-span-2">
            <select
              value={growth}
              onChange={(e) => setGrowth(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            >
              <option value="all">All Growth</option>
              <option value="Very High">Very High Growth</option>
              <option value="High">High Growth</option>
            </select>
          </div>

          {/* Reset button */}
          <div className="md:col-span-1">
            <button
              onClick={handleReset}
              title="Reset all filters"
              className="w-full h-full py-2.5 flex items-center justify-center rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-500 text-xs font-semibold transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition cursor-pointer ${
              !selectedCategory || selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Fields
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Category Description Banner */}
      {activeCategoryObj && (
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-blue-950">{activeCategoryObj.name}</h3>
            <p className="text-xs text-blue-800 mt-0.5 leading-relaxed">
              {activeCategoryObj.description}
            </p>
          </div>
        </div>
      )}

      {/* Careers Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-800">{careers.length}</span> verified career paths
        </div>
      </div>

      {/* Careers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : careers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onSelect={onSelectCareer}
              openAuthModal={openAuthModal}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">No careers matched your search</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your keywords, selecting a different industry category, or resetting all filters.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

