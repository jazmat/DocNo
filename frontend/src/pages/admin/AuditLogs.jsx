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

        setLogs(data || []);

    }

    const filteredLogs = logs.filter((log) => {

        return (
            log.document_number?.toLowerCase().includes(search.toLowerCase()) ||
            log.title?.toLowerCase().includes(search.toLowerCase())
        );

    });

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Audit Logs
            </h1>

            <input
                className="border p-2 rounded mb-4 w-full"
                placeholder="Search document number or title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="bg-white rounded shadow max-h-[600px] overflow-y-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-200 sticky top-0">

                        <tr>

                            <th className="p-2 text-left">
                                Time
                            </th>

                            <th className="p-2 text-left">
                                Document
                            </th>

                            <th className="p-2 text-left">
                                Title
                            </th>

                            <th className="p-2 text-left">
                                Department
                            </th>

                            <th className="p-2 text-left">
                                Category
                            </th>

                            <th className="p-2 text-left">
                                User
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredLogs.length === 0 && (

                            <tr>

                                <td colSpan="6" className="p-4 text-center">
                                    No audit records found
                                </td>

                            </tr>

                        )}

                        {filteredLogs.map((log) => (

                            <tr key={log.id} className="border-t">

                                <td className="p-2">
                                    {new Date(log.created_at).toLocaleString()}
                                </td>

                                <td className="p-2 font-mono">
                                    {log.document_number}
                                </td>

                                <td className="p-2">
                                    {log.title}
                                </td>

                                <td className="p-2">
                                    {log.department}
                                </td>

                                <td className="p-2">
                                    {log.category}
                                </td>

                                <td className="p-2">
                                    {log.user_name}
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