import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* SIDEBAR */}
            <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

                <nav className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/admin")}
                        className="text-left px-3 py-2 rounded hover:bg-gray-700"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/admin/users")}
                        className="text-left px-3 py-2 rounded hover:bg-gray-700"
                    >
                        Users
                    </button>

                    <button
                        onClick={() => navigate("/admin/settings")}
                        className="text-left px-3 py-2 rounded hover:bg-gray-700"
                    >
                        Settings
                    </button>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1">
                {/* TOP BAR */}
                <header className="bg-white shadow px-6 py-4 flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-600">
                            Welcome, {user?.full_name}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </header>

                {/* CONTENT AREA */}
                <main className="p-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            System Overview
                        </h2>

                        <p className="text-gray-700">
                            Administrator controls and analytics will appear here.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;