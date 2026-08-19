import apiClient from "./apiClient";

export const fetchEntertainment = async () => {
    const res = await apiClient.get("/entertainment");
    return res.data;
};

export const fetchEntertainmentById = async (id) => {
    const res = await apiClient.get(`/entertainment/${id}`);
    return res.data;
};

export const createEntertainment = async (formData) => {
    const res = await apiClient.post("/entertainment", formData);
    return res.data;
};

export const updateEntertainment = async ({ id, formData }) => {
    try {
        const res = await apiClient.post(`/entertainment/${id}`, formData);
        return res.data;
    } catch (err) {
        const res = await apiClient.put(`/entertainment/${id}`, formData);
        return res.data;
    }
};

export const deleteEntertainment = async (id) => {
    const res = await apiClient.delete(`/entertainment/${id}`);
    return res.data;
};
