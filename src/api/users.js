import apiClient from './apiClient.js';

export const fetchUsers = async (params = {}) => {
  const { data } = await apiClient.get('/users', { params });
  return data;
};

export const fetchUserById = async (id) => {
  const { data } = await apiClient.get(`/users/${id}`);
  return data;
};

export const createUser = async (userData) => {
  const { data } = await apiClient.post('/users', userData);
  return data;
};

export const updateUser = async (id, userData) => {
  const { data } = await apiClient.put(`/users/${id}`, userData);
  return data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await apiClient.put(`/users/${id}/role`, { role });
  return data;
};

export const updateUserStatus = async (id, status) => {
  const { data } = await apiClient.patch(`/users/${id}/status`, { status });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await apiClient.delete(`/users/${id}`);
  return data;
};
