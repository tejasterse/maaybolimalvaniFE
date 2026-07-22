import apiClient from './apiClient.js';

export const fetchDistricts = async () => {
  const { data } = await apiClient.get('/districts');
  return data;
};

export const createDistrict = async (districtData) => {
  const { data } = await apiClient.post('/districts', districtData);
  return data;
};

export const updateDistrict = async ({ id, ...districtData }) => {
  const { data } = await apiClient.put(`/districts/${id}`, districtData);
  return data;
};

export const deleteDistrict = async (id) => {
  const { data } = await apiClient.delete(`/districts/${id}`);
  return data;
};
