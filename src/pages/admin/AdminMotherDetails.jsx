/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import adminService from "../../services/adminService";

export default function AdminMotherDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mother, setMother] = useState(null);

    useEffect(() => {

        loadMother();

    }, []);

    async function loadMother() {

        try {

            const response =
                await adminService.getMother(id);

            setMother(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <DashboardLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">

                        Mother Details

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <strong>Full Name</strong>

                            <p>{mother?.fullName}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Email</strong>

                            <p>{mother?.email}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Phone Number</strong>

                            <p>{mother?.phoneNumber}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Address</strong>

                            <p>{mother?.address}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Date of Birth</strong>

                            <p>{mother?.dateOfBirth}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Delivery Date</strong>

                            <p>{mother?.deliveryDate}</p>

                        </div>

                    </div>

                    <button
                        className="btn btn-secondary"
                        onClick={() =>
                            navigate("/admin/mothers")
                        }
                    >

                        Back

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}