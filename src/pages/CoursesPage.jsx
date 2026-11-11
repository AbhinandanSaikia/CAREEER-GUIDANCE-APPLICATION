import React, { useState, useEffect } from 'react';
import { BookOpen, Search, GraduationCap, Clock, Award, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import CourseDetailModal from '../components/CourseDetailModal';

export default function CoursesPage({ setSelectedCategory, setActiveTab }) {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setFilterCategory] = useState('all');
  const [degreeType, setDegreeType] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [courseRes, catRes] = await Promise.all([
          api.getCourses(),
          api.getCategories()
        ]);
        if (courseRes.success) setCourses(courseRes.data);
        if (catRes.success) setCategories(catRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesCat =
      selectedCategory === 'all' ||
      c.category_name?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDegree =
      degreeType === 'all' ||
      c.degree_type?.toLowerCase() === degreeType.toLowerCase();

    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.eligibility.toLowerCase().includes(q);

    return matchesCat && matchesDegree && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" /> Degree & Academic Pathways
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Courses, Degrees & Professional Certifications
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Browse comprehensive academic pathways, eligibility criteria, mandatory entrance examinations, and premier institutions across India.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses (e.g. B.Tech, MBBS, BCA, CA, UPSC)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            >
              <option value="all">All Academic Domains</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={degreeType}
              onChange={(e) => setDegreeType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            >
              <option value="all">All Qualifications</option>
              <option value="Bachelor Degree">Bachelor Degrees</option>
              <option value="Professional Certification">Professional Certifications</option>
              <option value="Competitive Examination Track">Competitive Exam Tracks</option>
              <option value="Bachelor / Master Degree">Master Degrees</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-60 bg-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const exams = Array.isArray(course.entrance_exams)
              ? course.entrance_exams
              : typeof course.entrance_exams === 'string'
              ? JSON.parse(course.entrance_exams || '[]')
              : [];

            const colleges = Array.isArray(course.top_colleges)
              ? course.top_colleges
              : typeof course.top_colleges === 'string'
              ? JSON.parse(course.top_colleges || '[]')
              : [];

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80">
                      {course.degree_type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Eligibility snippet */}
                  <div className="mt-4 p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-900 text-xs">
                    <span className="font-bold">Eligibility: </span>
                    <span>{course.eligibility}</span>
                  </div>

                  {/* Entrance exam chips */}
                  {exams.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 mr-1">Exams:</span>
                      {exams.slice(0, 3).map((ex, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-700"
                        >
                          {ex}
                        </span>
                      ))}
                      {exams.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          +{exams.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">
                    Category: <span className="text-slate-700">{course.category_name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">No courses match your criteria</h3>
          <p className="text-xs text-slate-500">
            Try resetting your search query or choosing another academic domain.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setFilterCategory('all');
              setDegreeType('all');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onExploreCategory={(cat) => {
            if (setSelectedCategory) setSelectedCategory(cat);
            if (setActiveTab) setActiveTab('explore');
            setSelectedCourse(null);
          }}
        />
      )}
    </div>
  );
}

