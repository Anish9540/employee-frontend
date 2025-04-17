import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const NavbarLayout = () => {
    return (
        <div className="layout-wrapper">
            <Navbar />
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
};

export default NavbarLayout;
