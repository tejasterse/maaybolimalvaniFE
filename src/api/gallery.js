import apiClient from "./apiClient.js";

export const fetchGallery = async () => {
    const res = await apiClient.get("/gallery");
    return res.data;
};

export const createGalleryItem = async (formData) => {
    const res = await apiClient.post("/gallery", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const updateGalleryItem = async ({ id, formData }) => {
    const res = await apiClient.put(`/gallery/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const deleteGalleryItem = async (id) => {
    const res = await apiClient.delete(`/gallery/${id}`);
    return res.data;
};
