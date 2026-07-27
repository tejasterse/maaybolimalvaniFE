import apiClient from './apiClient';

export const fetchAds = async () => {
    const response = await apiClient.get('/banners');
    return response.data;
};

export const createAd = async (data) => {
    const response = await apiClient.post('/banners', data);
    return response.data;
};

export const deleteAd = async (id) => {
    const response = await apiClient.delete(`/banners/${id}`);
    return response.data;
};
