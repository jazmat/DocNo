// frontend/src/pages/Admin.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header (same as Dashboard) */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">DocNo Admin</h1>
                        <p className="text-gray-600">
                            Welcome Administrator, {user?.full_name}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            User Dashboard
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Users */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-bold text-lg mb-2">Users</h3>
                        <p className="text-gray-600 text-sm">
                            Manage system users.
                        </p>
                    </div>

                    {/* Departments */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-bold text-lg mb-2">Departments</h3>
                        <p className="text-gray-600 text-sm">
                            Configure departments.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-bold text-lg mb-2">Categories</h3>
                        <p className="text-gray-600 text-sm">
                            Manage document categories.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;