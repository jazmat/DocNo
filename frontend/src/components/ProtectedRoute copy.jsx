import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {

    const { user } = useAuth();

    /* USER NOT LOGGED IN */

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    /* ADMIN ROUTE PROTECTION */

    if (adminOnly && !user.is_admin && !user.is_super_admin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;

};

export default ProtectedRoute;