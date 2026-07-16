/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import appointmentService from "../../services/appointmentService";

export default function Appointments() {

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAppointments();

    }, []);

    async function loadAppointments() {

        try {

            const response =
                await appointmentService.getMyAppointments();

            setAppointments(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load appointments.");

        } finally {

            setLoading(false);

        }

    }

    async function confirmAppointment(id) {

    try {

        await appointmentService.confirmAppointment(id);

        toast.success("Appointment confirmed successfully.");

        loadAppointments();

    }

    catch (error) {

        console.log(error);

        toast.error(

            error.response?.data?.message ||

            "Unable to confirm appointment."

        );

    }

}

    return (

        <DashboardLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    My Appointments

                </h2>

                <p className="text-muted">

                    View your upcoming appointments.

                </p>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    {

                        loading ?

                            (

                                <div className="text-center py-5">

                                    Loading...

                                </div>

                            )

                            :

                            appointments.length === 0 ?

                                (

                                    <div className="text-center py-5">

                                        <h5>

                                            No appointments found.

                                        </h5>

                                    </div>

                                )

                                :

                                (

                                    <div className="table-responsive">

                                        <table className="table table-hover align-middle">

                                            <thead className="table-light">

                                                <tr>

                                                    <th>Date</th>

                                                    <th>Time</th>

                                                    <th>Purpose</th>

                                                    <th>Notes</th>

                                                    <th>Status</th>
                                                    <th>Action</th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {

                                                    appointments.map((appointment) => (

                                                        <tr key={appointment.id}>

                                                            <td>

                                                                {appointment.appointmentDate}

                                                            </td>

                                                            <td>

                                                                {appointment.appointmentTime}

                                                            </td>

                                                            <td>

                                                                {appointment.purpose}

                                                            </td>

                                                            <td>

                                                                {appointment.notes || "-"}

                                                            </td>

                                                            <td>

    {

        appointment.status === "SCHEDULED" &&

        <span className="badge bg-warning text-dark">

            Scheduled

        </span>

    }

    {

        appointment.status === "CONFIRMED" &&

        <span className="badge bg-info">

            Confirmed

        </span>

    }

    {

        appointment.status === "COMPLETED" &&

        <span className="badge bg-success">

            Completed

        </span>

    }

    {

        appointment.status === "MISSED" &&

        <span className="badge bg-danger">

            Missed

        </span>

    }

    {

        appointment.status === "CANCELLED" &&

        <span className="badge bg-secondary">

            Cancelled

        </span>

    }

</td>
<td>

    {

        appointment.status === "SCHEDULED" &&

        <button

            className="btn btn-primary btn-sm"

            onClick={() =>

                confirmAppointment(appointment.id)

            }

        >

            Confirm Attendance

        </button>

    }

    {

        appointment.status === "CONFIRMED" &&

        <span className="text-success fw-bold">

            ✓ Attendance Confirmed

        </span>

    }

    {

        appointment.status === "COMPLETED" &&

        <span className="text-success">

            Visit Completed

        </span>

    }

    {

        appointment.status === "MISSED" &&

        <span className="text-danger">

            Appointment Missed

        </span>

    }

    {

        appointment.status === "CANCELLED" &&

        <span className="text-muted">

            Cancelled

        </span>

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

        </DashboardLayout>

    );

}