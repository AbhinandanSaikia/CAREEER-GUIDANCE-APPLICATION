import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Award,
  Compass,
  BookOpen,
  Share2,
  Bot
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CareerCard from '../components/CareerCard';

export default function AssessmentPage({ onSelectCareer, setActiveTab, openAuthModal }) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // [{ questionId, optionIndex }]
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await api.getAssessmentQuestions();
        if (res.success && res.questions) {
          setQuestions(res.questions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  function handleSelectOption(optionIndex) {
    const q = questions[currentIndex];
    const newAnswers = [...answers];
    const existing = newAnswers.findIndex(a => a.questionId === q.id);

    if (existing >= 0) {
      newAnswers[existing].optionIndex = optionIndex;
    } else {
      newAnswers.push({ questionId: q.id, optionIndex });
    }

    setAnswers(newAnswers);

    // Auto proceed to next question after small delay
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
    }
  }

  async function handleSubmit() {
    if (answers.length < questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitAssessment({
        answers,
        userId: user?.id || null,
        userName: user?.name || 'Student Guest',
        userEmail: user?.email || 'guest@career.local'
      });

      if (res.success && res.result) {
        setResult(res.result);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    } catch (err) {
      alert('Error calculating assessment: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetake() {
    setAnswers([]);
    setCurrentIndex(0);
    setResult(null);
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <Sparkles className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
        <h3 className="font-bold text-slate-800">Loading Career Aptitude Assessment...</h3>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQ?.id);
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // RESULT VIEW
  if (result) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Result Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>AI Assessment Analysis Completed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Your Personalized Career Fit Profile
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Calculated using multi-trait cognitive evaluation across all 10 academic and professional categories.
          </p>
        </div>

        {/* AI Synthesis Summary Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Bot className="w-4 h-4 text-amber-300" /> AI Career Synthesis Report
          </div>
          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
            {result.ai_feedback}
          </p>
        </div>

        {/* Top Matching Categories Breakdown */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Career Domain Compatibility Scores</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Percentage match based on your answers to problem-solving, work environments, and motivations.
            </p>
          </div>

          <div className="space-y-3.5">
            {Object.entries(result.scores || {})
              .sort((a, b) => b[1] - a[1])
              .map(([catName, score], idx) => {
                const isTop = idx < 2;
                return (
                  <div key={catName} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className={isTop ? 'text-blue-700 font-bold' : 'text-slate-700'}>
                        {catName} {isTop && '⭐ Top Fit'}
                      </span>
                      <span className={isTop ? 'text-blue-700 font-bold' : 'text-slate-500'}>
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isTop
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                            : 'bg-slate-300'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Recommended Careers Grid */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Top Recommended Career Pathways</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hand-picked careers strongly matching your primary affinity traits. Click any to view full pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.recommended_careers?.map((career) => (
              <CareerCard
                key={career.id}
                career={career}
                onSelect={onSelectCareer}
                openAuthModal={openAuthModal}
              />
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <button
            onClick={handleRetake}
            className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-md"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore All Careers</span>
          </button>
        </div>
      </div>
    );
  }

  // QUESTIONNAIRE VIEW
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Quiz Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Cognitive Career Profiling Test</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Career Assessment Questionnaire
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Answer {questions.length} questions honestly. Our algorithm will match your intrinsic strengths against verified career trajectories.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-600">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-blue-600 font-bold">{progressPercent}% Completed</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Active Question Card */}
      {currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {currentQ.category || 'Career Evaluation'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = currentAnswer?.optionIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-medium shadow-xs'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-xs sm:text-sm leading-relaxed">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                disabled={currentAnswer === undefined}
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={answers.length < questions.length || submitting}
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{submitting ? 'Analyzing Fit...' : 'Generate My AI Career Report'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

