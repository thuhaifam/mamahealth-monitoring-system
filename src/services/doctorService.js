import api from "../api/axios";

const createProfile = async (data) => {

    const response = await api.post(

        "/doctors",

        data

    );

    return response.data;

};

const getProfile = async () => {

    const response = await api.get(

        "/doctors/me"

    );

    return response.data;

};

const getDashboard = async () => {

    const response = await api.get(

        "/doctors/dashboard"

    );

    return response.data;

};

const deleteProfile = async () => {

    const response = await api.delete(

        "/doctors/me"

    );

    return response.data;

};

const updateProfile = async (data) => {

    const response = await api.put(

        "/doctors/me",

        data

    );

    return response.data;

};

const deactivateProfile = async () => {

    const response = await api.delete(

        "/doctors/me"

    );

    return response.data;

};

const getRecentRecoveries = async () => {

    const response = await api.get(
        "/recovery/recent"
    );

    return response.data;

};


export default {

    createProfile,

    getProfile,

    getDashboard,

    deleteProfile,
    updateProfile,
    
    deactivateProfile,
    getRecentRecoveries

};