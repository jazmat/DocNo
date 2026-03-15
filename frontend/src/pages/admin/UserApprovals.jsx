import React, { useEffect, useState } from "react";

import adminService from "../../services/adminService";

function UserApprovals() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        const data = await adminService.getPendingUsers();

        setUsers(data || []);

    }

    async function approve(id) {

        await adminService.approveUser(id);

        loadUsers();

    }

    async function reject(id) {

        await adminService.rejectUser(id);

        loadUsers();

    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                User Approvals
            </h1>

            <div className="bg-white rounded shadow">

                <table className="w-full text-sm">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-2 text-left">
                                Name
                            </th>

                            <th className="p-2 text-left">
                                Email
                            </th>

                            <th className="p-2 text-left">
                                Department
                            </th>

                            <th className="p-2 text-left">
                                Role
                            </th>

                            <th className="p-2 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.length === 0 && (

                            <tr>

                                <td colSpan="5" className="p-4 text-center">
                                    No pending requests
                                </td>

                            </tr>

                        )}

                        {users.map((u) => (

                            <tr key={u.id} className="border-t">

                                <td className="p-2">
                                    {u.full_name}
                                </td>

                                <td className="p-2">
                                    {u.email}
                                </td>

                                <td className="p-2">
                                    {u.department_name || "—"}
                                </td>

                                <td className="p-2">
                                    {u.requested_role}
                                </td>

                                <td className="p-2 flex gap-2">

                                    <button
                                        onClick={() => approve(u.id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => reject(u.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Reject
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );

}

export default UserApprovals;