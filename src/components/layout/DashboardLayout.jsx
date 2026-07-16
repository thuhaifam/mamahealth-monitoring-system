import "./layout.css";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="dashboard-layout">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="main">

                <Topbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="content">

                    <div className="dashboard-content">

                        {children}

                    </div>

                </main>

                <Footer />

            </div>

        </div>

    );

}