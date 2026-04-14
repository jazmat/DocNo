import React, { useEffect, useState } from "react";

import adminService from "../../services/adminService";

function AuditLogs() {

    const [logs, setLogs] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadLogs();

    }, []);

    async function loadLogs() {

        const data = await adminService.getAuditLogs();
        //console.log("AUDIT LOGS API RESPONSE:", data); // 👈 ADD THIS

        setLogs(data || []);    }

    const filteredLogs = !search
        ? logs
        : logs.filter((log) => {
            const s = search.toLowerCase();

            return (
                (log.action || "").toLowerCase().includes(s) ||
                (log.message || "").toLowerCase().includes(s) ||
                (log.user_name || "").toLowerCase().includes(s)
            );
        });

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Audit Logs
            </h1>

            <input
                className="border p-2 rounded mb-4 w-full"
                placeholder="Search action or document number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="bg-white rounded shadow max-h-[600px] overflow-y-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-200 sticky top-0">
                        <tr>
                            <th className="p-2 text-left">Time</th>
                            <th className="p-2 text-left">Action</th>
                            <th className="p-2 text-left">Document</th>
                            <th className="p-2 text-left">Title</th>
                            <th className="p-2 text-left">Department</th>
                            <th className="p-2 text-left">Category</th>
                            <th className="p-2 text-left">User</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredLogs.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-4 text-center">
                                    No audit records found
                                </td>
                            </tr>
                        )}

                        {filteredLogs.map((log) => (

                            <tr key={log.id} className="border-t">

                                {/* Time */}
                                <td className="p-2">
                                    {log.created_at
                                        ? new Date(log.created_at).toLocaleString()
                                        : "—"}
                                </td>

                                {/* Action */}
                                <td className="p-2 font-mono">
                                    {log.action || "—"}
                                </td>

                                {/* Document Number (from details) */}
                                <td className="p-2 font-mono">
                                    {log.details || "—"}
                                </td>

                                {/* Title (future JOIN) */}
                                <td className="p-2 text-gray-400">
                                    {log.title || "—"}
                                </td>

                                {/* Department (future JOIN) */}
                                <td className="p-2 text-gray-400">
                                    {log.department || "—"}
                                </td>

                                {/* Category (future JOIN) */}
                                <td className="p-2 text-gray-400">
                                    {log.category || "—"}
                                </td>

                                {/* User */}
                                <td className="p-2">
                                    {log.full_name || log.user_id || "—"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );

}

export default AuditLogs;