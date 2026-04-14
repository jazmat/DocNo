import React, { useEffect, useState } from "react";
import api from "../services/api";

function DocumentStats() {

    const [stats, setStats] = useState({
        documents: 0,
        users: 0,
        pending: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {

        try {

            const res = await api.get("/admin/dashboard-stats");

            setStats(res.data || {
                documents: 0,
                users: 0,
                pending: 0
            });

        } catch (err) {

            console.error("Failed loading dashboard stats", err);

        }

    }

    return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* DOCUMENTS */}
<div className="col-span-3" align="center" style={{fontSize: "20px"}}> System Statistics</div>
            <div className="bg-white rounded-lg shadow border-l-4 border-blue-500 p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Total Nos Generated
                        </p>

                        <p className="text-3xl font-bold mt-1">
                            {stats.documents}
                        </p>
                    </div>

                    <div className="text-blue-500 text-3xl">
                        📄
                    </div>

                </div>

            </div>


            {/* USERS */}

            <div className="bg-white rounded-lg shadow border-l-4 border-green-500 p-6 hover:shadow-lg transition">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Active Users
                        </p>

                        <p className="text-3xl font-bold mt-1">
                            {stats.users}
                        </p>
                    </div>

                    <div className="text-green-500 text-3xl">
                        👥
                    </div>

                </div>

            </div>


            {/* PENDING */}

            <div className="bg-white rounded-lg shadow border-l-4 border-yellow-500 p-6 hover:shadow-lg transition">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Pending Approvals
                        </p>

                        <p className="text-3xl font-bold mt-1">
                            {stats.pending}
                        </p>
                    </div>

                    <div className="text-yellow-500 text-3xl">
                        ⏳
                    </div>

                </div>

            </div>

        </div>

    );

}

export default DocumentStats;