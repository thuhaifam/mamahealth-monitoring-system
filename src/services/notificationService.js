import api from "../api/axios";

const createNotification = async (data) => {

    const response = await api.post(

        "/notifications",

        data

    );

    return response.data;

};

const getMyNotifications = async () => {

    const response = await api.get(

        "/notifications/me"

    );

    return response.data;

};

const getUnreadNotifications = async () => {

    const response = await api.get(

        "/notifications/me/unread"

    );

    return response.data;

};

const markAsRead = async (id) => {

    const response = await api.patch(

        `/notifications/${id}/read`

    );

    return response.data;

};

const deleteNotification = async (id) => {

    const response = await api.delete(

        `/notifications/${id}`

    );

    return response.data;

};

const getRecentNotifications = async () => {

    const response = await api.get("/notifications/recent");

    return response.data;

};

const getMotherNotifications = async (motherId) => {

    const response = await api.get(

        `/notifications/mother/${motherId}`

    );

    return response.data;

};

const getDoctorNotifications = async () => {

    const response = await api.get(
        "/notifications/doctor/me"
    );

    return response.data;

};

export default {

    createNotification,

    getMyNotifications,

    getUnreadNotifications,

    markAsRead,

    deleteNotification,
    getRecentNotifications,
    getMotherNotifications,
    getDoctorNotifications

};