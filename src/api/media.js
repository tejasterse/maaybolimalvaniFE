import apiClient from './apiClient.js';

export const fetchMedia = async (params = {}) => {
  const { data } = await apiClient.get('/media', { params });
  return data;
};

export const uploadMediaFile = async (file, folder = 'General') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const { data } = await apiClient.post('/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export const deleteMediaItem = async (id) => {
  const { data } = await apiClient.delete(`/media/${id}`);
  return data;
};
