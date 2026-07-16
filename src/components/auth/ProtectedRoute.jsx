import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({

    children,

    allowedRoles

}) {

    const { token, role } = useAuth();

    if (!token) {

        return <Navigate to="/" replace />;

    }

    if (!allowedRoles.includes(role)) {

        return <Navigate to="/" replace />;

    }

    return children;

}