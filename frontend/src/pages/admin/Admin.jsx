// frontend/src/pages/admin/Admin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DocumentForm from "../../components/DocumentForm";

const Admin = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [successMessage, setSuccessMessage] = useState(null);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleDocumentSuccess = (data) => {
        setSuccessMessage(
            `Document ${data.document.documentNumber} created successfully!`
        );

        setTimeout(() => setSuccessMessage(null), 5000);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* ================= SIDEBAR ================= */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 text-xl font-bold border-b border-slate-700">
                    Admin Panel
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => navigate("/admin")}
                        className="w-full text-left px-4 py-2 rounded bg-slate-800 hover:bg-slate-700"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full text-left px-4 py-2 rounded hover:bg-slate-700"
                    >
                        User Dashboard
                    </button>
                </nav>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <div className="flex-1 flex flex-col">
                {/* HEADER */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Welcome, {user?.full_name}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </header>

                {/* CONTENT */}
                <main className="p-6">
                    {successMessage && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                            {successMessage}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* DOCUMENT GENERATOR */}
                        <div className="lg:col-span-2">
                            <DocumentForm onSuccess={handleDocumentSuccess} />
                        </div>

                        {/* ADMIN INFO PANEL */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Administrator Tools
                            </h2>

                            <div className="space-y-4 text-sm text-gray-700">
                                <p>
                                    Administrators can generate document numbers and
                                    manage system configuration.
                                </p>

                                <div className="border-t pt-4">
                                    <p className="text-gray-500">Account Type</p>
                                    <p className="font-semibold">
                                        {user?.is_admin ? "Administrator" : "User"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="font-semibold break-all">
                                        {user?.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Department</p>
                                    <p className="font-semibold">
                                        {user?.department || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;