import React, { useState, useEffect } from 'react';
import { GitCompare, X, Plus, TrendingUp, IndianRupee, GraduationCap, Briefcase, Building, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function CareerComparePage({ comparisonCareers = [], onSelectCareer, onAddComparison, onRemoveComparison }) {
  const [allCareers, setAllCareers] = useState([]);
  const [selectedIds, setSelectedIds] = useState(
    comparisonCareers.length > 0 ? comparisonCareers.map(c => c.id) : [1, 2]
  );

  useEffect(() => {
    async function loadCareers() {
      try {
        const res = await api.getCareers();
        if (res.success) setAllCareers(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadCareers();
  }, []);

  const comparedCareers = selectedIds
    .map(id => allCareers.find(c => c.id === id))
    .filter(Boolean);

  function handleSelectChange(idx, newId) {
    const updated = [...selectedIds];
    updated[idx] = parseInt(newId, 10);
    setSelectedIds(updated);
  }

  function handleRemove(idToRemove) {
    if (selectedIds.length <= 1) return;
    setSelectedIds(prev => prev.filter(id => id !== idToRemove));
  }

  function handleAddSlot() {
    if (selectedIds.length >= 3) return;
    const available = allCareers.find(c => !selectedIds.includes(c.id));
    if (available) {
      setSelectedIds(prev => [...prev, available.id]);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1.5">
            <GitCompare className="w-4 h-4" /> Career Decision Tool
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Side-by-Side Career Comparison
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Compare educational requirements, salary projections, required skills, and recruiters across multiple professions.
          </p>
        </div>

        {selectedIds.length < 3 && (
          <button
            onClick={handleAddSlot}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Career to Compare</span>
          </button>
        )}
      </div>

      {/* Comparison Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedIds.map((careerId, idx) => {
          return (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Career Option {idx + 1}
                </span>
                {selectedIds.length > 2 && (
                  <button
                    onClick={() => handleRemove(careerId)}
                    className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-slate-50 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <select
                value={careerId}
                onChange={(e) => handleSelectChange(idx, e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {allCareers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.category_name})
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix Table */}
      {comparedCareers.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <tbody>
              {/* Header row with titles and photos */}
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <td className="p-4 w-44 font-bold text-xs uppercase text-slate-500">
                  Career Profile
                </td>
                {comparedCareers.map((c) => (
                  <td key={c.id} className="p-4 align-top">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'}
                        alt={c.title}
                        className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-2xs"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700">
                          {c.category_name}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">{c.title}</h4>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Starting Salary */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 font-bold text-xs text-slate-500">Starting Salary</td>
                {comparedCareers.map((c) => (
                  <td key={c.id} className="p-4 text-xs font-bold text-emerald-700">
                    {c.salary_entry || '₹4 - 8 LPA'}
                  </td>
                ))}
              </tr>

              {/* Senior Level Salary */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 font-bold text-xs text-slate-500">Senior Compensation</td>
                {comparedCareers.map((c) => (
                  <td key={c.id} className="p-4 text-xs font-bold text-purple-700">
                    {c.salary_senior || '₹25 - 50+ LPA'}
                  </td>
                ))}
              </tr>

              {/* Growth Outlook */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 font-bold text-xs text-slate-500">Job Outlook</td>
                {comparedCareers.map((c) => (
                  <td key={c.id} className="p-4 text-xs">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {c.growth_outlook || 'High'} Growth
                    </span>
                  </td>
                ))}
              </tr>

              {/* Educational Qualifications */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 font-bold text-xs text-slate-500">Eligibility / Education</td>
                {comparedCareers.map((c) => (
                  <td key={c.id} className="p-4 text-xs text-slate-700 leading-relaxed font-medium">
                    {c.educational_qualifications}
                  </td>
                ))}
              </tr>

              {/* Key Skills */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 font-bold text-xs text-slate-500">Essential Skills</td>
                {comparedCareers.map((c) => {
                  const skills = Array.isArray(c.required_skills)
                    ? c.required_skills
                    : typeof c.required_skills === 'string'
                    ? JSON.parse(c.required_skills || '[]')
                    : [];
                  return (
                    <td key={c.id} className="p-4 text-xs">
                      <div className="flex flex-wrap gap-1">
                        {skills.map((sk, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Work Environment */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 font-bold text-xs text-slate-500">Work Environment</td>
                {comparedCareers.map((c) => (
                  <td key={c.id} className="p-4 text-xs text-slate-700">
                    {c.work_environment || 'Office / Tech Campus'}
                  </td>
                ))}
              </tr>

              {/* Top Recruiters */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 font-bold text-xs text-slate-500">Top Recruiters</td>
                {comparedCareers.map((c) => {
                  const recs = Array.isArray(c.top_recruiters)
                    ? c.top_recruiters
                    : typeof c.top_recruiters === 'string'
                    ? JSON.parse(c.top_recruiters || '[]')
                    : [];
                  return (
                    <td key={c.id} className="p-4 text-xs text-slate-700">
                      {recs.join(', ')}
                    </td>
                  );
                })}
              </tr>

              {/* Action Buttons */}
              <tr className="bg-slate-50/70">
                <td className="p-4 font-bold text-xs text-slate-500">Full Pathway</td>
                {comparedCareers.map((c) => (
                  <td key={c.id} className="p-4">
                    <button
                      onClick={() => onSelectCareer(c)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Explore Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

