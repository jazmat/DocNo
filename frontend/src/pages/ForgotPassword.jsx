import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/password/forgot", { email });

            setMessage(
                "If the email exists, a password reset link has been sent."
            );
            setError("");

        } catch (err) {

            console.error(err);
            setError("Failed to send reset email");
            setMessage("");

        }

    };

    const cancel = () => {
        navigate("/login");
    };

    return (

        <div className="flex justify-center mt-40">

            <form
                onSubmit={submit}
                className="bg-white p-8 shadow w-96"
            >

                <h2 className="text-xl mb-4">
                    Forgot Password
                </h2>

                {message && (
                    <p className="mb-3 text-sm text-green-600">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mb-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <input
                    className="border w-full p-2 mb-4"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="bg-blue-600 text-white w-full py-2"
                    >
                        Send Reset Link
                    </button>

                    <button
                        type="button"
                        onClick={cancel}
                        className="bg-gray-500 text-white w-full py-2"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}

export default ForgotPassword;