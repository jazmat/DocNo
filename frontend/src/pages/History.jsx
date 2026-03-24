import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function History() {

    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    const loadHistory = async () => {
        try {

            const res = await api.get("/documents/history");

            setDocuments(Array.isArray(res.data) ? res.data : []);

        } catch (err) {

            console.error("History load error:", err);

        }
    };

    const copyDocNumber = (docNo) => {

        navigator.clipboard.writeText(docNo);

        alert("Document number copied");

    };

    useEffect(() => {
        loadHistory();
    }, []);

    return (

        <div className="space-y-6">
            {/* <button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                Back
            </button> */}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Document History
                </h2>
            </div>
            
            <div className="border rounded shadow">

                <div className="max-h-61 overflow-y-auto">

                    <table className="w-full text-sm">

                        <thead className="bg-gray-200 sticky top-0">

                            <tr>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Document Number</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {documents.length === 0 && (

                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        No documents generated yet
                                    </td>
                                </tr>

                            )}

                            {documents.map((doc, index) => (

                                <tr
                                    key={doc.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-white hover:bg-gray-100"
                                            : "bg-gray-50 hover:bg-gray-100"
                                    }
                                >

                                    <td className="p-3">
                                        {new Date(doc.created_at).toLocaleString()}
                                    </td>

                                    <td className="p-3">
                                        {doc.title}
                                    </td>

                                    <td className="p-3 font-mono">
                                        {doc.document_number}
                                    </td>

                                    <td className="p-3 text-center">

                                        <button
                                            onClick={() => copyDocNumber(doc.document_number)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Copy
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default History;