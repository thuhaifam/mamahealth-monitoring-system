/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import motherService from "../../services/motherService";
import notificationService from "../../services/notificationService";

export default function CreateNotification() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mother, setMother] = useState(null);

    const [form, setForm] = useState({

        motherId: id,

        title: "",

        message: "",

        type: "GENERAL"

    });

    useEffect(() => {

        loadMother();

    }, []);

    async function loadMother() {

        try {

            const response = await motherService.getMotherById(id);

            setMother(response.data);

        }

        catch (error) {

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

            await notificationService.createNotification(form);

            toast.success("Notification sent successfully.");

            navigate(`/doctor/mothers/${id}`);

        }

        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to send notification."

            );

        }

    }

    return (

        <DashboardLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-warning">

                    <h3 className="mb-0">

                        Send Notification

                    </h3>

                </div>

                <div className="card-body">

                    <h5 className="mb-4">

                        Mother:

                        <strong>

                            {" "}

                            {mother?.fullName}

                        </strong>

                    </h5>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Title

                            </label>

                            <input

                                className="form-control"

                                name="title"

                                value={form.title}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Notification Type

                            </label>

                            <select

                                className="form-select"

                                name="type"

                                value={form.type}

                                onChange={handleChange}

                            >

                                <option value="GENERAL">

                                    General

                                </option>

                                <option value="MEDICATION">

                                    Medication

                                </option>

                                <option value="APPOINTMENT">

                                    Appointment

                                </option>

                                <option value="RECOVERY">

                                    Recovery

                                </option>

                            </select>

                        </div>

                        <div className="mb-4">

                            <label className="form-label">

                                Message

                            </label>

                            <textarea

                                rows="5"

                                className="form-control"

                                name="message"

                                value={form.message}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="d-flex gap-3">

                            <button

                                className="btn btn-warning"

                                type="submit"

                            >

                                Send Notification

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