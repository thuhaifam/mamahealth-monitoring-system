/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import appointmentService from "../../services/appointmentService";
import { toast } from "react-toastify";
export default function ManageAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {

        loadAppointments();

    }, []);

    async function loadAppointments() {

        try {

            const response =
                await appointmentService.getDoctorAppointments();

            setAppointments(response.data);

            setFilteredAppointments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function completeAppointment(id) {

    try {

        await appointmentService.completeAppointment(id);

        loadAppointments();

    }

    catch (error) {

        console.log(error);

    }

}

async function markMissed(id) {

    try {

        await appointmentService.markMissed(id);

        loadAppointments();

    }

    catch (error) {

        console.log(error);

    }

}

async function cancelAppointment(id) {

    try {

        await appointmentService.cancelAppointment(id);

        loadAppointments();

    }

    catch (error) {

        console.log(error);

    }

}

async function deleteAppointment(id) {

    if (!window.confirm("Delete this appointment?")) {

        return;

    }

    try {

        await appointmentService.deleteAppointment(id);

        toast.success("Appointment deleted successfully.");

        loadAppointments();

    }

    catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Unable to delete appointment."
        );

    }

}

    function filterAppointments(searchValue, status) {

        let results = appointments;

        if (searchValue !== "") {

            results = results.filter((appointment) =>

                appointment.motherName
                    ?.toLowerCase()
                    .includes(searchValue.toLowerCase())

            );

        }

        if (status !== "ALL") {

            results = results.filter(

                appointment => appointment.status === status

            );

        }

        setFilteredAppointments(results);

    }

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        Manage Appointments

                    </h2>

                    <p className="text-muted">

                        View and manage all appointments.

                    </p>

                </div>

            </div>

            <div className="row mb-3">

                <div className="col-md-6">

                    <input

                        className="form-control"

                        placeholder="Search mother..."

                        value={search}

                        onChange={(e) => {

                            setSearch(e.target.value);

                            filterAppointments(

                                e.target.value,

                                statusFilter

                            );

                        }}

                    />

                </div>

                <div className="col-md-3">

                    <select

                        className="form-select"

                        value={statusFilter}

                        onChange={(e) => {

                            setStatusFilter(e.target.value);

                            filterAppointments(

                                search,

                                e.target.value

                            );

                        }}

                    >

                        <option value="ALL">

                            All Status

                        </option>

                        <option value="SCHEDULED">

                            Scheduled

                        </option>

                        <option value="CONFIRMED">

                            Confirmed

                        </option>

                        <option value="COMPLETED">

                            Completed

                        </option>

                        <option value="MISSED">

                            Missed

                        </option>

                        <option value="CANCELLED">

                            Cancelled

                        </option>

                    </select>

                </div>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-light">

                                <tr>

                                    <th>Mother</th>

                                    <th>Date</th>

                                    <th>Time</th>

                                    <th>Purpose</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredAppointments.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-5"
                                            >

                                                No appointments found.

                                            </td>

                                        </tr>

                                    )

                                    :

                                    filteredAppointments.map((appointment) => (

                                        <tr key={appointment.id}>

                                            <td>

                                                <strong>

                                                    {appointment.motherName}

                                                </strong>

                                            </td>

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

                                                <span

                                                    className={`badge ${
                                                        appointment.status === "CONFIRMED"
                                                            ? "bg-success"
                                                            : appointment.status === "COMPLETED"
                                                            ? "bg-primary"
                                                            : appointment.status === "MISSED"
                                                            ? "bg-danger"
                                                            : appointment.status === "CANCELLED"
                                                            ? "bg-secondary"
                                                            : "bg-warning text-dark"
                                                    }`}

                                                >

                                                    {appointment.status}

                                                </span>

                                            </td>

                                            <td>

    {

        appointment.status === "SCHEDULED" &&

        <div className="d-flex gap-2">

            <button
                className="btn btn-warning btn-sm"
                onClick={() =>
                    navigate(
                        `/doctor/appointments/edit/${appointment.id}`
                    )
                }
            >
                Edit
            </button>

            <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                    cancelAppointment(appointment.id)
                }
            >
                Cancel
            </button>

        </div>

    }

    {

        appointment.status === "CONFIRMED" &&

        <div className="d-flex gap-2">

            <button
                className="btn btn-success btn-sm"
                onClick={() =>
                    completeAppointment(appointment.id)
                }
            >
                Complete
            </button>

            <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                    markMissed(appointment.id)
                }
            >
                Missed
            </button>

        </div>

    }

  {

    (appointment.status === "COMPLETED" ||

     appointment.status === "MISSED" ||

     appointment.status === "CANCELLED") &&

    <button

        className="btn btn-outline-danger btn-sm"

        onClick={() =>

            deleteAppointment(appointment.id)

        }

    >

        Delete

    </button>

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