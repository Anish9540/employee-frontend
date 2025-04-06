import React, { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
    requireManager?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, requireManager = false }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (requireManager && currentUser.role !== "Manager") {
        return <Navigate to="/scorecard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
