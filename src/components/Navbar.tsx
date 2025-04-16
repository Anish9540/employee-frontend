// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../reduxtoolkit/slices/authSlice";
// import { RootState } from "../reduxtoolkit/store/store";
// import "./Navbar.scss";

// const Navbar = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const user = useSelector((state: RootState) => state.auth.currentUser);

//     const handleLogout = () => {
//         dispatch(logout());
//         navigate("/");
//     };

//     return (
//         <header className="navbar">
//             <div className="nav-left">
//                 <Link to="/dashboard" className="nav-item">Dashboard</Link>
//                 <Link to="/dashboard/profile" className="nav-item">Profile</Link>
//                 <Link to="/dashboard/score" className="nav-item">Score</Link>
//             </div>
//             <div className="nav-right">
//                 <img
//                     src={user?.img}
//                     alt="img"
//                     className="user-image"
//                 />

//                 <div className="user-status">
//                     <h3>{user?.status}</h3>
//                 </div>


//                 <button className="logout-button" onClick={handleLogout}>Logout</button>
//             </div>
//         </header>
//     );
// };

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reduxtoolkit/slices/authSlice";
import { RootState } from "../reduxtoolkit/store/store";
import "./Navbar.scss";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className="navbar">
            <div className="nav-left">
                <Link to="/dashboard" className="nav-item">Dashboard</Link>
                <Link to="/dashboard/profile" className="nav-item">Profile</Link>
                <Link to="/dashboard/score" className="nav-item">Score</Link>
            </div>
            <div className="nav-right">
                <div className="user-info">
                    <img
                        src={user?.img || 'default-image-url'}
                        alt="User"
                        className="user-image"
                    />
                    <div className="user-details">
                        <h3>{user?.name || 'Name Not Available'}</h3>
                        <p className="user-status">{user?.status || 'Status Not Available'}</p>
                    </div>
                </div>

                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Navbar;
