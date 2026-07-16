/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import appointmentService from "../../services/appointmentService";

export default function EditAppointment() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        motherId: "",

        appointmentDate: "",

        appointmentTime: "",

        purpose: "",

        notes: ""

    });

    useEffect(() => {

        loadAppointment();

    }, []);

    async function loadAppointment() {

        try {

            const response =
                await appointmentService.getAppointment(id);

            setFormData(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load appointment.");

        }

    }

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await appointmentService.updateAppointment(

                id,

                formData

            );

            toast.success(

                "Appointment updated successfully."

            );

            navigate("/doctor/appointments");

        }

        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to update appointment."

            );

        }

    }

    return (

        <DashboardLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">

                        Edit Appointment

                    </h3>

                </div>

                <div className="card-body">

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

                                    value={formData.appointmentDate}

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

                                    value={formData.appointmentTime}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Purpose

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="purpose"

                                    value={formData.purpose}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-12 mb-4">

                                <label className="form-label">

                                    Notes

                                </label>

                                <textarea

                                    className="form-control"

                                    rows="4"

                                    name="notes"

                                    value={formData.notes}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="d-flex gap-3">

                            <button

                                type="submit"

                                className="btn btn-primary"

                            >

                                Update Appointment

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() =>

                                    navigate("/doctor/appointments")

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