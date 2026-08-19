import apiClient from './apiClient.js';

export const fetchSettings = async () => {
  const { data } = await apiClient.get('/settings');
  return data;
};

export const updateSettings = async (settingsData) => {
  try {
    const { data } = await apiClient.post('/settings', settingsData);
    return data;
  } catch (err) {
    const { data } = await apiClient.put('/settings', settingsData);
    return data;
  }
};
