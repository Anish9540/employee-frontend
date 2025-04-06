// import React, { FC } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";

// const Navbar: FC = () => {
//     const { currentUser, logout } = useAuth();
//     const navigate = useNavigate();

//     if (!currentUser) return null;

//     return (
//         <nav>
//             <div>
//                 {currentUser.role === "Manager" ? (
//                     <span>Profile (Inactive)</span>
//                 ) : (
//                     <Link to="/profile">Profile</Link>
//                 )}{" "}
//                 |
//                 {currentUser.role === "Manager" ? (
//                     <span>Scorecard (Inactive)</span>
//                 ) : (
//                     <Link to="/scorecard">Scorecard</Link>
//                 )}{" "}
//                 |
//                 {currentUser.role === "Manager" ? (
//                     <Link to="/manager">Manager</Link>
//                 ) : (
//                     <span>Manager (Inactive)</span>
//                 )}
//             </div>
//             <div>
//                 <span>
//                     {currentUser.name} ({currentUser.role})
//                 </span>{" "}
//                 |
//                 <button
//                     onClick={() => {
//                         logout();
//                         navigate("/login");
//                     }}
//                 >
//                     Logout
//                 </button>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";

const Navbar: FC = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    if (!currentUser) return null;

    return (
        <nav>
            <div>
                {currentUser.role === "Manager" ? (
                    <span>Profile (Inactive)</span>
                ) : (
                    <Link to="/profile">Profile</Link>
                )}
                |
                {currentUser.role === "Manager" ? (
                    <span>Scorecard (Inactive)</span>
                ) : (
                    <Link to="/scorecard">Scorecard</Link>
                )}
                |
                {currentUser.role === "Manager" ? (
                    <Link to="/manager">Manager</Link>
                ) : (
                    <span>Manager (Inactive)</span>
                )}
            </div>
            <div>
                <span>
                    {currentUser.name} ({currentUser.role})
                </span>
                |
                <button
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
