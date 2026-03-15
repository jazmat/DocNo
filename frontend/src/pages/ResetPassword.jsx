import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function ResetPassword() {

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const token = new URLSearchParams(window.location.search).get("token");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [completed, setCompleted] = useState(false);

    const submit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/password/reset", {
                token,
                password
            });
            setMsg("Password updated successfully.");
            setCompleted(true);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {

            console.error(err);
            setError("Failed to update password.");

        }

    };

    const cancel = () => {
        navigate("/login");
    };

    return (

        <div className="flex justify-center mt-40">

            <form onSubmit={submit} className="bg-white p-8 shadow w-96">

                <h2 className="text-xl mb-4">Reset Password</h2>

                {msg && <p className="text-green-600 mb-3">{msg}</p>}
                {error && <p className="text-red-600 mb-3">{error}</p>}

                {!completed && (

                    <>
                        <input
                            type="password"
                            className="border w-full p-2 mb-3"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="flex gap-3">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white w-full py-2"
                            >
                                Update Password
                            </button>

                            <button
                                type="button"
                                onClick={cancel}
                                className="bg-gray-500 text-white w-full py-2"
                            >
                                Cancel
                            </button>

                        </div>
                    </>

                )}

                {completed && (

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="bg-green-600 text-white w-full py-2"
                    >
                        Go to Login
                    </button>

                )}

            </form>

        </div>

    );

}

export default ResetPassword;