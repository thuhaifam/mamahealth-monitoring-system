import api from "../api/axios";

const getProfile = async () => {

    const response = await api.get("/mothers/me");

    return response.data;

};

const createProfile = async (data) => {

    const response = await api.post("/mothers", data);

    return response.data;

};

const updateProfile = async (data) => {

    const response = await api.put("/mothers/me", data);

    return response.data;

};

const deleteProfile = async () => {

    const response = await api.delete("/mothers/me");

    return response.data;

};

const getAllMothers = async () => {

    const response = await api.get("/mothers/all");

    return response.data;

};

const getMotherById = async (id) => {

    const response = await api.get(`/mothers/${id}`);

    return response.data;

};

export default {

    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    getAllMothers,
    getMotherById

};

