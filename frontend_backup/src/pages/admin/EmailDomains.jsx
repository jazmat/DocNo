import React, { useEffect, useState } from "react";
import api from "../../services/api";

function EmailDomains() {

    const [domains, setDomains] = useState([]);
    const [domain, setDomain] = useState("");

    async function loadDomains() {

        const res = await api.get("/admin/email-domains");
        setDomains(res.data || []);

    }

    useEffect(() => {
        loadDomains();
    }, []);

    async function addDomain() {

        if (!domain) return;

        await api.post("/admin/email-domains", { domain });

        setDomain("");
        loadDomains();

    }

    async function toggle(id) {

        await api.patch(`/admin/email-domains/${id}/toggle`);

        loadDomains();

    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Allowed Email Domains
            </h1>

            <div className="flex gap-3 mb-6">

                <input
                    className="border p-2 rounded"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                />

                <button
                    onClick={addDomain}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add
                </button>

            </div>

            <table className="w-full bg-white shadow rounded">

                <thead className="bg-gray-200">

                    <tr>
                        <th className="p-3 text-left">Domain</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {domains.map(d => (

                        <tr key={d.id} className="border-t">

                            <td className="p-3">{d.domain}</td>

                            <td className="text-center">
                                {d.is_active ? "Active" : "Disabled"}
                            </td>

                            <td className="text-center">

                                <button
                                    onClick={() => toggle(d.id)}
                                    className="px-3 py-1 bg-gray-600 text-white rounded"
                                >
                                    Toggle
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default EmailDomains;