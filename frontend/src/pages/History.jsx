// frontend/src/pages/History.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const History = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get("/documents/history");
                setDocuments(res.data.documents);
            } catch (err) {
                alert("Failed to load history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">

                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">Document History</h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3">Document No</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Department ID</th>
                                <th className="p-3">Category ID</th>
                                <th className="p-3">Created</th>
                            </tr>
                        </thead>

                        <tbody>
                            {documents.map((doc) => (
                                <tr key={doc.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold">
                                        {doc.document_number}
                                    </td>
                                    <td className="p-3">{doc.title}</td>
                                    <td className="p-3">{doc.department_id}</td>
                                    <td className="p-3">{doc.category_id}</td>
                                    <td className="p-3">
                                        {new Date(doc.created_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </div>
        </div>
    );
};

export default History;