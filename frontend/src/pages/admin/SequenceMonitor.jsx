import React, { useEffect, useState } from "react";

import adminService from "../../services/adminService";

function SequenceMonitor() {

    const [sequences, setSequences] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadSequences();

    }, []);

    async function loadSequences() {

        try {

            setLoading(true);

            const data = await adminService.getSequences();

            setSequences(data || []);

        } catch (err) {

            console.error("Sequence monitor error:", err);

        } finally {

            setLoading(false);

        }

    }

    async function repairSequence(seq) {

        try {

            await adminService.repairSequence({

                department_id: seq.department_id,
                category_id: seq.category_id,
                year: seq.year, 
                current_sequence: seq.current_sequence

            });

            loadSequences();

        } catch (err) {

            console.error("Sequence repair error:", err);

            alert("Failed to repair sequence");

        }

    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Sequence Integrity Monitor
            </h1>

            <div className="bg-white rounded shadow">

                <table className="w-full text-sm">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-2 text-left">
                                Department
                            </th>

                            <th className="p-2 text-left">
                                Category
                            </th>

                            <th className="p-2 text-left">
                                Year
                            </th>

                            <th className="p-2 text-left">
                                Current Sequence
                            </th>

                            <th className="p-2 text-left">
                                Highest Document
                            </th>

                            <th className="p-2 text-left">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading && (

                            <tr>

                                <td colSpan="6" className="p-4 text-center">
                                    Loading...
                                </td>

                            </tr>

                        )}

                        {!loading && sequences.length === 0 && (

                            <tr>

                                <td colSpan="6" className="p-4 text-center text-gray-500">
                                    No sequence data found
                                </td>

                            </tr>

                        )}

                        {sequences.map((s, index) => {

                            const drift =
                                s.current_sequence !==
                                s.highest_document_sequence;

                            return (

                                <tr key={index} className="border-t">

                                    <td className="p-2">
                                        {s.department_name}
                                    </td>

                                    <td className="p-2">
                                        {s.category_name}
                                    </td>

                                    <td className="p-2">
                                        {s.year}
                                    </td>

                                    <td className="p-2">
                                        {s.current_sequence}
                                    </td>

                                    <td className="p-2">
                                        {s.highest_document_sequence || 0}
                                    </td>

                                    <td className="p-2">

                                        {drift ? (

                                            <div className="flex gap-2">

                                                <span className="text-red-600 font-semibold">
                                                    Drift
                                                </span>

                                                <button
                                                    onClick={() => repairSequence(s)}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded"
                                                >
                                                    Repair
                                                </button>

                                            </div>

                                        ) : (

                                            <span className="text-green-600">
                                                OK
                                            </span>

                                        )}

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default SequenceMonitor;