import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const loadUsers = async () => {
        const res = await api.get("/admin/users");
        setUsers(res.data.users);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const toggleStatus = async (id) => {
        await api.patch(`/admin/users/${id}/status`);
        loadUsers();
    };

    const toggleAdmin = async (id) => {
        await api.patch(`/admin/users/${id}/admin`);
        loadUsers();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto bg-white shadow rounded p-6">

                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">User Management</h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </button>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b">

                                <td className="p-3">{u.full_name}</td>
                                <td className="p-3">{u.email}</td>

                                <td className="p-3">
                                    {u.super_admin
                                        ? "Super Admin"
                                        : u.role}
                                </td>

                                <td className="p-3">{u.status}</td>

                                <td className="p-3 space-x-2">

                                    <button
                                        onClick={() => toggleStatus(u.id)}
                                        className="bg-blue-600 text-white px-2 py-1 rounded"
                                    >
                                        Toggle Status
                                    </button>

                                    {/* SUPER ADMIN ONLY */}
                                    {user?.is_super_admin && !u.super_admin && (
                                        <button
                                            onClick={() => toggleAdmin(u.id)}
                                            className="bg-purple-600 text-white px-2 py-1 rounded"
                                        >
                                            Toggle Admin
                                        </button>
                                    )}

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminUsers;