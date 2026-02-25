import { useAuth } from "../context/AuthContext";

export default function TopNavbar() {
    const { user } = useAuth();

    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">
                Document Number Generator
            </h1>

            <div className="text-gray-600">
                {user?.full_name}
            </div>
        </div>
    );
}