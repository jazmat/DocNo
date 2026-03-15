import React, { useEffect, useState } from "react";

import adminService from "../../services/adminService";

function Departments() {

    const [departments, setDepartments] = useState([]);

    const [form, setForm] = useState({
        name: "",
        prefix: "",
        sequence_length: 4,
        year_digits: 2
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadDepartments();
    }, []);

    useEffect(() => {
        loadDepartments();
    }, []);

    async function loadDepartments() {
        try {

            setLoading(true);

            const data = await adminService.getDepartments();

            setDepartments(data || []);

        } catch (err) {

            console.error("Departments load error:", err);

        } finally {

            setLoading(false);

        }
    }

    async function createDepartment() {

        if (!form.name || !form.prefix) {
            alert("Department name and code are required");
            return;
        }

        try {

            await adminService.createDepartment({
                name: form.name,
                prefix: form.prefix,
            });

            loadDepartments();

        } catch (err) {

            console.error("Department create error:", err);
            alert("Failed to create department");

        }
    }

    async function updateDepartment(dept) {

        try {

            await adminService.updateDepartment(dept.id, dept);
            loadDepartments();

        } catch (err) {

            console.error("Department update error:", err);
            alert("Failed to update department");

        }
    }

    function toggleActive(dept) {

        const action = dept.is_active ? "disable" : "enable";

        if (!window.confirm(`Are you sure you want to ${action} this department?`)) {
            return;
        }

        const updated = {
            ...dept,
            is_active: !dept.is_active
        };

        updateDepartment(updated);

    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Departments
            </h1>

            {/* CREATE FORM */}

            <div className="bg-white p-4 rounded shadow mb-6">

                <h2 className="font-semibold mb-4">
                    Create Department
                </h2>

                <div className="flex gap-3">

                    <input
                        placeholder="Department Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Department Prefix (e.g., HR)"
                        value={form.prefix}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                prefix: e.target.value.toUpperCase()
                            })
                        }
                    />
                    <button
                        onClick={createDepartment}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create
                    </button>

                </div>

            </div>

            {/* TABLE */}

            <div className="bg-white rounded shadow">

                <table className="w-full text-sm border-separate border-spacing-y-1">
                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Code</th>
                            <th className="p-2 text-left">Sequence Length</th>
                            <th className="p-2 text-left">Yearly Reset</th>
                            <th className="p-2 text-left">Active</th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!loading && departments.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No departments found
                                </td>
                            </tr>
                        )}

                        {departments.map((d) => (

                            <tr
                                key={d.id}
                                className="bg-white hover:bg-gray-50 transition rounded"
                            >
                                <td className="p-2">
                                    {d.name}
                                </td>

                                <td className="p-2 font-mono">
                                    {d.prefix}
                                </td>

                                <td className="p-2 text-center">
                                    <input
                                        type="number"
                                        value={d.sequence_length}
                                        className="w-16 border rounded text-center"
                                        onChange={(e) => {

                                            const updated = {
                                                ...d,
                                                sequence_length: Number(e.target.value)
                                            };

                                            updateDepartment(updated);

                                        }}
                                    />
                                </td>                                <td className="p-2">

                                    <input
                                        type="checkbox"
                                        checked={d.yearly_reset}
                                        onChange={(e) => {

                                            const updated = {
                                                ...d,
                                                yearly_reset: e.target.checked
                                            };

                                            updateDepartment(updated);

                                        }}
                                    />

                                </td>

                                <td className="p-2">

                                    <input
                                    type="checkbox"
                                    checked={d.is_active}
                                    onChange={() => toggleActive(d)}
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

export default Departments;