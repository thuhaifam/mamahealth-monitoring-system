/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";

import {
    FaBell,
    FaUserCircle
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import motherService from "../../services/motherService";
import doctorService from "../../services/doctorService";
import notificationService from "../../services/notificationService";

export default function Topbar() {

    const { role } = useAuth();

    const [profile, setProfile] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadProfile();
        loadNotifications();

    }, [role]);

    async function loadProfile() {

    try {

        let response;

        if (role === "DOCTOR") {

            response = await doctorService.getProfile();

        }

        else if (role === "MOTHER") {

            response = await motherService.getProfile();

        }

        else if (role === "ADMIN") {

            // Until Admin profile is implemented

            setProfile({

                fullName: "Administrator"

            });

            return;

        }

        setProfile(response.data);

    }

    catch (error) {

        console.error(error);

    }

}

    async function loadNotifications() {

        try {

            let response;

            if (role === "MOTHER") {

                response =
                    await notificationService.getMyNotifications();

            }

            else if (role === "DOCTOR") {

                response =
                    await notificationService.getDoctorNotifications();

            }

            if (response) {

                setNotifications(response.data);

            }

        }

        catch (error) {

            console.error(error);

        }

    }

    const unreadNotifications = notifications.filter(

        notification => notification.status === "UNREAD"

    );

    const today = new Date().toLocaleDateString(

        "en-GB",

        {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric"

        }

    );

    return (

        <header className="topbar">

            <div className="d-flex align-items-center gap-3">

                <div>

                    <h3 className="fw-bold mb-0">

                        Dashboard

                    </h3>

                    <small className="text-muted">

                        {today}

                    </small>

                </div>

            </div>

            <div className="d-flex align-items-center gap-3">

                <button

                    className="btn position-relative"

                    style={{

                        width: 46,

                        height: 46,

                        borderRadius: "50%",

                        background: "#eff6ff"

                    }}

                >

                    <FaBell

                        color="#2563eb"

                        size={18}

                    />

                    {

                        unreadNotifications.length > 0 && (

                            <span

                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"

                            >

                                {

                                    unreadNotifications.length > 99

                                    ? "99+"

                                    : unreadNotifications.length

                                }

                            </span>

                        )

                    }

                </button>

                <div className="d-flex align-items-center gap-2">

                    <FaUserCircle

                        size={45}

                        color="#2563eb"

                    />

                    <div>

                        <div className="fw-bold">

                            {profile?.fullName || "Loading..."}

                        </div>

                        <small className="text-muted">

                            {role}

                        </small>

                    </div>

                </div>

            </div>

        </header>

    );

}