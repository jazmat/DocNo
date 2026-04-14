import React from "react";
import { NavLink } from "react-router-dom";

import {
    USER_NAVIGATION,
    ADMIN_NAVIGATION,
    SUPERADMIN_NAVIGATION
} from "../constants/navigation"; 
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Sidebar() {

    const { user } = useAuth();

    const navItems = [
        ...USER_NAVIGATION,
        ...(user?.is_admin ? ADMIN_NAVIGATION : []),
        ...(user?.is_super_admin ? SUPERADMIN_NAVIGATION : [])
    ];
    return (

        <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">

            {/* LOGO SECTION */}

            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700">

                <img
                    src={logo}
                    alt="DocNo Logo"
                    title="Document Numbering System"
                    className="h-8 w-auto"
                />
                <span className="text-sm ">
                    Document Numbering System
                </span>
            </div>

            {/* NAVIGATION */}

            <nav className="p-4 space-y-2 flex-1">

                {navItems.map((item) => (

                    <NavLink
                    
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded ${isActive
                                ? "bg-slate-700"
                                : "hover:bg-slate-800"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>

                ))}

            </nav>

        </aside>

    );

}

export default Sidebar;