import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    /* ================= LOAD ================= */

    const loadDepartments = async () => {
        const res = await api.get("/admin/departments");
        setDepartments(res.data);
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    /* ================= CREATE ================= */

    const addDepartment = async () => {
        if (!name.trim()) return;

        await api.post("/admin/departments", { name });
        setName("");
        loadDepartments();
    };

    /* ================= STATUS ================= */

    const toggleStatus = async (id) => {
        await api.patch(`/admin/departments/${id}/status`);
        loadDepartments();
    };

    /* ================= UPDATE ================= */

    const editDepartment = async (dept) => {
        const newName = prompt("Rename department:", dept.name);
        if (!newName) return;

        await api.put(`/admin/departments/${dept.id}`, {
            name: newName,
        });

        loadDepartments();
    };

    /* ================= DELETE ================= */

    const deleteDepartment = async (id) => {
        if (!window.confirm("Delete department?")) return;

        try {
            await api.delete(`/admin/departments/${id}`);
            loadDepartments();
        } catch (err) {
            alert(err.response?.data?.error || "Delete failed");
        }
    };

    /* ================= UI ================= */

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">

                {/* HEADER */}
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        Departments Management
                    </h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* ADD NEW */}
                <div className="flex gap-2 mb-6">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New department"
                        className="border p-2 flex-1 rounded"
                    />

                    <button
                        onClick={addDepartment}
                        className="bg-blue-600 text-white px-4 rounded"
                    >
                        Add
                    </button>
                </div>

                {/* TABLE */}
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Department</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {departments.map((d) => (
                            <tr key={d.id} className="border-b">
                                <td className="p-3">{d.name}</td>

                                <td className="p-3">
                                    {d.is_active ? "Active" : "Inactive"}
                                </td>

                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => toggleStatus(d.id)}
                                        className="bg-indigo-600 text-white px-2 py-1 rounded"
                                    >
                                        Toggle
                                    </button>

                                    <button
                                        onClick={() => editDepartment(d)}
                                        className="bg-yellow-600 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteDepartment(d.id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Departments;