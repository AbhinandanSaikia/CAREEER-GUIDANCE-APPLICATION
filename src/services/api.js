// Frontend API Service communicating with the Node.js / Neon PostgreSQL backend

const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('career_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // DB & Neon Status
  async getDbStatus() {
    const res = await fetch(`${API_BASE}/db/status`);
    return res.json();
  },

  async connectNeon(databaseUrl) {
    const res = await fetch(`${API_BASE}/db/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ databaseUrl })
    });
    return res.json();
  },

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Categories
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },

  async getCategory(slugOrId) {
    const res = await fetch(`${API_BASE}/categories/${slugOrId}`);
    return res.json();
  },

  // Careers
  async getCareers(params = {}) {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.growth) query.append('growth', params.growth);
    if (params.limit) query.append('limit', params.limit);

    const res = await fetch(`${API_BASE}/careers?${query.toString()}`);
    return res.json();
  },

  async getFeaturedCareers() {
    const res = await fetch(`${API_BASE}/careers/featured`);
    return res.json();
  },

  async getCareer(idOrSlug) {
    const res = await fetch(`${API_BASE}/careers/${idOrSlug}`);
    return res.json();
  },

  // Courses
  async getCourses(params = {}) {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.degree_type) query.append('degree_type', params.degree_type);

    const res = await fetch(`${API_BASE}/courses?${query.toString()}`);
    return res.json();
  },

  async getCourse(id) {
    const res = await fetch(`${API_BASE}/courses/${id}`);
    return res.json();
  },

  // Career Assessment & Recommendation
  async getAssessmentQuestions() {
    const res = await fetch(`${API_BASE}/assessment/questions`);
    return res.json();
  },

  async submitAssessment(data) {
    const res = await fetch(`${API_BASE}/assessment/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getAssessmentHistory() {
    const res = await fetch(`${API_BASE}/assessment/history`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // AI Counselor
  async askCounselor(message, history = []) {
    const res = await fetch(`${API_BASE}/ai/counselor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });
    return res.json();
  },

  // User Actions
  async getSavedCareers() {
    const res = await fetch(`${API_BASE}/user/saved`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async toggleSaveCareer(careerId, notes = '') {
    const res = await fetch(`${API_BASE}/user/save-career`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ careerId, notes })
    });
    return res.json();
  },

  async getUserRoadmaps() {
    const res = await fetch(`${API_BASE}/user/roadmaps`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async updateRoadmapStep(careerId, stepNumber, completed) {
    const res = await fetch(`${API_BASE}/user/roadmaps/step`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ careerId, stepNumber, completed })
    });
    return res.json();
  },

  // Admin
  async getAdminMetrics() {
    const res = await fetch(`${API_BASE}/admin/metrics`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async createCareer(data) {
    const res = await fetch(`${API_BASE}/admin/careers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateCareer(id, data) {
    const res = await fetch(`${API_BASE}/admin/careers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteCareer(id) {
    const res = await fetch(`${API_BASE}/admin/careers/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async createCourse(data) {
    const res = await fetch(`${API_BASE}/admin/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteCourse(id) {
    const res = await fetch(`${API_BASE}/admin/courses/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async getAdminUsers() {
    const res = await fetch(`${API_BASE}/admin/users`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async getAdminAssessments() {
    const res = await fetch(`${API_BASE}/admin/assessments`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  }
};

