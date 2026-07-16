/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import motherService from "../../services/motherService";
import medicationService from "../../services/medicationService";
import appointmentService from "../../services/appointmentService";
import notificationService from "../../services/notificationService";
import recoveryService from "../../services/recoveryService";

import {
    FaHeartbeat,
    FaPills,
    FaCalendarAlt,
    FaBell
} from "react-icons/fa";

export default function MotherDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mother, setMother] = useState(null);

    const [recoveries, setRecoveries] = useState([]);

    const [medications, setMedications] = useState([]);

    const [appointments, setAppointments] = useState([]);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const [

                motherRes,

                recoveryRes,

                medicationRes,

                appointmentRes,

                notificationRes

            ] = await Promise.all([

                motherService.getMotherById(id),

                recoveryService.getMotherRecoveryHistory(id),

                medicationService.getMotherMedications(id),

                appointmentService.getMotherAppointments(id),

                notificationService.getMotherNotifications(id)

            ]);

            setMother(motherRes.data);

            setRecoveries(recoveryRes.data);

            setMedications(medicationRes.data);

            setAppointments(appointmentRes.data);

            setNotifications(notificationRes.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    if (!mother) {

        return (

            <DashboardLayout>

                <div className="text-center py-5">

                    Loading...

                </div>

            </DashboardLayout>

        );

    }

    if (!mother) {

        return (

            <DashboardLayout>

                <div className="text-center py-5">

                    Loading...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="fw-bold">

                👩 Patient Clinical Summary

            </h2>

            <p className="text-muted">

                Review the patient's complete clinical information.

            </p>

        </div>

        <button

            className="btn btn-secondary"

            onClick={() => navigate("/doctor/mothers")}

        >

            Back

        </button>

    </div>

    <div className="row">

        {/* Patient Profile */}

        <div className="col-lg-6 mb-4">

            <div className="card shadow-sm border-0 h-100">

                <div className="card-header bg-primary text-white">

                    <h5 className="mb-0">

                        👩 Patient Information

                    </h5>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-6 mb-3">

                            <small className="text-muted">

                                Full Name

                            </small>

                            <h6>{mother.fullName}</h6>

                        </div>

                        <div className="col-6 mb-3">

                            <small className="text-muted">

                                Phone

                            </small>

                            <h6>{mother.phoneNumber}</h6>

                        </div>

                        <div className="col-6 mb-3">

                            <small className="text-muted">

                                Blood Group

                            </small>

                            <h6>{mother.bloodGroup}</h6>

                        </div>

                        <div className="col-6 mb-3">

                            <small className="text-muted">

                                Delivery Date

                            </small>

                            <h6>{mother.deliveryDate}</h6>

                        </div>

                        <div className="col-6 mb-3">

                            <small className="text-muted">

                                Hospital

                            </small>

                            <h6>{mother.hospitalName}</h6>

                        </div>

                        <div className="col-6 mb-3">

                            <small className="text-muted">

                                Emergency Contact

                            </small>

                            <h6>{mother.emergencyContact}</h6>

                        </div>

                        <div className="col-12">

                            <small className="text-muted">

                                Address

                            </small>

                            <h6>{mother.address}</h6>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        {/* Recovery Summary */}

        <div className="col-lg-6 mb-4">

            <div className="card shadow-sm border-0 h-100">

                <div className="card-header bg-danger text-white">

                    <FaHeartbeat className="me-2" />

                    Recovery Summary

                </div>

                <div className="card-body">

                    {

                        recoveries.length === 0 ?

                        (

                            <div className="text-center py-5">

                                No recovery records.

                            </div>

                        )

                        :

                        (

                            <>

                                <h4 className="mb-3">

                                    {

                                        recoveries[0].recoveryIndicator === "IMPROVING"

                                            ? "🟢 Improving"

                                            : recoveries[0].recoveryIndicator === "MONITOR"

                                            ? "🟡 Monitor"

                                            : "🔴 Needs Attention"

                                    }

                                </h4>

                                <div className="row">

                                    <div className="col-6 mb-3">

                                        <small className="text-muted">

                                            Pain Level

                                        </small>

                                        <h5>

                                            {recoveries[0].painLevel}/10

                                        </h5>

                                    </div>

                                    <div className="col-6 mb-3">

                                        <small className="text-muted">

                                            Temperature

                                        </small>

                                        <h5>

                                            {recoveries[0].bodyTemperature}°C

                                        </h5>

                                    </div>

                                    <div className="col-6 mb-3">

                                        <small className="text-muted">

                                            Mobility

                                        </small>

                                        <h6>

                                            {recoveries[0].mobility}

                                        </h6>

                                    </div>

                                    <div className="col-6 mb-3">

                                        <small className="text-muted">

                                            Wound

                                        </small>

                                        <h6>

                                            {recoveries[0].woundCondition}

                                        </h6>

                                    </div>

                                </div>

                                <button

                                    className="btn btn-outline-danger"

                                    onClick={() =>

                                        navigate(`/doctor/mothers/${mother.id}/recovery`)

                                    }

                                >

                                    View Full Recovery History

                                </button>

                            </>

                        )

                    }

                </div>

            </div>

        </div>

    </div>

    <div className="row">

    {/* Current Medications */}

    <div className="col-lg-6 mb-4">

        <div className="card shadow-sm border-0 h-100">

            <div className="card-header bg-success text-white">

                <FaPills className="me-2" />

                Current Medications

            </div>

            <div className="card-body">

                {

                    medications.length === 0 ?

                    (

                        <div className="text-center py-5">

                            No medications found.

                        </div>

                    )

                    :

                    medications.slice(0, 5).map((item) => (

                        <div

                            key={item.id}

                            className="d-flex justify-content-between align-items-center border-bottom py-3"

                        >

                            <div>

                                <div className="fw-bold">

                                    {item.medicationName}

                                </div>

                                <small className="text-muted">

                                    {item.dosage} • {item.frequency}

                                </small>

                            </div>

                            <span

                                className={`badge ${
                                    item.status === "ACTIVE"
                                        ? "bg-warning text-dark"
                                        : item.status === "COMPLETED"
                                        ? "bg-success"
                                        : "bg-secondary"
                                }`}

                            >

                                {item.status}

                            </span>

                        </div>

                    ))

                }

                <div className="text-end mt-3">

                    <button

                        className="btn btn-outline-success btn-sm"

                        onClick={() =>

                            navigate(`/doctor/medications/create/${mother.id}`)

                        }

                    >

                        Prescribe Medication

                    </button>

                </div>

            </div>

        </div>

    </div>

    {/* Upcoming Appointments */}

    <div className="col-lg-6 mb-4">

        <div className="card shadow-sm border-0 h-100">

            <div className="card-header bg-primary text-white">

                <FaCalendarAlt className="me-2" />

                Upcoming Appointments

            </div>

            <div className="card-body">

                {

                    appointments.length === 0 ?

                    (

                        <div className="text-center py-5">

                            No appointments scheduled.

                        </div>

                    )

                    :

                    appointments.slice(0, 5).map((item) => (

                        <div

                            key={item.id}

                            className="d-flex justify-content-between align-items-center border-bottom py-3"

                        >

                            <div>

                                <div className="fw-bold">

                                    {item.appointmentDate}

                                </div>

                                <small className="text-muted">

                                    {item.appointmentTime}

                                </small>

                                <br />

                                <small>

                                    {item.purpose}

                                </small>

                            </div>

                            <span

                                className={`badge ${
                                    item.status === "CONFIRMED"
                                        ? "bg-success"
                                        : item.status === "SCHEDULED"
                                        ? "bg-warning text-dark"
                                        : item.status === "COMPLETED"
                                        ? "bg-primary"
                                        : item.status === "MISSED"
                                        ? "bg-danger"
                                        : "bg-secondary"
                                }`}

                            >

                                {item.status}

                            </span>

                        </div>

                    ))

                }

                <div className="text-end mt-3">

                    <button

                        className="btn btn-outline-primary btn-sm"

                        onClick={() =>

                            navigate(`/doctor/appointments/create/${mother.id}`)

                        }

                    >

                        Schedule Appointment

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

<div className="row">

    {/* Recent Notifications */}

    <div className="col-lg-6 mb-4">

        <div className="card shadow-sm border-0 h-100">

            <div className="card-header bg-warning">

                <FaBell className="me-2" />

                Recent Notifications

            </div>

            <div className="card-body">

                {

                    notifications.length === 0 ?

                    (

                        <div className="text-center py-5">

                            No notifications found.

                        </div>

                    )

                    :

                    notifications.slice(0, 5).map((item) => (

                        <div

                            key={item.id}

                            className="border-bottom py-3"

                        >

                            <div className="fw-bold">

                                {item.title}

                            </div>

                            <small className="text-muted">

                                {item.message}

                            </small>

                        </div>

                    ))

                }

                <div className="text-end mt-3">

                    <button

                        className="btn btn-outline-warning btn-sm"

                        onClick={() =>

                            navigate(`/doctor/notifications/create/${mother.id}`)

                        }

                    >

                        Send Notification

                    </button>

                </div>

            </div>

        </div>

    </div>

    {/* Quick Actions */}

    <div className="col-lg-6 mb-4">

        <div className="card shadow-sm border-0 h-100">

            <div className="card-header bg-dark text-white">

                ⚡ Quick Actions

            </div>

            <div className="card-body">

                <div className="row g-3">

                    <div className="col-6">

                        <button

                            className="btn btn-outline-danger w-100 py-4"

                            onClick={() =>

                                navigate(`/doctor/mothers/${mother.id}/recovery`)

                            }

                        >

                            ❤️

                            <br />

                            Recovery History

                        </button>

                    </div>

                    <div className="col-6">

                        <button

                            className="btn btn-outline-success w-100 py-4"

                            onClick={() =>

                                navigate(`/doctor/medications/create/${mother.id}`)

                            }

                        >

                            💊

                            <br />

                            Prescribe

                        </button>

                    </div>

                    <div className="col-6">

                        <button

                            className="btn btn-outline-primary w-100 py-4"

                            onClick={() =>

                                navigate(`/doctor/appointments/create/${mother.id}`)

                            }

                        >

                            📅

                            <br />

                            Appointment

                        </button>

                    </div>

                    <div className="col-6">

                        <button

                            className="btn btn-outline-warning w-100 py-4"

                            onClick={() =>

                                navigate(`/doctor/notifications/create/${mother.id}`)

                            }

                        >

                            🔔

                            <br />

                            Notify

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
        </DashboardLayout>

    );

}