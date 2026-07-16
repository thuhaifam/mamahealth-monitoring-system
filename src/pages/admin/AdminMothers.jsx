/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import adminService from "../../services/adminService";

export default function AdminMothers() {

    const navigate = useNavigate();

    const [mothers, setMothers] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadMothers();

    }, []);

    async function loadMothers() {

        try {

            const response =
                await adminService.getMothers();

            setMothers(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load mothers.");

        }

    }

    async function deactivateMother(id) {

        try {

            await adminService.deactivateMother(id);

            toast.success("Mother deactivated successfully.");

            loadMothers();

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to deactivate mother."

            );

        }

    }

    async function deleteMother(id) {

        if (

            !window.confirm(

                "Are you sure you want to permanently delete this mother?"

            )

        ) {

            return;

        }

        try {

            await adminService.deleteMother(id);

            toast.success("Mother deleted successfully.");

            loadMothers();

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to delete mother."

            );

        }

    }

    const filteredMothers = mothers.filter((mother) =>

        mother.fullName
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        (mother.email || "")
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        Manage Mothers

                    </h2>

                    <p className="text-muted">

                        View and manage registered mothers.

                    </p>

                </div>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <input

                        className="form-control mb-4"

                        placeholder="Search mother..."

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

                                    <th>Delivery Date</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredMothers.length === 0 ?

                                    (

                                        <tr>

                                            <td

                                                colSpan="5"

                                                className="text-center py-5"

                                            >

                                                No mothers found.

                                            </td>

                                        </tr>

                                    )

                                    :

                                    filteredMothers.map((mother) => (

                                        <tr key={mother.id}>

                                            <td>

                                                {mother.fullName}

                                            </td>

                                            <td>

                                                {mother.email}

                                            </td>

                                            <td>

                                                {mother.phoneNumber}

                                            </td>

                                            <td>

                                                {mother.deliveryDate}

                                            </td>

                                            <td>

                                                <div className="d-flex gap-2">

                                                    <button

                                                        className="btn btn-primary btn-sm"

                                                        onClick={() =>

                                                            navigate(

                                                                `/admin/mothers/${mother.id}`

                                                            )

                                                        }

                                                    >

                                                        View

                                                    </button>

                                                    {

                                                        mother.active ?

                                                        (

                                                            <button

                                                                className="btn btn-secondary btn-sm"

                                                                onClick={() =>

                                                                    deactivateMother(

                                                                        mother.id

                                                                    )

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

                                                            deleteMother(

                                                                mother.id

                                                            )

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