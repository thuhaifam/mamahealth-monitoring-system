/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import motherService from "../../services/motherService";

export default function EditMotherProfile() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        fullName: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
        bloodGroup: "",
        emergencyContact: "",
        deliveryDate: "",
        hospitalName: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const response = await motherService.getProfile();

            setFormData(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load profile.");

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

            setLoading(true);

            await motherService.updateProfile(formData);

            toast.success("Profile updated successfully.");

            navigate("/mother/profile");

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to update profile."

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <DashboardLayout>

            <div className="container py-4">

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h3>Edit Profile</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Full Name</label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Phone Number</label>

                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Date of Birth</label>

                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        className="form-control"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Blood Group</label>

                                    <select
                                        name="bloodGroup"
                                        className="form-select"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                    >

                                        <option>A+</option>
                                        <option>A-</option>
                                        <option>B+</option>
                                        <option>B-</option>
                                        <option>AB+</option>
                                        <option>AB-</option>
                                        <option>O+</option>
                                        <option>O-</option>

                                    </select>

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label>Address</label>

                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Emergency Contact</label>

                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        className="form-control"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Delivery Date</label>

                                    <input
                                        type="date"
                                        name="deliveryDate"
                                        className="form-control"
                                        value={formData.deliveryDate}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-12 mb-4">

                                    <label>Hospital Name</label>

                                    <input
                                        type="text"
                                        name="hospitalName"
                                        className="form-control"
                                        value={formData.hospitalName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <button

                                className="btn btn-primary"

                                disabled={loading}

                            >

                                {loading ? "Updating..." : "Update Profile"}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}