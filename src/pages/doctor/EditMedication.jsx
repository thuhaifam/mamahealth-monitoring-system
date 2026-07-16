/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import medicationService from "../../services/medicationService";

export default function EditMedication() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({

        medicationName: "",

        dosage: "",

        frequency: "",

        startDate: "",

        endDate: "",

        instructions: ""

    });

    useEffect(() => {

        loadMedication();

    }, []);

    async function loadMedication() {

        try {

            const response =
                await medicationService.getMedication(id);

            setForm({

                medicationName:
                    response.data.medicationName,

                dosage:
                    response.data.dosage,

                frequency:
                    response.data.frequency,

                startDate:
                    response.data.startDate,

                endDate:
                    response.data.endDate,

                instructions:
                    response.data.instructions

            });

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load medication.");

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

            await medicationService.updateMedication(

                id,

                form

            );

            toast.success(

                "Medication updated successfully."

            );

            navigate("/doctor/medications");

        }

        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to update medication."

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

                <div className="card-header bg-warning">

                    <h3 className="mb-0">

                        Edit Medication

                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Medication Name

                                </label>

                                <input

                                    className="form-control"

                                    name="medicationName"

                                    value={form.medicationName}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Dosage

                                </label>

                                <input

                                    className="form-control"

                                    name="dosage"

                                    value={form.dosage}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Frequency

                                </label>

                                <input

                                    className="form-control"

                                    name="frequency"

                                    value={form.frequency}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label">

                                    Start Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="startDate"

                                    value={form.startDate}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label">

                                    End Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="endDate"

                                    value={form.endDate}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-12 mb-4">

                                <label className="form-label">

                                    Instructions

                                </label>

                                <textarea

                                    rows="4"

                                    className="form-control"

                                    name="instructions"

                                    value={form.instructions}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="d-flex gap-3">

                            <button

                                type="submit"

                                className="btn btn-warning"

                            >

                                Update Medication

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() =>

                                    navigate("/doctor/medications")

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