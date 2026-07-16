import api from "../api/axios";

const login = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

const signup = async (data) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
};

export default {
    signup,
    login
};