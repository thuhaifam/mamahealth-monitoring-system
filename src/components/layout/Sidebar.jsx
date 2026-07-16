/* eslint-disable react-hooks/immutability */

import { NavLink, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaUsers,
    FaHeartbeat,
    FaPills,
    FaCalendarAlt,
    FaBell,
    FaChartBar,
    FaHistory
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar({

    sidebarOpen,
    setSidebarOpen

}) {

    const { logout, role } = useAuth();

    const navigate = useNavigate();

    let menus = [];

if (role === "ADMIN") {

    menus = [

        {
            name: "Dashboard",
            icon: <FaHome />,
            path: "/admin/dashboard"
        },

        {
            name: "Doctors",
            icon: <FaUser />,
            path: "/admin/doctors"
        },

        {
            name: "Mothers",
            icon: <FaUsers />,
            path: "/admin/mothers"
        },

        {
            name: "Reports",
            icon: <FaChartBar />,
             path: "/admin/reports"
        },

        {
            name: "Activity Log",
            icon: <FaHistory />,
            path: "/admin/activities"
        }


    ];

} else if (role === "DOCTOR") {

    menus = [

        {
            name: "Dashboard",
            icon: <FaHome />,
            path: "/doctor/dashboard"
        },

        {
            name: "My Profile",
            icon: <FaUser />,
            path: "/doctor/profile"
        },

        {
            name: "Manage Mothers",
            icon: <FaUsers />,
            path: "/doctor/mothers"
        },

        {
            name: "Medications",
            icon: <FaPills />,
            path: "/doctor/medications"
        },

        {
            name: "Appointments",
            icon: <FaCalendarAlt />,
            path: "/doctor/appointments"
        },

        {
            name: "Notifications",
            icon: <FaBell />,
            path: "/doctor/notifications"
        }

    ];

} else {

    menus = [

        {
            name: "Dashboard",
            icon: <FaHome />,
            path: "/mother/dashboard"
        },

        {
            name: "My Profile",
            icon: <FaUser />,
            path: "/mother/profile"
        },

        {
            name: "Recovery",
            icon: <FaHeartbeat />,
            path: "/mother/recovery"
        },

        {
            name: "Medication",
            icon: <FaPills />,
            path: "/mother/medication"
        },

        {
            name: "Appointments",
            icon: <FaCalendarAlt />,
            path: "/mother/appointments"
        },

        {
            name: "Notifications",
            icon: <FaBell />,
            path: "/mother/notifications"
        }

    ];

}

    return (

        <>

            <button

                className="mobile-menu-btn"

                onClick={() => setSidebarOpen(true)}

            >

                <FaBars />

            </button>

            <aside

                className={sidebarOpen ? "sidebar open" : "sidebar"}

            >

                <button

                    className="close-sidebar"

                    onClick={() => setSidebarOpen(false)}

                >

                    <FaTimes />

                </button>

                <div className="logo">

                    🩺 MamaHealth

                </div>

                {

                    menus.map((menu) => (

                        <NavLink

                            key={menu.path}

                            to={menu.path}

                            onClick={() => setSidebarOpen(false)}

                            className={({ isActive }) =>

                                isActive ? "active" : ""

                            }

                        >

                            {menu.icon}

                            <span>

                                {menu.name}

                            </span>

                        </NavLink>

                    ))

                }

                <div className="sidebar-footer">

                    <button

                        className="btn btn-danger w-100"

                        onClick={() => {

                            logout();

                            navigate("/");

                        }}

                    >

                        <FaSignOutAlt className="me-2" />

                        Logout

                    </button>

                </div>

            </aside>

        </>

    );

}