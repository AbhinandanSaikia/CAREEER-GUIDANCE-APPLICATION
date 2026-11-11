import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, KeyRound, X } from 'lucide-react';
import { api } from '../services/api';

export default function NeonBadge() {
  const [dbState, setDbState] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [neonUrl, setNeonUrl] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connectMessage, setConnectMessage] = useState(null);

  async function checkStatus() {
    try {
      const res = await api.getDbStatus();
      if (res.success) {
        setDbState(res.status);
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 20000);
    return () => clearInterval(interval);
  }, []);

  async function handleConnect(e) {
    e.preventDefault();
    if (!neonUrl.trim()) return;

    setConnecting(true);
    setConnectMessage(null);

    try {
      const res = await api.connectNeon(neonUrl);
      if (res.success) {
        setConnectMessage({ type: 'success', text: res.message });
        setDbState(res.status);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1800);
      } else {
        setConnectMessage({ type: 'error', text: res.message || 'Connection failed' });
      }
    } catch (err) {
      setConnectMessage({ type: 'error', text: err.message });
    } finally {
      setConnecting(false);
    }
  }

  const isConnected = dbState?.connected;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm border cursor-pointer ${
          isConnected
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
        }`}
        title="Click to view Neon Database status and settings"
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isConnected ? 'bg-emerald-400' : 'bg-amber-400'
            }`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isConnected ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          ></span>
        </span>
        <Database className="w-3.5 h-3.5" />
        <span className="font-semibold">Neon DB:</span>
        <span>{isConnected ? 'Connected' : 'Local Fallback'}</span>
      </button>

      {/* Modal for Neon DB Management */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-3 rounded-xl ${
                  isConnected ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}
              >
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Neon PostgreSQL Database</h3>
                <p className="text-xs text-slate-500">Serverless PostgreSQL configuration & live status</p>
              </div>
            </div>

            {/* Status Banner */}
            <div
              className={`p-4 rounded-xl border mb-5 ${
                isConnected
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-start gap-3">
                {isConnected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  <div className="font-semibold">
                    {isConnected
                      ? 'Live Neon PostgreSQL Database Connected!'
                      : 'Running in Local Storage Fallback Mode'}
                  </div>
                  <p className="text-xs mt-1 text-slate-600">
                    {isConnected
                      ? `Host: ${dbState?.host || 'ep-*.neon.tech'} | Database: ${dbState?.database || 'neondb'}`
                      : 'The app is fully functional using pre-seeded academic data. Paste your Neon connection string below to connect directly to your serverless Postgres instance!'}
                  </p>
                </div>
              </div>

              {isConnected && dbState?.tableCounts && (
                <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-emerald-200/60 text-center">
                  <div className="bg-white/70 p-1.5 rounded-lg">
                    <div className="text-xs text-slate-500">Careers</div>
                    <div className="text-sm font-bold text-emerald-700">{dbState.tableCounts.careers || 0}</div>
                  </div>
                  <div className="bg-white/70 p-1.5 rounded-lg">
                    <div className="text-xs text-slate-500">Categories</div>
                    <div className="text-sm font-bold text-emerald-700">{dbState.tableCounts.categories || 0}</div>
                  </div>
                  <div className="bg-white/70 p-1.5 rounded-lg">
                    <div className="text-xs text-slate-500">Courses</div>
                    <div className="text-sm font-bold text-emerald-700">{dbState.tableCounts.courses || 0}</div>
                  </div>
                  <div className="bg-white/70 p-1.5 rounded-lg">
                    <div className="text-xs text-slate-500">Users</div>
                    <div className="text-sm font-bold text-emerald-700">{dbState.tableCounts.users || 0}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Neon Connection String Input Form */}
            <form onSubmit={handleConnect} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Connect or Switch Neon Connection String
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={neonUrl}
                    onChange={(e) => setNeonUrl(e.target.value)}
                    placeholder="postgresql://neondb_owner:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  You can get your free connection string from{' '}
                  <a
                    href="https://neon.tech"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-0.5"
                  >
                    neon.tech <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              {connectMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    connectMessage.type === 'success'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {connectMessage.text}
                </div>
              )}

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={checkStatus}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh Status
                </button>
                <button
                  type="submit"
                  disabled={connecting || !neonUrl.trim()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
                >
                  {connecting ? 'Testing & Syncing...' : 'Connect to Neon'}
                </button>
              </div>
            </form>

            {/* Quick guide */}
            <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div className="font-semibold text-slate-700">How Neon Integration Works:</div>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Automated schema migration creates tables on connection.</li>
                <li>Initial data (10 categories, 20+ careers, courses) is auto-seeded.</li>
                <li>All user registrations, assessments, and bookmarks sync in real-time.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

