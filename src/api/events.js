import apiClient from "./apiClient";

export const fetchEvents = async () => {
    const res = await apiClient.get("/events");
    return res.data;
};

export const fetchEventById = async (id) => {
    const res = await apiClient.get(`/events/${id}`);
    return res.data;
};

export const createEvent = async (formData) => {
    const res = await apiClient.post("/events", formData);
    return res.data;
};

export const updateEvent = async ({ id, formData }) => {
    try {
        const res = await apiClient.post(`/events/${id}`, formData);
        return res.data;
    } catch (err) {
        const res = await apiClient.put(`/events/${id}`, formData);
        return res.data;
    }
};

export const deleteEvent = async (id) => {
    const res = await apiClient.delete(`/events/${id}`);
    return res.data;
};
