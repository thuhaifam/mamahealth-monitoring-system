/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import motherService from "../../services/motherService";
import medicationService from "../../services/medicationService";

export default function CreateMedication() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mother, setMother] = useState(null);

    const [form, setForm] = useState({

        motherId: id,

        medicationName: "",

        dosage: "",

        frequency: "",

        startDate: "",

        endDate: "",

        instructions: ""

    });

    useEffect(() => {

        loadMother();

    }, []);

    async function loadMother() {

        try {

            const response = await motherService.getMotherById(id);

            setMother(response.data);

        } catch (error) {

            console.log(error);

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

            await medicationService.createMedication(form);

            toast.success("Medication prescribed successfully.");

            navigate(`/doctor/mothers/${id}`);

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to prescribe medication."

            );

        }

    }

    return (

        <DashboardLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-success text-white">

                    <h3 className="mb-0">

                        Prescribe Medication

                    </h3>

                </div>

                <div className="card-body">

                    <h5 className="mb-4">

                        Mother:

                        {" "}

                        <strong>

                            {mother?.fullName}

                        </strong>

                    </h5>

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

                                    className="form-control"

                                    rows="4"

                                    name="instructions"

                                    value={form.instructions}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="d-flex gap-3">

                            <button

                                type="submit"

                                className="btn btn-success"

                            >

                                Prescribe Medication

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() =>

                                    navigate(`/doctor/mothers/${id}`)

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