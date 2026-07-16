import api from "../api/axios";

const createAppointment = async (data) => {

    const response = await api.post(

        "/appointments",

        data

    );

    return response.data;

};

const getMyAppointments = async () => {

    const response = await api.get(

        "/appointments/me"

    );

    return response.data;

};

const getTodayAppointments = async () => {

    const response = await api.get("/appointments/today");

    return response.data;

};

const confirmAppointment = async (id) => {

    const response = await api.patch(`/appointments/${id}/confirm`);

    return response.data;

};

const getDoctorAppointments = async () => {

    const response = await api.get("/appointments/doctor/me");

    return response.data;

};

const completeAppointment = async (id) => {

    const response = await api.patch(

        `/appointments/${id}/complete`

    );

    return response.data;

};

const markMissed = async (id) => {

    const response = await api.patch(

        `/appointments/${id}/missed`

    );

    return response.data;

};

const cancelAppointment = async (id) => {

    const response = await api.patch(

        `/appointments/${id}/cancel`

    );

    return response.data;

};

const getAppointment = async (id) => {

    const response = await api.get(`/appointments/${id}`);

    return response.data;

};

const updateAppointment = async (id, data) => {

    const response = await api.put(

        `/appointments/${id}`,

        data

    );

    return response.data;

};

const getMotherAppointments = async (motherId) => {

    const response = await api.get(

        `/appointments/mother/${motherId}`

    );

    return response.data;

};

const getNextAppointment = async () => {

    const response = await api.get(
        "/appointments/next"
    );

    return response.data;

};

const deleteAppointment = async (id) => {

    const response = await api.delete(

        `/appointments/${id}`

    );

    return response.data;

};

export default {

    createAppointment,

    getMyAppointments,

    getTodayAppointments,
    confirmAppointment,
    getDoctorAppointments,
    completeAppointment,
    markMissed,
    cancelAppointment,
    updateAppointment,
    getAppointment,
    getMotherAppointments,
    getNextAppointment,
    deleteAppointment

};