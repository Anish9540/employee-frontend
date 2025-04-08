// src/components/Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Navbar.scss";
import { logout } from "../slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     navigate("/");
    // };
    const handleLogout = () => {
        dispatch(logout());          // ⬅️ CLEAR user from store
        navigate("/");               // ⬅️ THEN navigate to login
    };

    return (
        <header className="navbar">
            <div className="nav-left">
                <Link to="/dashboard" className="nav-item">Dashboard</Link>
                <Link to="/dashboard/profile" className="nav-item">Profile</Link>
                <Link to="/dashboard/score" className="nav-item">Score</Link>
            </div>
            <div className="nav-right">
                <img
                    src="https://via.placeholder.com/40"
                    alt="User"
                    className="user-image"
                />
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Navbar;
