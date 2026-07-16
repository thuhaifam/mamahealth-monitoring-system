/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import doctorService from "../../services/doctorService";

export default function DoctorProfile() {

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const response = await doctorService.getProfile();

            setDoctor(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load profile.");

        }

        finally {

            setLoading(false);

        }

    }

    async function handleDeactivate() {

        const confirmed = window.confirm(

            "Are you sure you want to deactivate your profile?"

        );

        if (!confirmed) {

            return;

        }

        try {

            await doctorService.deactivateProfile();

            toast.success("Profile deactivated successfully.");

            localStorage.removeItem("token");

            navigate("/");

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to deactivate profile.");

        }

    }

    if (loading) {

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

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">

                        My Profile

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <strong>Full Name</strong>

                            <p>{doctor.fullName}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Phone Number</strong>

                            <p>{doctor.phoneNumber}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Specialization</strong>

                            <p>{doctor.specialization}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>License Number</strong>

                            <p>{doctor.licenseNumber}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Hospital</strong>

                            <p>{doctor.hospitalName}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Years of Experience</strong>

                            <p>{doctor.yearsOfExperience}</p>

                        </div>

                    </div>

                    <hr />

                    <div className="d-flex gap-2">

                        <button

                            className="btn btn-primary"

                            onClick={() => navigate("/doctor/profile/edit")}

                        >

                            Edit Profile

                        </button>

                        <button

                            className="btn btn-danger"

                            onClick={handleDeactivate}

                        >

                            Deactivate Profile

                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}