import React, { useEffect, useState } from "react";
import api from "../services/api";

function RecentDocuments() {

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        loadDocuments();
    }, []);

    async function loadDocuments() {

        try {

            const res = await api.get("/documents/recent");

            setDocuments(res.data || []);

        } catch (err) {

            console.error("Failed loading recent documents", err);

        }

    }

    return (

        <div className="bg-white rounded-lg shadow p-6">

            <h2 className="text-lg font-semibold mb-4">
                Recent Documents
            </h2>

            <div className="space-y-4">

                {documents.length === 0 && (

                    <p className="text-gray-500 text-sm">
                        No recent documents
                    </p>

                )}

                {documents.map((doc) => (

                    <div
                        key={doc.id}
                        className="flex items-start gap-3 border-b pb-3"
                    >

                        <div className="text-xl">
                            📄
                        </div>

                        <div className="flex-1">

                            <p className="font-medium text-gray-800">
                                {doc.document_number}
                            </p>

                            <p className="text-sm text-gray-600">
                                {doc.title}
                            </p>

                            <p className="text-xs text-gray-400">
                                {new Date(doc.created_at).toLocaleDateString()}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default RecentDocuments;