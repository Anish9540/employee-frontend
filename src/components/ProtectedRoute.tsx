import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProtectedRoute = () => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    // If user is not logged in, redirect to login page
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    // If user is logged in, render the requested route
    return <Outlet />;
};

export default ProtectedRoute;
