import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const loadCategories = async () => {
        const res = await api.get("/admin/categories");
        setCategories(res.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const addCategory = async () => {
        if (!name.trim()) return;

        await api.post("/admin/categories", { name });
        setName("");
        loadCategories();
    };

    const toggleStatus = async (id) => {
        await api.patch(`/admin/categories/${id}/status`);
        loadCategories();
    };

    const editCategory = async (cat) => {
        const newName = prompt("Rename category:", cat.name);
        if (!newName) return;

        await api.put(`/admin/categories/${cat.id}`, {
            name: newName,
        });

        loadCategories();
    };

    const deleteCategory = async (id) => {
        if (!window.confirm("Delete category?")) return;

        try {
            await api.delete(`/admin/categories/${id}`);
            loadCategories();
        } catch (err) {
            alert(err.response?.data?.error || "Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">

                {/* HEADER */}
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        Categories Management
                    </h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* ADD CATEGORY */}
                <div className="flex gap-2 mb-6">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New category"
                        className="border p-2 flex-1 rounded"
                    />

                    <button
                        onClick={addCategory}
                        className="bg-blue-600 text-white px-4 rounded"
                    >
                        Add
                    </button>
                </div>

                {/* TABLE */}
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Category</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((c) => (
                            <tr key={c.id} className="border-b">
                                <td className="p-3">{c.name}</td>

                                <td className="p-3">
                                    {c.is_active ? "Active" : "Inactive"}
                                </td>

                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => toggleStatus(c.id)}
                                        className="bg-indigo-600 text-white px-2 py-1 rounded"
                                    >
                                        Toggle
                                    </button>

                                    <button
                                        onClick={() => editCategory(c)}
                                        className="bg-yellow-600 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteCategory(c.id)}
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

export default Categories;