import api from "./api";

const adminService = {

    /* =========================
       DEPARTMENTS
    ========================= */

    getDepartments: async () => {

        const res = await api.get("/admin/departments");

        return res.data;

    },

    createDepartment: async (data) => {

        const res = await api.post("/admin/departments", data);

        return res.data;

    },

    updateDepartment: async (id, data) => {

        const res = await api.put(`/admin/departments/${id}`, data);

        return res.data;

    },


    /* =========================
       CATEGORIES
    ========================= */

    getCategories: async () => {

        const res = await api.get("/admin/categories");

        return res.data;

    },

    createCategory: async (data) => {

        const res = await api.post("/admin/categories", data);

        return res.data;

    },

    updateCategory: async (id, data) => {

        const res = await api.put(`/admin/categories/${id}`, data);

        return res.data;

    },


    /* =========================
       USER APPROVALS
    ========================= */

    getPendingUsers: async () => {

        const res = await api.get("/adminUsers/pending");

        return res.data;

    },

    approveUser: async (id) => {

        const res = await api.post(`/adminUsers/approve/${id}`);

        return res.data;

    },

    rejectUser: async (id) => {

        const res = await api.post(`/adminUsers/reject/${id}`);

        return res.data;

    },


    /* =========================
       AUDIT LOGS
    ========================= */

    getAuditLogs: async () => {

        const res = await api.get("/admin/audit");

        return res.data;

    },


    /* =========================
       SEQUENCE MONITOR
    ========================= */

    getSequences: async () => {

        const res = await api.get("/admin/sequences");

        return res.data;

    },

    repairSequence: async (data) => {

        const res = await api.post("/admin/sequences/repair", data);

        return res.data;

    }

};

export default adminService;