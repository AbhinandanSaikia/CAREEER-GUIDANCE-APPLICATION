import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Database,
  Briefcase,
  BookOpen,
  Users,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard({ onSelectCareer, openAuthModal }) {
  const { user, isAdmin } = useAuth();
  const [activeAdminTab, setActiveAdminTab] = useState('metrics'); // 'metrics', 'careers', 'courses', 'users'
  const [metrics, setMetrics] = useState(null);
  const [dbState, setDbState] = useState(null);
  const [careers, setCareers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Career Form State
  const [isAddCareerOpen, setIsAddCareerOpen] = useState(false);
  const [careerTitle, setCareerTitle] = useState('');
  const [careerCatId, setCareerCatId] = useState('1');
  const [careerShortDesc, setCareerShortDesc] = useState('');
  const [careerFullDesc, setCareerFullDesc] = useState('');
  const [careerEdu, setCareerEdu] = useState('');
  const [careerSkills, setCareerSkills] = useState('');
  const [careerSalaryEntry, setCareerSalaryEntry] = useState('₹4.5 - 8 LPA');
  const [careerSalarySenior, setCareerSalarySenior] = useState('₹20 - 45+ LPA');
  const [careerGrowth, setCareerGrowth] = useState('High');
  const [careerRecruiters, setCareerRecruiters] = useState('');

  // New Course Form State
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDegreeType, setCourseDegreeType] = useState('Bachelor Degree');
  const [courseDuration, setCourseDuration] = useState('3-4 Years');
  const [courseEligibility, setCourseEligibility] = useState('');
  const [courseCategoryName, setCourseCategoryName] = useState('Information Technology');
  const [courseExams, setCourseExams] = useState('');

  const [actionMsg, setActionMsg] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  async function loadAdminData() {
    setLoading(true);
    try {
      const [metRes, carRes, couRes, catRes, usrRes] = await Promise.all([
        api.getAdminMetrics(),
        api.getCareers({ limit: 100 }),
        api.getCourses(),
        api.getCategories(),
        api.getAdminUsers()
      ]);

      if (metRes.success) {
        setMetrics(metRes.metrics);
        setDbState(metRes.dbState);
      }
      if (carRes.success) setCareers(carRes.data);
      if (couRes.success) setCourses(couRes.data);
      if (catRes.success) setCategories(catRes.data);
      if (usrRes.success) setUsersList(usrRes.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCareer(e) {
    e.preventDefault();
    setActionMsg(null);
    try {
      const skillsArray = careerSkills.split(',').map(s => s.trim()).filter(Boolean);
      const recsArray = careerRecruiters.split(',').map(s => s.trim()).filter(Boolean);

      const res = await api.createCareer({
        title: careerTitle,
        category_id: careerCatId,
        short_desc: careerShortDesc,
        full_desc: careerFullDesc || careerShortDesc,
        educational_qualifications: careerEdu,
        required_skills: skillsArray,
        job_roles: [careerTitle, 'Specialist', 'Lead'],
        career_pathway: [
          { step: 1, title: 'Foundational Education', desc: careerEdu, duration: '1-2 Yrs' },
          { step: 2, title: 'Skill Acquisition & Certifications', desc: 'Master: ' + skillsArray.join(', '), duration: '1 Yr' },
          { step: 3, title: 'Industry Entry Role', desc: 'Secure associate or entry position.', duration: 'Entry' },
          { step: 4, title: 'Senior Practice', desc: 'Lead projects and advance into management.', duration: '5+ Yrs' }
        ],
        future_opportunities: 'High market demand in expanding industry.',
        salary_entry: careerSalaryEntry,
        salary_senior: careerSalarySenior,
        growth_outlook: careerGrowth,
        work_environment: 'Corporate / Hybrid',
        top_recruiters: recsArray,
        image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
      });

      if (res.success) {
        setActionMsg({ type: 'success', text: 'New career published successfully!' });
        setIsAddCareerOpen(false);
        // Reset form
        setCareerTitle('');
        setCareerShortDesc('');
        setCareerEdu('');
        setCareerSkills('');
        setCareerRecruiters('');
        loadAdminData();
      } else {
        setActionMsg({ type: 'error', text: res.message || 'Creation failed' });
      }
    } catch (err) {
      setActionMsg({ type: 'error', text: err.message });
    }
  }

  async function handleDeleteCareer(id) {
    if (!window.confirm('Are you sure you want to remove this career?')) return;
    try {
      const res = await api.deleteCareer(id);
      if (res.success) {
        setActionMsg({ type: 'success', text: 'Career deleted successfully.' });
        loadAdminData();
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleCreateCourse(e) {
    e.preventDefault();
    setActionMsg(null);
    try {
      const examsArray = courseExams.split(',').map(s => s.trim()).filter(Boolean);
      const res = await api.createCourse({
        title: courseTitle,
        degree_type: courseDegreeType,
        duration: courseDuration,
        eligibility: courseEligibility,
        entrance_exams: examsArray,
        category_name: courseCategoryName,
        top_colleges: ['Premier & Autonomous Colleges', 'Central Universities'],
        description: `Comprehensive academic program in ${courseTitle} preparing students for professional careers.`
      });

      if (res.success) {
        setActionMsg({ type: 'success', text: 'New course added successfully!' });
        setIsAddCourseOpen(false);
        setCourseTitle('');
        setCourseEligibility('');
        setCourseExams('');
        loadAdminData();
      }
    } catch (err) {
      setActionMsg({ type: 'error', text: err.message });
    }
  }

  async function handleDeleteCourse(id) {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await api.deleteCourse(id);
      if (res.success) {
        setActionMsg({ type: 'success', text: 'Course deleted.' });
        loadAdminData();
      }
    } catch (err) {
      alert(err.message);
    }
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-purple-600 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900">Administrator Access Required</h2>
        <p className="text-xs text-slate-500">
          This portal allows academic faculty and administrators to manage careers, courses, categories, and view registered students.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition"
        >
          Sign In as Admin
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" /> Academic Administration
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Administrator & Content Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage database records, careers, courses, and student profiles.
          </p>
        </div>

        <button
          onClick={loadAdminData}
          className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition self-start cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Records</span>
        </button>
      </div>

      {actionMsg && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
            actionMsg.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {actionMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{actionMsg.text}</span>
        </div>
      )}

      {/* Admin Nav Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-bold">
        {[
          { id: 'metrics', label: 'System Overview & DB Status', icon: Database },
          { id: 'careers', label: `Manage Careers (${careers.length})`, icon: Briefcase },
          { id: 'courses', label: `Manage Courses (${courses.length})`, icon: BookOpen },
          { id: 'users', label: `Registered Students (${usersList.length})`, icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition ${
                isActive
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: METRICS & DATABASE STATUS */}
      {activeAdminTab === 'metrics' && (
        <div className="space-y-6">
          {/* Neon Database Status Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${dbState?.connected ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Neon PostgreSQL Serverless Database</h3>
                  <p className="text-xs text-slate-500">Real-time connection telemetry and schema status</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${dbState?.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {dbState?.connected ? '🟢 Neon Connected' : '🟡 In-Memory Fallback'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold">Provider / Host</span>
                <span className="font-bold text-slate-800 truncate block mt-0.5">
                  {dbState?.host || 'Local Storage Fallback'}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold">Database Name</span>
                <span className="font-bold text-slate-800 block mt-0.5">
                  {dbState?.database || 'neondb'}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold">SSL Status</span>
                <span className="font-bold text-emerald-700 block mt-0.5">
                  SSL Active (Required for Neon)
                </span>
              </div>
            </div>
          </div>

          {/* Metrics 4-Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Careers</div>
              <div className="text-3xl font-extrabold text-blue-600 mt-2">{metrics?.careers || careers.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Across 10 Categories</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Courses & Degrees</div>
              <div className="text-3xl font-extrabold text-indigo-600 mt-2">{metrics?.courses || courses.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Degrees & Certifications</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Registered Students</div>
              <div className="text-3xl font-extrabold text-emerald-600 mt-2">{metrics?.users || usersList.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Student accounts created</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Assessments Done</div>
              <div className="text-3xl font-extrabold text-purple-600 mt-2">{metrics?.assessments || 0}</div>
              <div className="text-[11px] text-slate-500 mt-1">AI aptitude evaluations</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE CAREERS */}
      {activeAdminTab === 'careers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Career Information Management</h3>
              <p className="text-xs text-slate-500">Add, review, or delete career profiles.</p>
            </div>
            <button
              onClick={() => setIsAddCareerOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Career</span>
            </button>
          </div>

          {/* Careers Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-slate-500">
                <tr>
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Starting Salary</th>
                  <th className="p-3.5">Growth</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {careers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-400">#{c.id}</td>
                    <td className="p-3.5 font-bold text-slate-900">{c.title}</td>
                    <td className="p-3.5 text-slate-600">{c.category_name}</td>
                    <td className="p-3.5 font-semibold text-emerald-700">{c.salary_entry}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        {c.growth_outlook}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => onSelectCareer(c)}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleDeleteCareer(c.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE COURSES */}
      {activeAdminTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Course & Degree Management</h3>
              <p className="text-xs text-slate-500">Manage academic courses and admission criteria.</p>
            </div>
            <button
              onClick={() => setIsAddCourseOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-slate-500">
                <tr>
                  <th className="p-3.5">Course Title</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Eligibility</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((cr) => (
                  <tr key={cr.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">{cr.title}</td>
                    <td className="p-3.5 text-slate-600">{cr.degree_type}</td>
                    <td className="p-3.5 text-slate-600">{cr.duration}</td>
                    <td className="p-3.5 text-slate-600 max-w-xs truncate">{cr.eligibility}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteCourse(cr.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: REGISTERED USERS */}
      {activeAdminTab === 'users' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Registered Students & Accounts</h3>
            <p className="text-xs text-slate-500">View registered users and their education stage.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-slate-500">
                <tr>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Education Stage</th>
                  <th className="p-3.5">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">{u.name}</td>
                    <td className="p-3.5 text-slate-600">{u.email}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{u.education_level || 'Undergraduate'}</td>
                    <td className="p-3.5 text-slate-400">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Career Modal */}
      {isAddCareerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsAddCareerOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Add New Career Entry</h3>
            <p className="text-xs text-slate-500 mb-5">Publish a new career pathway to the catalog.</p>

            <form onSubmit={handleCreateCareer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Career Title</label>
                  <input
                    type="text"
                    required
                    value={careerTitle}
                    onChange={(e) => setCareerTitle(e.target.value)}
                    placeholder="e.g. Cloud Security Architect"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={careerCatId}
                    onChange={(e) => setCareerCatId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={careerShortDesc}
                  onChange={(e) => setCareerShortDesc(e.target.value)}
                  placeholder="One sentence summary of the profession"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Required Educational Qualifications</label>
                <textarea
                  required
                  rows="2"
                  value={careerEdu}
                  onChange={(e) => setCareerEdu(e.target.value)}
                  placeholder="10+2 stream, bachelor degree, entrance exams"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={careerSkills}
                  onChange={(e) => setCareerSkills(e.target.value)}
                  placeholder="Python, Linux, Security Protocols, Problem Solving"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Starting Salary</label>
                  <input
                    type="text"
                    value={careerSalaryEntry}
                    onChange={(e) => setCareerSalaryEntry(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Senior Salary</label>
                  <input
                    type="text"
                    value={careerSalarySenior}
                    onChange={(e) => setCareerSalarySenior(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Growth Outlook</label>
                  <select
                    value={careerGrowth}
                    onChange={(e) => setCareerGrowth(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Very High">Very High</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Top Recruiters (comma separated)</label>
                <input
                  type="text"
                  value={careerRecruiters}
                  onChange={(e) => setCareerRecruiters(e.target.value)}
                  placeholder="Amazon, Infosys, Google, TCS"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddCareerOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                >
                  Publish Career
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsAddCourseOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Add New Course / Degree</h3>
            <p className="text-xs text-slate-500 mb-5">Publish course eligibility and requirements.</p>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. Master of Computer Applications (MCA)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree Type</label>
                  <select
                    value={courseDegreeType}
                    onChange={(e) => setCourseDegreeType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Bachelor Degree">Bachelor Degree</option>
                    <option value="Master Degree">Master Degree</option>
                    <option value="Professional Certification">Professional Certification</option>
                    <option value="Competitive Examination Track">Competitive Exam Track</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <textarea
                  required
                  rows="2"
                  value={courseEligibility}
                  onChange={(e) => setCourseEligibility(e.target.value)}
                  placeholder="10+2 marks, graduation degree, mathematics requirement"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Entrance Exams (comma separated)</label>
                <input
                  type="text"
                  value={courseExams}
                  onChange={(e) => setCourseExams(e.target.value)}
                  placeholder="NIMCET, CUET-PG, State CET"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddCourseOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

