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
    const res = await apiClient.post("/entertainment", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const updateEntertainment = async ({ id, formData }) => {
    const res = await apiClient.put(`/entertainment/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const deleteEntertainment = async (id) => {
    const res = await apiClient.delete(`/entertainment/${id}`);
    return res.data;
};
