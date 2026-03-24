import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterSubmitted = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded shadow text-center max-w-md">

                <h1 className="text-2xl font-bold text-green-700 mb-4">
                    Registration Request Submitted
                </h1>

                <p className="text-gray-700 mb-4">
                    Your registration request has been successfully submitted.
                </p>

                <p className="text-gray-600 mb-6">
                    Your request has been sent to the concerned department administrator
                    for approval.
                </p>

                <p className="text-gray-600 mb-8">
                    You will receive an email notification once your request is reviewed.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Return to Login
                </button>

            </div>

        </div>
    );
};

export default RegisterSubmitted;