import apiClient from './apiClient.js';

export const fetchPosts = async ({ page = 1, limit = 50, categoryId, districtId, admin, search } = {}) => {
  const params = { page, limit };
  if (categoryId) params.category_id = categoryId;
  if (districtId) params.district_id = districtId;
  if (admin) params.admin = true;
  if (search) params.search = search;
  
  const { data } = await apiClient.get('/posts', { params });
  return data;
};

export const fetchPostById = async (id) => {
  const { data } = await apiClient.get(`/posts/${id}`);
  return data;
};

export const createPost = async (formData) => {
  const { data } = await apiClient.post('/posts', formData);
  return data;
};

export const updatePost = async ({ id, formData }) => {
  try {
    const { data } = await apiClient.put(`/posts/${id}`, formData);
    return data;
  } catch (err) {
    if (err.response?.status === 503 || err.response?.status === 405 || !err.response) {
      const { data } = await apiClient.post(`/posts/${id}`, formData);
      return data;
    }
    throw err;
  }
};

export const deletePost = async (id) => {
  const { data } = await apiClient.delete(`/posts/${id}`);
  return data;
};

export const updatePostStatus = async (id, status) => {
  try {
    const { data } = await apiClient.put(`/posts/${id}/status`, { status });
    return data;
  } catch (err) {
    if (err.response?.status === 503 || err.response?.status === 405 || !err.response) {
      const { data } = await apiClient.post(`/posts/${id}/status`, { status });
      return data;
    }
    throw err;
  }
};
