/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import adminService from "../../services/adminService";

export default function AdminDoctors() {

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadDoctors();

    }, []);

    async function loadDoctors() {

        try {

            const response =
                await adminService.getDoctors();

            setDoctors(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load doctors.");

        }

    }

    async function deactivateDoctor(id) {

        try {

            await adminService.deactivateDoctor(id);

            toast.success("Doctor deactivated successfully.");

            loadDoctors();

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to deactivate doctor."

            );

        }

    }

    async function deleteDoctor(id) {

        if (

            !window.confirm(

                "Are you sure you want to permanently delete this doctor?"

            )

        ) {

            return;

        }

        try {

            await adminService.deleteDoctor(id);

            toast.success("Doctor deleted successfully.");

            loadDoctors();

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to delete doctor."

            );

        }

    }

    const filteredDoctors = doctors.filter((doctor) =>

        doctor.fullName
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        (doctor.email || "")
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        Manage Doctors

                    </h2>

                    <p className="text-muted">

                        View and manage registered doctors.

                    </p>

                </div>

                <button

                    className="btn btn-primary"

                    onClick={() =>

                        navigate("/admin/doctors/create")

                    }

                >

                    + Add Doctor

                </button>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <input

                        className="form-control mb-4"

                        placeholder="Search doctor..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-light">

                                <tr>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Hospital</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredDoctors.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center py-5"
                                            >

                                                No doctors found.

                                            </td>

                                        </tr>

                                    )

                                    :

                                    filteredDoctors.map((doctor) => (

                                        <tr key={doctor.id}>

                                            <td>

                                                {doctor.fullName}

                                            </td>

                                            <td>

                                                {doctor.email}

                                            </td>

                                            <td>

                                                {doctor.phoneNumber}

                                            </td>

                                            <td>

                                                {doctor.hospitalName}

                                            </td>

                                            <td>

                                                <div className="d-flex gap-2">

                                                    <button

                                                        className="btn btn-warning btn-sm"

                                                        onClick={() =>

                                                            navigate(

                                                                `/admin/doctors/edit/${doctor.id}`

                                                            )

                                                        }

                                                    >

                                                        Edit

                                                    </button>

                                                    {

                                                        doctor.active ?

                                                        (

                                                            <button

                                                                className="btn btn-secondary btn-sm"

                                                                onClick={() =>

                                                                    deactivateDoctor(doctor.id)

                                                                }

                                                            >

                                                                Deactivate

                                                            </button>

                                                        )

                                                        :

                                                        (

                                                            <span className="badge bg-secondary">

                                                                Inactive

                                                            </span>

                                                        )

                                                    }

                                                    <button

                                                        className="btn btn-danger btn-sm"

                                                        onClick={() =>

                                                            deleteDoctor(doctor.id)

                                                        }

                                                    >

                                                        Delete

                                                    </button>

                                                </div>

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