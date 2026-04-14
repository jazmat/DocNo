import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // 🔥 ADD THIS
import logo from "../assets/logo.png";

function TopNavbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate(); // 🔥 ADD THIS

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/audit/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        } catch (err) {
            console.warn("Logout log failed (ignored)");
        }

        // ✅ clear auth state
        logout();

        // 🔥 THIS WAS MISSING → FORCE REDIRECT
        navigate("/login", { replace: true });
    };

    return (
        <div className="bg-white shadow px-6 py-3 flex items-center justify-between">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Company Logo"
                    className="h-8 w-auto"
                />
                <span className="text-lg font-semibold text-gray-700">
                    DocNo System
                </span>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">
                    {user?.full_name}
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                    Logout
                </button>
            </div>

        </div>
    );
}

export default TopNavbar;