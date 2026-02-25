import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const linkClass = (path) =>
        `block px-4 py-2 rounded-md mb-2 ${location.pathname === path
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`;

    return (
        <div className="w-64 bg-white shadow-md h-screen p-4">
            <h2 className="text-xl font-bold mb-6">DocNo</h2>

            <nav>
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                    Dashboard
                </Link>

                {!user?.is_admin && (
                    <Link to="/my-documents" className={linkClass("/my-documents")}>
                        My Documents
                    </Link>
                )}

                {user?.is_admin && (
                    <Link to="/admin" className={linkClass("/admin")}>
                        Admin Dashboard
                    </Link>
                )}
            </nav>

            <button
                onClick={logout}
                className="mt-8 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
}