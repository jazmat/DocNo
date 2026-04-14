import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RejectUser() {

    const { id } = useParams();

    const [reason, setReason] = useState("");

    const handleSubmit = async () => {

        await axios.post(`/api/adminUsers/email-reject/${id}`, {
            reason
        });

        alert("User rejected");

    };

    return (

        <div className="max-w-md mx-auto mt-20">

            <h2 className="text-xl font-bold mb-4">
                Reject Registration Request
            </h2>

            <textarea
                placeholder="Enter rejection reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="border p-2 w-full mb-4"
            />

            <button
                onClick={handleSubmit}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Submit Rejection
            </button>

        </div>

    );

}

export default RejectUser;