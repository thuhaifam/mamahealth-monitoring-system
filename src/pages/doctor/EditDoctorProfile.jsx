/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import doctorService from "../../services/doctorService";

export default function EditDoctorProfile() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({

        fullName: "",

        phoneNumber: "",

        specialization: "",

        licenseNumber: "",

        hospitalName: "",

        yearsOfExperience: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const response = await doctorService.getProfile();

            setForm(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to load profile.");

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await doctorService.updateProfile(form);

            toast.success("Profile updated successfully.");

            navigate("/doctor/profile");

        }

        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to update profile."

            );

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

            toast.success(

                "Profile deactivated successfully."

            );

            localStorage.removeItem("token");

            navigate("/login");

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Unable to deactivate profile."

            );

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

                        Edit Doctor Profile

                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Full Name

                                </label>

                                <input

                                    className="form-control"

                                    name="fullName"

                                    value={form.fullName}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Phone Number

                                </label>

                                <input

                                    className="form-control"

                                    name="phoneNumber"

                                    value={form.phoneNumber}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Specialization

                                </label>

                                <input

                                    className="form-control"

                                    name="specialization"

                                    value={form.specialization}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    License Number

                                </label>

                                <input

                                    className="form-control"

                                    name="licenseNumber"

                                    value={form.licenseNumber}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Hospital Name

                                </label>

                                <input

                                    className="form-control"

                                    name="hospitalName"

                                    value={form.hospitalName}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="form-label">

                                    Years of Experience

                                </label>

                                <input

                                    type="number"

                                    min="0"

                                    className="form-control"

                                    name="yearsOfExperience"

                                    value={form.yearsOfExperience}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                        </div>

                        <div className="d-flex justify-content-between">

                            <button
    className="btn btn-primary"
    onClick={() => navigate("/doctor/profile/edit")}
>
    Edit Profile
</button>

                            <button

                                type="button"

                                className="btn btn-danger"

                                onClick={handleDeactivate}

                            >

                                Deactivate Profile

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}