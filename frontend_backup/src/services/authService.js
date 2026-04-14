import api from "./api";

const authService = {

    /*
    =========================
    REGISTER USER
    =========================
    */

    register: async (data) => {

        const res = await api.post("/auth/register", data);

        return res.data;

    },


    /*
    =========================
    LOGIN USER
    =========================
    */

    login: async (email, password) => {

        const res = await api.post("/auth/login", {
            email,
            password
        });

        const { token, user } = res.data;

        if (token) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(user));

        }

        return res.data;

    },


    /*
    =========================
    LOGOUT USER
    =========================
    */

    logout: () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

    },


    /*
    =========================
    GET CURRENT USER
    =========================
    */

    getCurrentUser: () => {

        const user = localStorage.getItem("user");

        if (!user) return null;

        return JSON.parse(user);

    },


    /*
    =========================
    GET TOKEN
    =========================
    */

    getToken: () => {

        return localStorage.getItem("token");

    }

};

export default authService;