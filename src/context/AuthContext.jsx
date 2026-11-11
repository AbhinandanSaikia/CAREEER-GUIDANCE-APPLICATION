import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedCareerIds, setSavedCareerIds] = useState(new Set());

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('career_token');
      if (token) {
        try {
          const res = await api.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            await refreshSavedCareers();
          } else {
            localStorage.removeItem('career_token');
          }
        } catch (err) {
          console.error('Failed to restore session:', err);
          localStorage.removeItem('career_token');
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  async function refreshSavedCareers() {
    try {
      const res = await api.getSavedCareers();
      if (res.success && res.data) {
        const idSet = new Set(res.data.map(item => item.id || item.career_id));
        setSavedCareerIds(idSet);
      }
    } catch {
      // ignore
    }
  }

  async function login(email, password) {
    const res = await api.login(email, password);
    if (res.success && res.token) {
      localStorage.setItem('career_token', res.token);
      setUser(res.user);
      await refreshSavedCareers();
    }
    return res;
  }

  async function register(data) {
    const res = await api.register(data);
    if (res.success && res.token) {
      localStorage.setItem('career_token', res.token);
      setUser(res.user);
      await refreshSavedCareers();
    }
    return res;
  }

  function logout() {
    localStorage.removeItem('career_token');
    setUser(null);
    setSavedCareerIds(new Set());
  }

  async function toggleBookmark(careerId) {
    if (!user) {
      return { success: false, requireAuth: true };
    }
    try {
      const res = await api.toggleSaveCareer(careerId);
      if (res.success) {
        setSavedCareerIds(prev => {
          const next = new Set(prev);
          if (res.saved) {
            next.add(careerId);
          } else {
            next.delete(careerId);
          }
          return next;
        });
      }
      return res;
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async function updateProfile(data) {
    const res = await api.updateProfile(data);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        savedCareerIds,
        login,
        register,
        logout,
        toggleBookmark,
        updateProfile,
        refreshSavedCareers,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

