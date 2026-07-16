/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";

import {
    FaUserMd,
    FaUserInjured,
    FaCalendarAlt,
    FaPills,
    FaHeartbeat,
    FaBell
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";

import adminService from "../../services/adminService";

export default function AdminReports() {

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadReports();

    }, []);

    async function loadReports() {

        try {

            const response =
                await adminService.getReports();

            setReport(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="text-center py-5">

                    Loading Reports...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    Reports & Analytics

                </h2>

                <p className="text-muted">

                    Overall statistics of the MamaHealth system.

                </p>

            </div>

            <div className="row g-4">

                <div className="col-lg-4 col-md-6">

                    <StatCard

                        title="Doctors"

                        value={report?.totalDoctors || 0}

                        icon={<FaUserMd size={28} />}

                        color="primary"

                    />

                </div>

                <div className="col-lg-4 col-md-6">

                    <StatCard

                        title="Mothers"

                        value={report?.totalMothers || 0}

                        icon={<FaUserInjured size={28} />}

                        color="success"

                    />

                </div>

                <div className="col-lg-4 col-md-6">

                    <StatCard

                        title="Appointments"

                        value={report?.totalAppointments || 0}

                        icon={<FaCalendarAlt size={28} />}

                        color="warning"

                    />

                </div>

                <div className="col-lg-4 col-md-6">

                    <StatCard

                        title="Recovery Reports"

                        value={report?.recoveryReports || 0}

                        icon={<FaHeartbeat size={28} />}

                        color="danger"

                    />

                </div>

                <div className="col-lg-4 col-md-6">

                    <StatCard

                        title="Active Medications"

                        value={report?.activeMedications || 0}

                        icon={<FaPills size={28} />}

                        color="info"

                    />

                </div>

                <div className="col-lg-4 col-md-6">

                    <StatCard

                        title="Completed Medications"

                        value={report?.completedMedications || 0}

                        icon={<FaPills size={28} />}

                        color="secondary"

                    />

                </div>

                <div className="col-lg-6">

                    <StatCard

                        title="Completed Appointments"

                        value={report?.completedAppointments || 0}

                        icon={<FaCalendarAlt size={28} />}

                        color="success"

                    />

                </div>

                <div className="col-lg-6">

                    <StatCard

                        title="Missed Appointments"

                        value={report?.missedAppointments || 0}

                        icon={<FaCalendarAlt size={28} />}

                        color="danger"

                    />

                </div>

                <div className="col-lg-12">

                    <StatCard

                        title="Notifications Sent"

                        value={report?.notifications || 0}

                        icon={<FaBell size={28} />}

                        color="primary"

                    />

                </div>

            </div>

        </DashboardLayout>

    );

}