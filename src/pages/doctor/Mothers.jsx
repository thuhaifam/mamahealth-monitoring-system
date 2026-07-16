/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import motherService from "../../services/motherService";

export default function Mothers() {

    const navigate = useNavigate();

    const [mothers, setMothers] = useState([]);

    const [filteredMothers, setFilteredMothers] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadMothers();

    }, []);

    async function loadMothers() {

        try {

            const response = await motherService.getAllMothers();
            console.log(response);
            setMothers(response.data);

            setFilteredMothers(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    function handleSearch(value) {

        setSearch(value);

        setFilteredMothers(

            mothers.filter((mother) =>

                mother.fullName
                    .toLowerCase()
                    .includes(value.toLowerCase())

            )

        );

    }

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        Mothers

                    </h2>

                    <p className="text-muted mb-0">

                        Manage all registered mothers.

                    </p>

                </div>

                <input

                    className="form-control"

                    placeholder="Search mother..."

                    style={{ width: 300 }}

                    value={search}

                    onChange={(e) =>

                        handleSearch(e.target.value)

                    }

                />

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-light">

                                <tr>

                                    <th>Name</th>

                                    <th>Phone</th>

                                    <th>Hospital</th>

                                    <th>Delivery Date</th>

                                    <th>Action</th>

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

                                                <strong>

                                                    {mother.fullName}

                                                </strong>

                                            </td>

                                            <td>

                                                {mother.phoneNumber}

                                            </td>

                                            <td>

                                                {mother.hospitalName}

                                            </td>

                                            <td>

                                                {mother.deliveryDate}

                                            </td>

                                            <td>

                                                <button

                                                    className="btn btn-primary btn-sm"

                                                    onClick={() =>

                                                        navigate(

                                                            `/doctor/mothers/${mother.id}`

                                                        )

                                                    }

                                                >

                                                    View Details

                                                </button>

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