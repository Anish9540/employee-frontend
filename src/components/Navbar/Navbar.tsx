import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduxtoolkit/slices/authSlice";
import { RootState } from "../../reduxtoolkit/store/store";
import "./Navbar.scss";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const getImageUrl = (imgPath?: string) => {
        if (!imgPath) return "https://via.placeholder.com/100";
        return imgPath.startsWith("/uploads")
            ? `http://localhost:35000${imgPath}`
            : imgPath;
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
                        src={getImageUrl(user?.img)}
                        alt="User"
                        className="user-image"
                    />
                    <div className="user-details">
                        <div className="user-column">
                            <p className="user-name">
                                <strong>{user?.name || 'Name Not Available'}</strong>
                            </p>
                            <p className="user-email">
                                <strong>Email : </strong> {user?.email || 'Not Available'}
                            </p>
                        </div>
                        <div className="user-column">
                            <p className="user-role">
                                <strong>Role:</strong> {user?.roleStatus || 'Not Available'}
                            </p>
                            {/* Conditionally render the Status field */}
                            {user?.roleStatus !== "Manager" && (
                                <p className="user-status">
                                    <strong>Status:</strong> {user?.status || 'Not Available'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;

