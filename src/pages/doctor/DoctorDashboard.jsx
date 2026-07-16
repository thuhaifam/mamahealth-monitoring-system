/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";

import {
    FaUserInjured,
    FaHeartbeat,
    FaPills,
    FaCalendarAlt
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";

import doctorService from "../../services/doctorService";

export default function DoctorDashboard() {

    const [, setProfile] = useState(null);

    const [dashboard, setDashboard] = useState(null);
    const [recentRecoveries, setRecentRecoveries] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const [
    profileRes,
    dashboardRes,
    recoveryRes
] = await Promise.all([

    doctorService.getProfile(),

    doctorService.getDashboard(),

    doctorService.getRecentRecoveries()

]);

setProfile(profileRes.data);

setDashboard(dashboardRes.data);

setRecentRecoveries(recoveryRes.data);

        } catch (error) {

            console.error(error);

        }

    }

    // const hour = new Date().getHours();

    // let greeting = "Good Morning";

    // if (hour >= 12 && hour < 17) {

    //     greeting = "Good Afternoon";

    // } else if (hour >= 17) {

    //     greeting = "Good Evening";

    // }

    return (

        <DashboardLayout>

            {/* Header */}

            {/* <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        {greeting}, Dr. {profile?.fullName} 👋

                    </h2>

                    <p className="text-muted mb-0">

                        Welcome back to <strong>MamaHealth</strong>

                    </p>

                </div>

            </div> */}

            {/* Statistics */}

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <StatCard

                        title="Registered Mothers"

                        value={dashboard?.totalMothers || 0}

                        icon={<FaUserInjured size={28} />}

                        color="primary"

                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard

                        title="Recovery Reports"

                        value={dashboard?.recoveryReports || 0}

                        icon={<FaHeartbeat size={28} />}

                        color="danger"

                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard

                        title="Active Medications"

                        value={dashboard?.activeMedications || 0}

                        icon={<FaPills size={28} />}

                        color="success"

                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard

                        title="Appointments"

                        value={dashboard?.upcomingAppointments || 0}

                        icon={<FaCalendarAlt size={28} />}

                        color="warning"

                    />

                </div>

            </div>


                <div className="card border-0 shadow-sm mt-4">

    <div className="card-body">

        <h5 className="fw-bold mb-4">

            Recent Recovery Reports

        </h5>

        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead className="table-light">

                    <tr>

                        <th>Mother</th>

                        <th>Date</th>

                        <th>Pain</th>

                        <th>Temperature</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                {

                    recentRecoveries.length === 0 ?

                    (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >

                                No recovery reports found.

                            </td>

                        </tr>

                    )

                    :

                    recentRecoveries.map((item) => (

                        <tr key={item.id}>

                            <td>

                                {item.motherName}

                            </td>

                            <td>

                                {item.recordDate}

                            </td>

                            <td>

                                {item.painLevel}/10

                            </td>

                            <td>

                                {item.bodyTemperature}°C

                            </td>

                            <td>

                                {

                                    item.recoveryIndicator === "IMPROVING"

                                    &&

                                    <span className="badge bg-success">

                                        Improving

                                    </span>

                                }

                                {

                                    item.recoveryIndicator === "MONITOR"

                                    &&

                                    <span className="badge bg-warning text-dark">

                                        Monitor

                                    </span>

                                }

                                {

                                    item.recoveryIndicator === "NEEDS_ATTENTION"

                                    &&

                                    <span className="badge bg-danger">

                                        Needs Attention

                                    </span>

                                }

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    </div>

</div>
        </DashboardLayout>

    );

}