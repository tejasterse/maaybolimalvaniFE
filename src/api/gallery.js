import apiClient from "./apiClient.js";

export const fetchGallery = async () => {
    const res = await apiClient.get("/gallery");
    return res.data;
};

export const createGalleryItem = async (formData) => {
    const res = await apiClient.post("/gallery", formData);
    return res.data;
};

export const updateGalleryItem = async ({ id, formData }) => {
    try {
        const res = await apiClient.post(`/gallery/${id}`, formData);
        return res.data;
    } catch (err) {
        const res = await apiClient.put(`/gallery/${id}`, formData);
        return res.data;
    }
};

export const deleteGalleryItem = async (id) => {
    const res = await apiClient.delete(`/gallery/${id}`);
    return res.data;
};
