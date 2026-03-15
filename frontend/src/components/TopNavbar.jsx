import React from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function TopNavbar() {

    const { user, logout } = useAuth();

    return (

        <div className="bg-white shadow px-6 py-3 flex items-center justify-between">

            {/* LEFT SIDE - LOGO + SYSTEM NAME */}

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


            {/* RIGHT SIDE - USER INFO */}

            <div className="flex items-center gap-4">

                <span className="text-gray-600 text-sm">
                    {user?.full_name}
                </span>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default TopNavbar;