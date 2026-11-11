import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Bookmark,
  Sparkles,
  Clock,
  ArrowRight,
  Edit3,
  CheckCircle2,
  Trash2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import CareerCard from '../components/CareerCard';

export default function ProfilePage({ onSelectCareer, setActiveTab, openAuthModal }) {
  const { user, updateProfile } = useAuth();
  const [savedCareers, setSavedCareers] = useState([]);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [userRoadmaps, setUserRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEdu, setEditEdu] = useState('');
  const [editStream, setEditStream] = useState('');
  const [editBio, setEditBio] = useState('');
  const [updateMsg, setUpdateMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEdu(user.education_level || 'Undergraduate');
      setEditStream(user.stream_interest || 'Information Technology');
      setEditBio(user.bio || '');

      loadUserData();
    }
  }, [user]);

  async function loadUserData() {
    setLoading(true);
    try {
      const [savedRes, histRes, roadRes] = await Promise.all([
        api.getSavedCareers(),
        api.getAssessmentHistory(),
        api.getUserRoadmaps()
      ]);

      if (savedRes.success) setSavedCareers(savedRes.data);
      if (histRes.success) setAssessmentHistory(histRes.data);
      if (roadRes.success) setUserRoadmaps(roadRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileSave(e) {
    e.preventDefault();
    setUpdateMsg(null);
    try {
      const res = await updateProfile({
        name: editName,
        education_level: editEdu,
        stream_interest: editStream,
        bio: editBio
      });
      if (res.success) {
        setUpdateMsg({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setIsEditing(false), 1200);
      } else {
        setUpdateMsg({ type: 'error', text: res.message || 'Update failed' });
      }
    } catch (err) {
      setUpdateMsg({ type: 'error', text: err.message });
    }
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
          <User className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Student Profile Sign In</h2>
        <p className="text-xs text-slate-500">
          Sign in or create an account to view your saved career paths, milestone progress, and assessment history.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-500">{user.email}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
              <span className="bg-slate-100 px-2.5 py-0.5 rounded-md font-medium">
                🎓 {user.education_level || 'Undergraduate'}
              </span>
              <span className="bg-slate-100 px-2.5 py-0.5 rounded-md font-medium">
                🎯 {user.stream_interest || 'General'}
              </span>
            </div>
            {user.bio && (
              <p className="text-xs text-slate-600 pt-1 italic">{user.bio}</p>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition self-start md:self-center"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Edit Form Modal/Drawer */}
      {isEditing && (
        <form onSubmit={handleProfileSave} className="bg-blue-50/70 p-6 rounded-3xl border border-blue-200 space-y-4 animate-in fade-in duration-200">
          <h3 className="font-bold text-sm text-blue-950">Update Student Information</h3>

          {updateMsg && (
            <div className={`p-3 rounded-xl text-xs font-semibold ${updateMsg.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
              {updateMsg.text}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Education Stage</label>
              <select
                value={editEdu}
                onChange={(e) => setEditEdu(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
              >
                <option value="Class 10th">Class 10th</option>
                <option value="Class 11th - 12th">Class 11th - 12th</option>
                <option value="Undergraduate">Undergraduate (BCA / B.Tech / B.Sc)</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Stream / Field of Interest</label>
              <input
                type="text"
                value={editStream}
                onChange={(e) => setEditStream(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bio / Aspirations</label>
              <input
                type="text"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Aspiring Software Engineer / Civil Servant..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* Bookmarked Careers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-600 fill-blue-600" />
              <span>Saved Career Pathways ({savedCareers.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Careers you have bookmarked for future review and roadmap tracking.
            </p>
          </div>
          {savedCareers.length > 0 && (
            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Browse more
            </button>
          )}
        </div>

        {savedCareers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCareers.map((c) => (
              <CareerCard
                key={c.id || c.career_id}
                career={c}
                onSelect={onSelectCareer}
                openAuthModal={openAuthModal}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
            <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">No saved careers yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore the career catalog and click the bookmark icon to save professions you are interested in pursuing!
            </p>
            <button
              onClick={() => setActiveTab('explore')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
            >
              Explore Careers
            </button>
          </div>
        )}
      </div>

      {/* Assessment History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Assessment History & Results</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Past career aptitude evaluations and AI feedback generated for your profile.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('assessment')}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Take Test Again
          </button>
        </div>

        {assessmentHistory.length > 0 ? (
          <div className="space-y-4">
            {assessmentHistory.map((report) => {
              const topCats = Array.isArray(report.top_categories)
                ? report.top_categories
                : typeof report.top_categories === 'string'
                ? JSON.parse(report.top_categories || '[]')
                : [];

              return (
                <div key={report.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="font-bold text-sm text-slate-900">Career Aptitude Report</span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(report.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                    {report.ai_feedback}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-slate-400 mr-1">Top Affinities:</span>
                    {topCats.map((tc, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60"
                      >
                        {tc.name}: {tc.score}%
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">No assessments taken yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Take our 8-question AI career evaluation to discover your top matches and save your results.
            </p>
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
            >
              Take Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

