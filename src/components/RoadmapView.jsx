import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, Check, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function RoadmapView({ career, openAuthModal }) {
  const { user } = useAuth();
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loadingStep, setLoadingStep] = useState(null);

  const pathway = Array.isArray(career.career_pathway)
    ? career.career_pathway
    : typeof career.career_pathway === 'string'
    ? JSON.parse(career.career_pathway || '[]')
    : [];

  useEffect(() => {
    async function loadRoadmapProgress() {
      if (user) {
        try {
          const res = await api.getUserRoadmaps();
          if (res.success && res.data) {
            const found = res.data.find(r => r.career_id === career.id);
            if (found) {
              const steps = Array.isArray(found.completed_steps)
                ? found.completed_steps
                : typeof found.completed_steps === 'string'
                ? JSON.parse(found.completed_steps || '[]')
                : [];
              setCompletedSteps(steps);
            }
          }
        } catch {
          // ignore
        }
      }
    }
    loadRoadmapProgress();
  }, [career.id, user]);

  async function handleToggleStep(stepNum) {
    if (!user) {
      if (openAuthModal) openAuthModal('login');
      return;
    }

    const isCompleted = completedSteps.includes(stepNum);
    const newCompleted = !isCompleted;
    setLoadingStep(stepNum);

    try {
      const res = await api.updateRoadmapStep(career.id, stepNum, newCompleted);
      if (res.success) {
        setCompletedSteps(res.completedSteps || []);
      }
    } catch (err) {
      console.error('Failed to update step:', err);
    } finally {
      setLoadingStep(null);
    }
  }

  const progressPercent = pathway.length > 0
    ? Math.round((completedSteps.length / pathway.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Roadmap progress indicator */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Interactive Milestone Tracker
            </span>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full shadow-xs">
            {completedSteps.length} of {pathway.length} Completed ({progressPercent}%)
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-blue-200/60 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-500 mt-2">
          {user
            ? 'Check off milestones as you achieve your academic and skill goals.'
            : 'Sign in to save your personal checklist progress to your student profile!'}
        </p>
      </div>

      {/* Stepper Timeline */}
      <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {pathway.map((step, idx) => {
          const stepNum = step.step || idx + 1;
          const isDone = completedSteps.includes(stepNum);
          const isLoading = loadingStep === stepNum;

          return (
            <div key={idx} className="relative group">
              {/* Node indicator */}
              <button
                type="button"
                onClick={() => handleToggleStep(stepNum)}
                disabled={isLoading}
                title={isDone ? 'Mark as incomplete' : 'Mark milestone completed'}
                className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 cursor-pointer ${
                  isDone
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 shadow-md'
                    : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-blue-500 group-hover:text-blue-600 ring-4 ring-white'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
              </button>

              {/* Step Card */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  isDone
                    ? 'bg-emerald-50/40 border-emerald-200/80'
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{step.title}</span>
                    {isDone && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Achieved
                      </span>
                    )}
                  </div>

                  {step.duration && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {step.duration}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Step {stepNum} of {pathway.length}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleStep(stepNum)}
                    className={`text-xs font-semibold cursor-pointer transition ${
                      isDone ? 'text-slate-400 hover:text-slate-600' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    {isDone ? 'Undo milestone' : '✓ Mark completed'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

