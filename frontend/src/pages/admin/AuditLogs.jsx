import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");
    const [action, setAction] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const limit = 20;

    const fetchLogs = async () => {
        try {
            const res = await api.get("/admin/audit", {
                params: {
                    page,
                    limit,
                    search,
                    action,
                    ...(startDate && { startDate }),
                    ...(endDate && { endDate }),
                },
            });

            const responseData = res.data;

            if (Array.isArray(responseData)) {
                setLogs(responseData);
            } else if (Array.isArray(responseData.data)) {
                setLogs(responseData.data);
            } else {
                setLogs([]);
            }

        } catch (err) {
            console.error("Error fetching logs", err);
            setLogs([]);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [page, search, action, startDate, endDate]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>

            {/* Filters */}
            <div className="flex gap-2 mb-4">
                <input
                    placeholder="Search document or action..."
                    className="border p-2 flex-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border p-2"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="LOGIN">Login</option>
                    <option value="LOGOUT">Logout</option>
                    <option value="GENERATE_DOCUMENT">Generate Document</option>
                </select>
            </div>

            {/* Date Filters */}
            <div className="flex gap-2 mb-4">
                <input
                    type="date"
                    className="border p-2"
                    value={startDate}
                    onChange={(e) => {
                        setPage(1); // reset pagination
                        setStartDate(e.target.value);
                    }}
                />

                <input
                    type="date"
                    className="border p-2"
                    value={endDate}
                    onChange={(e) => {
                        setPage(1); // reset pagination
                        setEndDate(e.target.value);
                    }}
                />

                <button
                    className="border px-3"
                    onClick={() => {
                        setStartDate("");
                        setEndDate("");
                        setPage(1);
                    }}
                >
                    Clear
                </button>
            </div>

            {/* TABLE */}
            <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Time</th>
                        <th className="border p-2 text-left">Action</th>
                        <th className="border p-2 text-left">Document</th>
                        <th className="border p-2 text-left">User</th>
                    </tr>
                </thead>

                <tbody>
                    {logs.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">
                                No logs found
                            </td>
                        </tr>
                    ) : (
                        logs.map((log) => (
                            <tr key={log.id}>
                                <td className="border p-2">
                                    {new Date(log.created_at).toLocaleDateString("en-GB", {
                                        timeZone: "UTC",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    }
                                </td>

                                <td className="border p-2">
                                    {log.action?.replaceAll("_", " ")}
                                </td>

                                <td className="border p-2">
                                    {log.details || (
                                        <span className="text-gray-400 italic">N/A</span>
                                    )}
                                </td>

                                <td className="border p-2">
                                    {log.full_name}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                    Prev
                </button>

                <span>Page {page}</span>

                <button onClick={() => setPage((p) => p + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}