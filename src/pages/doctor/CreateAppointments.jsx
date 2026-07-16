/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import motherService from "../../services/motherService";
import appointmentService from "../../services/appointmentService";

export default function CreateAppointment() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mother, setMother] = useState(null);

    const [form, setForm] = useState({

        motherId: id,

        appointmentDate: "",

        appointmentTime: "",

        purpose: "",

        notes: ""

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

            await appointmentService.createAppointment(form);

            toast.success("Appointment scheduled successfully.");

            navigate(`/doctor/mothers/${id}`);

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to schedule appointment."

            );

        }

    }

    return (

        <DashboardLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">

                        Schedule Appointment

                    </h3>

                </div>

                <div className="card-body">

                    <h5 className="mb-4">

                        Mother:

                        <strong>

                            {" "}{mother?.fullName}

                        </strong>

                    </h5>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Appointment Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="appointmentDate"

                                    value={form.appointmentDate}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Appointment Time

                                </label>

                                <input

                                    type="time"

                                    className="form-control"

                                    name="appointmentTime"

                                    value={form.appointmentTime}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Purpose

                                </label>

                                <input

                                    className="form-control"

                                    name="purpose"

                                    value={form.purpose}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-12 mb-4">

                                <label className="form-label">

                                    Notes

                                </label>

                                <textarea

                                    rows="4"

                                    className="form-control"

                                    name="notes"

                                    value={form.notes}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="d-flex gap-3">

                            <button

                                className="btn btn-primary"

                                type="submit"

                            >

                                Schedule Appointment

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