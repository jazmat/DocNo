import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function SetPassword() {

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const token = params.get("token");
    //console.log("TOKEN:", token);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const submit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/password/reset", {
                token,
                password
            });

            setMessage("Password created successfully.");

            setTimeout(() => navigate("/login"), 2000);

        } catch (err) {

            setMessage(
                err.response?.data?.error || "Failed to set password"
            );

        }

    };
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow">
                    Invalid or missing token
                </div>
            </div>
        );
    }
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded shadow w-96">

                <h2 className="text-xl font-bold mb-4">
                    Set Your Password
                </h2>

                {message && (
                    <div className="mb-4 text-sm text-gray-600">
                        {message}
                    </div>
                )}

                <form onSubmit={submit}>

                    <input
                        type="password"
                        placeholder="New password"
                        className="w-full border p-2 rounded mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="w-full bg-blue-600 text-white py-2 rounded">
                        Set Password
                    </button>

                </form>

            </div>

        </div>

    );

}

export default SetPassword;