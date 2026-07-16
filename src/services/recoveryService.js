import api from "../api/axios";

const getRecoveryHistory = async () => {

    const response = await api.get("/recovery/me/history");

    return response.data;

};

const createRecovery = async (data) => {

    const response = await api.post("/recovery", data);

    return response.data;

};

const updateRecovery = async (id, data) => {

    const response = await api.put(`/recovery/${id}`, data);

    return response.data;

};

const deleteRecovery = async (id) => {

    const response = await api.delete(`/recovery/${id}`);

    return response.data;

};

const getMotherRecoveryHistory = async (motherId) => {

    const response = await api.get(

        `/recovery/mother/${motherId}`

    );

    return response.data;

};

export default {

    getRecoveryHistory,
    createRecovery,
    updateRecovery,
    deleteRecovery,
    getMotherRecoveryHistory

};