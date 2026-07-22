import apiClient from './apiClient.js';

export const fetchPosts = async ({ page = 1, limit = 50, categoryId, admin } = {}) => {
  const params = { page, limit };
  if (categoryId) params.categoryId = categoryId;
  if (admin) params.admin = true;
  
  const { data } = await apiClient.get('/posts', { params });
  return data;
};

export const fetchPostById = async (id) => {
  const { data } = await apiClient.get(`/posts/${id}`);
  return data;
};

export const createPost = async (formData) => {
  const { data } = await apiClient.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export const updatePost = async ({ id, formData }) => {
  const { data } = await apiClient.put(`/posts/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export const deletePost = async (id) => {
  const { data } = await apiClient.delete(`/posts/${id}`);
  return data;
};

export const updatePostStatus = async (id, status) => {
  const { data } = await apiClient.put(`/posts/${id}/status`, { status });
  return data;
};
