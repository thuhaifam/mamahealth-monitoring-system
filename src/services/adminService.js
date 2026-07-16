import api from "../api/axios";

const getDashboard = async () => {

    const response = await api.get(
        "/admin/dashboard"
    );

    return response.data;

};

const getDoctors = async () => {

    const response = await api.get(
        "/admin/doctors"
    );

    return response.data;

};

const getDoctor = async (id) => {

    const response = await api.get(
        `/admin/doctors/${id}`
    );

    return response.data;

};

const updateDoctor = async (id, data) => {

    const response = await api.put(
        `/admin/doctors/${id}`,
        data
    );

    return response.data;

};

const deactivateDoctor = async (id) => {

    const response = await api.patch(
        `/admin/doctors/${id}/deactivate`
    );

    return response.data;

};

const deleteDoctor = async (id) => {

    const response = await api.delete(
        `/admin/doctors/${id}`
    );

    return response.data;

};

const getMothers = async () => {

    const response = await api.get(
        "/admin/mothers"
    );

    return response.data;

};

const getMother = async (id) => {

    const response = await api.get(
        `/admin/mothers/${id}`
    );

    return response.data;

};

const deactivateMother = async (id) => {

    const response = await api.patch(
        `/admin/mothers/${id}/deactivate`
    );

    return response.data;

};

const deleteMother = async (id) => {

    const response = await api.delete(
        `/admin/mothers/${id}`
    );

    return response.data;

};

const getReports = async () => {

    const response = await api.get(
        "/admin/reports"
    );

    return response.data;

};

const getActivities = async () => {

    const response = await api.get(
        "/admin/activities"
    );

    return response.data;

};

export default {

    getDashboard,
    getDoctors,
    getDoctor,
    updateDoctor,
    deactivateDoctor,
    deleteDoctor,
    getMothers,
    getMother,
    deactivateMother,
    deleteMother,
    getReports,
    getActivities
};