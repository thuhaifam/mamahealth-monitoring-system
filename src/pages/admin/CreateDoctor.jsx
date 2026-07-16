import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import doctorService from "../../services/doctorService";

export default function CreateDoctor() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        fullName: "",

        phoneNumber: "",

        specialization: "",

        licenseNumber: "",

        hospitalName: "",

        yearsOfExperience: ""

    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await doctorService.createProfile(form);

            toast.success("Doctor created successfully.");

            navigate("/admin/doctors");

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to create doctor."

            );

        }

    }

    return (

        <DashboardLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">

                        Register New Doctor

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

                        <div className="d-flex gap-3">

                            <button

                                type="submit"

                                className="btn btn-primary"

                            >

                                Create Doctor

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() =>
                                    navigate("/admin/doctors")
                                }

                            >

                                Cancel

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}