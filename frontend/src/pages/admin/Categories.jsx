import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        prefix: ""
    });
    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {

        try {

            setLoading(true);

            const data = await adminService.getCategories();

            setCategories(data || []);

        } catch (err) {

            console.error("Categories load error:", err);

        } finally {

            setLoading(false);

        }

    }

    async function createCategory() {

        if (!form.name || !form.prefix) {
            alert("Category name and code are required");
            return;
        }

        try {

            await adminService.createCategory({
                name: form.name,
                prefix: form.prefix
            });

            setForm({
                name: "",
                prefix: ""
            });

            loadCategories();

        } catch (err) {

            console.error("Category create error:", err);
            alert("Failed to create category");

        }

    }

    async function updateCategory(cat) {

        try {

            await adminService.updateCategory(cat.id, cat);
            loadCategories();

        } catch (err) {

            console.error("Category update error:", err);
            alert("Failed to update category");

        }

    }

    function toggleActive(cat) {

        const updated = {
            ...cat,
            is_active: !cat.is_active
        };

        updateCategory(updated);

    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Categories
            </h1>

            {/* CREATE FORM */}

            <div className="bg-white p-4 rounded shadow mb-6">

                <h2 className="font-semibold mb-4">
                    Create Category
                </h2>

                <div className="flex gap-3">

                    <input
                        placeholder="Name (e.g. INVOICE)"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Cat Code (e.g. INV)"
                        value={form.prefix}
                        onChange={(e) =>
                            setForm({ ...form, prefix: e.target.value.toUpperCase() })
                        }
                    />

                    <button
                        onClick={createCategory}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create
                    </button>

                </div>

            </div>

            {/* CATEGORY TABLE */}

            <div className="bg-white rounded shadow">

                <table className="w-full text-sm">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-2 text-left">
                                Name
                            </th>

                            <th className="p-2 text-left">
                                Code
                            </th>

                            <th className="p-2 text-left">
                                Active
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading && (

                            <tr>
                                <td colSpan="3" className="p-4 text-center">
                                    Loading...
                                </td>
                            </tr>

                        )}

                        {!loading && categories.length === 0 && (

                            <tr>
                                <td colSpan="3" className="p-4 text-center text-gray-500">
                                    No categories found
                                </td>
                            </tr>

                        )}

                        {categories.map((c) => (

                            <tr key={c.id} className="border-t">

                                <td className="p-2">
                                    {c.name}
                                </td>

                                <td className="p-2 font-mono">
                                    {c.prefix}
                                </td>

                                <td className="p-2">

                                    <input
                                        type="checkbox"
                                        checked={c.is_active}
                                        onChange={() => toggleActive(c)}
                                    />
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Categories;