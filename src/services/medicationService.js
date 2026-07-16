import api from "../api/axios";

const createMedication = async (data) => {

    const response = await api.post(

        "/medications",

        data

    );

    return response.data;

};

const getMyMedications = async () => {

    const response = await api.get(

        "/medications/me"

    );

    return response.data;

};

const markCompleted = async (id) => {

    const response = await api.patch(

        `/medications/${id}/complete`

    );

    return response.data;

};

const getRecentCompletedMedications = async () => {

    const response = await api.get("/medications/recent-completed");

    return response.data;

};

const getMotherMedications = async (motherId) => {

    const response = await api.get(

        `/medications/mother/${motherId}`

    );

    return response.data;

};

const getDoctorMedications = async () => {

    const response = await api.get(

        "/medications/doctor/me"

    );

    return response.data;

};

const getMedication = async (id) => {

    const response = await api.get(

        `/medications/${id}`

    );

    return response.data;

};

const updateMedication = async (id, data) => {

    const response = await api.put(

        `/medications/${id}`,

        data

    );

    return response.data;

};

const deleteMedication = async (id) => {

    const response = await api.delete(

        `/medications/${id}`

    );

    return response.data;

};

export default {

    createMedication,

    getMyMedications,

    markCompleted,

    getRecentCompletedMedications,
    getMotherMedications,
    getDoctorMedications,
    getMedication,
    updateMedication,
    deleteMedication
};