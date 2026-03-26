// src/services/api.js
const BASE = process.env.REACT_APP_API_URL || 'https://my-to-do-list-nt06.onrender.com';

async function request(path, options = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Request failed');
    return json.data ?? json;
  } catch (err) {
    throw err;
  }
}

export const taskAPI = {
  getAll: (params = '') => request(`/api/tasks${params}`),
  getStats: () => request('/api/tasks/stats'),
  create: (data) => request('/api/tasks', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => request(`/api/tasks/${id}`, { method: 'DELETE' }),
};