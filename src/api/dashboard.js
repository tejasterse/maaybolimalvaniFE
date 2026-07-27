import apiClient from './apiClient.js';

export const fetchDashboardStats = async () => {
  const { data } = await apiClient.get('/dashboard/stats');
  return data;
};

export const fetchDashboardActivity = async () => {
  const { data } = await apiClient.get('/dashboard/activity');
  return data;
};
