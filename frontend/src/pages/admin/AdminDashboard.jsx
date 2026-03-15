import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:7050";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        documents: 0,
        pendingUsers: 0,
        departments: 0,
        categories: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(`${API_BASE}/api/adminUsers/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStats(res.data);

        } catch (error) {

            console.error("Failed to load admin statistics", error);

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (
            <div className="text-gray-600 text-lg">
                Loading admin statistics...
            </div>
        );
    }


    return (

        <div className="space-y-6">

            {/* BACK BUTTON */}

{/*            <div>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
                >
                    ← Back to Dashboard
                </button>
            </div>
*/}

            {/* PAGE TITLE */}

            <h2 className="text-2xl font-bold text-gray-800">
                System Overview
            </h2>


            {/* STATISTICS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <StatCard
                    title="Total Documents"
                    value={stats.documents}
                    color="bg-blue-500"
                />

                <StatCard
                    title="Pending Users"
                    value={stats.pendingUsers}
                    color="bg-yellow-500"
                />

                <StatCard
                    title="Departments"
                    value={stats.departments}
                    color="bg-green-500"
                />

                <StatCard
                    title="Categories"
                    value={stats.categories}
                    color="bg-purple-500"
                />

            </div>


            {/* ADMIN ACTIONS */}

            <div className="bg-white rounded-lg shadow p-6">

                <h3 className="text-xl font-semibold mb-4">
                    Administrator Actions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    <ActionCard
                        title="Manage Departments"
                        description="Configure department prefixes and numbering"
                        onClick={() => navigate("/admin/departments")}
                    />

                    <ActionCard
                        title="Manage Categories"
                        description="Configure document categories"
                        onClick={() => navigate("/admin/categories")}
                    />

                    <ActionCard
                        title="User Approvals"
                        description="Review pending user registrations"
                        onClick={() => navigate("/admin/users")}
                    />

                    <ActionCard
                        title="Audit Logs"
                        description="View system activity history"
                        onClick={() => navigate("/admin/audit")}
                    />

                    <ActionCard
                        title="Sequence Monitor"
                        description="Check document numbering integrity"
                        onClick={() => navigate("/admin/sequences")}
                    />

                </div>

            </div>

        </div>

    );
};


/* ================= STAT CARD ================= */

const StatCard = ({ title, value, color }) => {

    return (

        <div className="bg-white shadow rounded-lg p-6 flex items-center">

            <div className={`w-12 h-12 rounded-lg ${color} mr-4`} />

            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>

        </div>

    );
};


/* ================= ACTION CARD ================= */

const ActionCard = ({ title, description, onClick }) => {

    return (

        <div
            onClick={onClick}
            className="p-4 bg-slate-100 hover:bg-slate-200 rounded text-left cursor-pointer transition"
        >
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-600">
                {description}
            </p>
        </div>

    );
};


export default AdminDashboard;