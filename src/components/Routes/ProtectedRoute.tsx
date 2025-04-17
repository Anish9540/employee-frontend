import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxtoolkit/store/store";

const ProtectedRoute = () => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
