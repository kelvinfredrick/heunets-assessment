const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

async function request(url, method, token, body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${url}`, options);
  if (res.status === 401) {
    localStorage.removeItem('teamboard_user');
    localStorage.removeItem('teamboard_token');
    window.location.href = '/login';
    throw new Error('Session expired');
  }
  if (res.status === 204) return null;
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
}

export const api = {
  // Projects
  getProjects: (token) => request('/projects', 'GET', token),
  getProject: (token, id) => request(`/projects/${id}`, 'GET', token),
  createProject: (token, data) => request('/projects', 'POST', token, data),
  updateProject: (token, id, data) => request(`/projects/${id}`, 'PUT', token, data),
  deleteProject: (token, id) => request(`/projects/${id}`, 'DELETE', token),

  // Tasks
  getTasks: (token, projectId) => request(`/tasks?projectId=${projectId}`, 'GET', token),
  getTask: (token, id) => request(`/tasks/${id}`, 'GET', token),
  createTask: (token, data) => request('/tasks', 'POST', token, data),
  updateTask: (token, id, data) => request(`/tasks/${id}`, 'PUT', token, data),
  deleteTask: (token, id) => request(`/tasks/${id}`, 'DELETE', token),
};
