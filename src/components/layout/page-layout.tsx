import React from "react";
import { Outlet } from "react-router";

const Layout: React.FunctionComponent = () => {
    return (
        <div
            className="app-container"
            style={{
                padding: "2rem",
            }}
        >
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
