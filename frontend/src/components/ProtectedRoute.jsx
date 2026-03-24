import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLayout from "./layouts/MainLayout";

const ProtectedRoute = ({ children, adminOnly }) => {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !user.is_admin && !user.is_super_admin) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <MainLayout> 
            {children}
        </MainLayout> 
    );
};

export default ProtectedRoute;