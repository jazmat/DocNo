import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const History = () => {
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const res = await api.get("/documents/history");
                setDocuments(res.data.documents);
            } catch (err) {
                alert("Failed to load history");
                navigate("/dashboard");
            }
        };

        loadHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto bg-white shadow rounded p-6">

                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">Document History</h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </button>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Document No</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Department</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Created</th>
                        </tr>
                    </thead>

                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{doc.document_number}</td>
                                <td className="p-3">{doc.title}</td>
                                <td className="p-3">{doc.department}</td>
                                <td className="p-3">{doc.category}</td>
                                <td className="p-3">
                                    {new Date(doc.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default History;