/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";

import motherService from "../../services/motherService";
import recoveryService from "../../services/recoveryService";
import medicationService from "../../services/medicationService";
import appointmentService from "../../services/appointmentService";
import notificationService from "../../services/notificationService";
import { useNavigate } from "react-router-dom";
import {
    FaHeartbeat,
    FaPills,
    FaCalendarAlt,
    FaBell,
    FaArrowRight
} from "react-icons/fa";

export default function MotherDashboard() {

    const [profile, setProfile] = useState(null);

    const [recoveries, setRecoveries] = useState([]);

    const [medications, setMedications] = useState([]);

    const [appointments, setAppointments] = useState([]);

    const [notifications, setNotifications] = useState([]);
    const unreadNotifications = notifications.filter(
    notification => notification.status === "UNREAD"
);
    const navigate = useNavigate();
    // const hour = new Date().getHours();

// let greeting = "Good Morning";

// if (hour >= 12 && hour < 17) {

//     greeting = "Good Afternoon";

// } else if (hour >= 17) {

//     greeting = "Good Evening";

// }

    useEffect(() => {

        loadDashboard();
        

    }, []);

    async function loadDashboard() {

        try {

            const [

    profileRes,

    recoveryRes,

    medicationRes,

    appointmentRes,

    notificationRes

] = await Promise.all([

    motherService.getProfile(),

    recoveryService.getRecoveryHistory(),

    medicationService.getMyMedications(),

    appointmentService.getMyAppointments(),

    notificationService.getMyNotifications()

]);

setProfile(profileRes.data);

setRecoveries(recoveryRes.data);

setMedications(medicationRes.data);

setAppointments(appointmentRes.data);
console.log("Appointments:", appointmentRes.data);

setNotifications(notificationRes.data);

        } catch (error) {

            console.log(error);

        }

    }

    const today = new Date();

const nextAppointment = appointments
    .filter((appointment) => {

        const appointmentDate = new Date(
            `${appointment.appointmentDate}T${appointment.appointmentTime}`
        );

        return appointmentDate >= today;

    })
    .sort((a, b) => {

        const first = new Date(
            `${a.appointmentDate}T${a.appointmentTime}`
        );

        const second = new Date(
            `${b.appointmentDate}T${b.appointmentTime}`
        );

        return first - second;

    })[0];

    return (

        <DashboardLayout>

            {/* Header */}

            <div className="row align-items-center mb-4">

                <div className="col-lg-8">

                 

                </div>

            </div>

            {/* Statistics */}

            <div className="row g-4">

                <div className="col-xl-3 col-md-6">

                    <StatCard
                        title="Recovery Records"
value={recoveries.length}                        icon={<FaHeartbeat />}
                        color="danger"
                    />

                </div>

                <div className="col-xl-3 col-md-6">

                    <StatCard
                        title="Medications"
value={medications.length}                        icon={<FaPills />}
                        color="success"
                    />

                </div>

                <div className="col-xl-3 col-md-6">

                    <StatCard
                        title="Appointments"
value={appointments.length}                        icon={<FaCalendarAlt />}
                        color="warning"
                    />

                </div>

                <div className="col-xl-3 col-md-6">

                    <StatCard
                        title="Unread Notifications"
value={notifications.filter(n => !n.isRead).length}                        icon={<FaBell />}
                        color="primary"
                    />

                </div>

            </div>

            {/* Middle Section */}

            

                

    {/* ===================== APPOINTMENT + NOTIFICATIONS ===================== */}

<div className="row mt-4 g-4">

    {/* Next Appointment */}

    <div className="col-lg-7">

        <div
            className="card border-0 shadow-sm h-100"
            style={{ borderRadius: 20 }}
        >

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                    <h5 className="fw-bold mb-0">

                        <FaCalendarAlt className="text-primary me-2" />

                        Next Appointment

                    </h5>

                </div>

                <hr />

                {

                    nextAppointment ?

                    (

                        <>

                            <h3 className="fw-bold text-primary mb-4">

                                {new Date(
                                    nextAppointment.appointmentDate
                                ).toLocaleDateString(
                                    "en-GB",
                                    {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    }
                                )}

                            </h3>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <div className="border rounded p-3 h-100">

                                        <small className="text-muted">

                                            Doctor

                                        </small>

                                        <h6 className="fw-bold mt-2">

                                             {nextAppointment.doctorName}

                                        </h6>

                                    </div>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <div className="border rounded p-3 h-100">

                                        <small className="text-muted">

                                            Time

                                        </small>

                                        <h6 className="fw-bold mt-2">

                                             {

                                                new Date(
                                                    `2000-01-01T${nextAppointment.appointmentTime}`
                                                ).toLocaleTimeString(
                                                    [],
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    }
                                                )

                                            }

                                        </h6>

                                    </div>

                                </div>

                            </div>

                            <div className="border rounded p-3 mt-2">

                                <small className="text-muted">

                                    Hospital

                                </small>

                                <h6 className="fw-bold mt-2">

                                     {nextAppointment.hospitalName}

                                </h6>

                            </div>

                        </>

                    )

                    :

                    (

                        <div className="text-center py-5">

                            <FaCalendarAlt
                                size={55}
                                className="text-primary mb-3"
                            />

                            <h4 className="fw-bold">

                                No Upcoming Appointment

                            </h4>

                            <p className="text-muted">

                                You currently have no scheduled appointment.

                            </p>

                        </div>

                    )

                }

                <button

                    className="btn btn-primary w-100 mt-4"

                    onClick={() => navigate("/mother/appointments")}

                >

                    View Appointments

                </button>

            </div>

        </div>

    </div>

    {/* Latest Notifications */}

    <div className="col-lg-5">

        <div
            className="card border-0 shadow-sm h-100"
            style={{ borderRadius: 20 }}
        >

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h5 className="fw-bold mb-0">

                        <FaBell className="text-danger me-2" />

                        Latest Notifications

                    </h5>

                    <Link to="/mother/notifications">

                        <FaArrowRight />

                    </Link>

                </div>

                {

                    unreadNotifications.length === 0 ?

                    (

                        <div className="text-center py-5">

                            <FaBell
                                size={45}
                                className="text-secondary mb-3"
                            />

                            <h6>

                                No New Notifications

                            </h6>

                        </div>

                    )

                    :

                    (

                        unreadNotifications
                            .slice(0,3)
                            .map(notification => (

                                <div

                                    key={notification.id}

                                    className="border-start border-4 border-danger rounded shadow-sm p-3 mb-3"

                                >

                                    <div className="d-flex justify-content-between">

                                        <strong>

                                            {notification.title}

                                        </strong>

                                        <span className="badge bg-danger rounded-pill">

                                            New

                                        </span>

                                    </div>

                                    <p className="text-muted small mt-2 mb-1">

                                        {notification.message}

                                    </p>

                                    <small className="text-secondary">

                                        {notification.type}

                                    </small>

                                </div>

                            ))

                    )

                }

            </div>

        </div>

    </div>

</div>

{/* ===================== RECENT RECOVERY RECORDS ===================== */}

<div className="row mt-4">

    <div className="col-12">

        <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: 20 }}
        >

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h5 className="fw-bold mb-1">

                            <FaHeartbeat className="text-danger me-2" />

                            Recent Recovery Records

                        </h5>

                        <small className="text-muted">

                            Your latest recovery updates

                        </small>

                    </div>

                    <Link
                        to="/mother/recovery"
                        className="btn btn-outline-primary btn-sm"
                    >

                        View All

                    </Link>

                </div>

                {

                    recoveries.length === 0 ?

                    (

                        <div className="text-center py-5">

                            <FaHeartbeat
                                size={55}
                                className="text-secondary mb-3"
                            />

                            <h5>

                                No Recovery Records

                            </h5>

                            <p className="text-muted">

                                Recovery records will appear here once you submit them.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>Date</th>

                                        <th>Pain Level</th>

                                        <th>Temperature</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        recoveries
                                            .slice(0, 5)
                                            .map(item => (

                                                <tr key={item.id}>

                                                    <td>

                                                        <strong>

                                                            {

                                                                new Date(item.recordDate)
                                                                    .toLocaleDateString(
                                                                        "en-GB",
                                                                        {
                                                                            day: "numeric",
                                                                            month: "short",
                                                                            year: "numeric"
                                                                        }
                                                                    )

                                                            }

                                                        </strong>

                                                    </td>

                                                    <td>

                                                        <span className="badge bg-primary">

                                                            {item.painLevel}/10

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span className="fw-semibold">

                                                             {item.bodyTemperature} °C

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {

                                                            item.recoveryIndicator === "IMPROVING" &&

                                                            (

                                                                <span className="badge bg-success">

                                                                    ✅ Improving

                                                                </span>

                                                            )

                                                        }

                                                        {

                                                            item.recoveryIndicator === "MONITOR" &&

                                                            (

                                                                <span className="badge bg-warning text-dark">

                                                                     Monitor

                                                                </span>

                                                            )

                                                        }

                                                        {

                                                            item.recoveryIndicator === "NEEDS_ATTENTION" &&

                                                            (

                                                                <span className="badge bg-danger">

                                                                     Needs Attention

                                                                </span>

                                                            )

                                                        }

                                                    </td>

                                                </tr>

                                            ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

                }

            </div>

        </div>

    </div>

</div>

        </DashboardLayout>

    );

}

