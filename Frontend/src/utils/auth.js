// src/utils/auth.js

export const saveAuthData = ({ token, name, user_id, role }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userName', name);
  localStorage.setItem('userId', user_id);
  localStorage.setItem('role', role);
};

export const clearAuthData = () => {
  localStorage.clear();
};

export const getAuthData = () => {
  return {
    token: localStorage.getItem('token'),
    name: localStorage.getItem('userName'),
    userId: localStorage.getItem('userId'),
    role: localStorage.getItem('role'),
  };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
