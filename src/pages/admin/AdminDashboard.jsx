/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";

import {
    FaUsers,
    FaUserMd,
    FaUserInjured,
    FaHeartbeat,
    FaPills,
    FaCalendarAlt,
    FaBell
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";

import adminService from "../../services/adminService";

export default function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const response =
                await adminService.getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <DashboardLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    Admin Dashboard

                </h2>

                <p className="text-muted">

                    Welcome to the MamaHealth Administration Panel.

                </p>

            </div>

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Total Users"
                        value={dashboard?.totalUsers || 0}
                        icon={<FaUsers size={28} />}
                        color="primary"
                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Doctors"
                        value={dashboard?.totalDoctors || 0}
                        icon={<FaUserMd size={28} />}
                        color="success"
                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Mothers"
                        value={dashboard?.totalMothers || 0}
                        icon={<FaUserInjured size={28} />}
                        color="warning"
                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Recoveries"
                        value={dashboard?.totalRecoveries || 0}
                        icon={<FaHeartbeat size={28} />}
                        color="danger"
                    />

                </div>

                <div className="col-lg-4 col-md-6">

                    <StatCard
                        title="Medications"
                        value={dashboard?.totalMedications || 0}
                        icon={<FaPills size={28} />}
                        color="success"
                    />

                </div>

                <div className="col-lg-4 col-md-6">

                    <StatCard
                        title="Appointments"
                        value={dashboard?.totalAppointments || 0}
                        icon={<FaCalendarAlt size={28} />}
                        color="warning"
                    />

                </div>

                <div className="col-lg-4 col-md-12">

                    <StatCard
                        title="Notifications"
                        value={dashboard?.totalNotifications || 0}
                        icon={<FaBell size={28} />}
                        color="primary"
                    />

                </div>

            </div>

            

        </DashboardLayout>

    );

}