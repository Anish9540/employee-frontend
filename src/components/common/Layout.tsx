import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: FC = () => (
    <div>
        <Navbar />
        <div>
            <Outlet />
        </div>
    </div>
);

export default Layout;
