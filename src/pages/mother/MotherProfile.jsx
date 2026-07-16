/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import motherService from "../../services/motherService";
import { useAuth } from "../../context/AuthContext";
export default function MotherProfile() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState(null);

    const [hasProfile, setHasProfile] = useState(true);

    const [saving, setSaving] = useState(false);

    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

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

            setProfile(response.data);

            setHasProfile(true);

        } catch (error) {

            if (error.response?.status === 404) {

                setHasProfile(false);

            } else {

                toast.error("Unable to load profile.");

            }

        } finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleCreate(e) {

        e.preventDefault();

        try {

            setSaving(true);

            await motherService.createProfile(formData);

            toast.success("Profile created successfully.");

            await loadProfile();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to create profile."

            );

        } finally {

            setSaving(false);

        }

    }

    async function deactivateProfile() {

    try {

        await motherService.deleteProfile();

        toast.success("Profile deactivated successfully.");

        logout();

        navigate("/");

    } catch (error) {

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

    if (!hasProfile) {

        return (

            <DashboardLayout>

                <div className="container py-4">

                    <div className="card shadow border-0">

                        <div className="card-header bg-primary text-white">

                            <h3 className="mb-0">

                                Complete Your Profile

                            </h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleCreate}>

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
                                            required
                                        >

                                            <option value="">Select</option>

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
                                    className="btn btn-primary w-100"
                                    disabled={saving}
                                >

                                    {

                                        saving

                                            ? "Saving..."

                                            : "Create Profile"

                                    }

                                </button>

                            </form>

                        </div>

                    </div>

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

                            <p>{profile.fullName}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Phone Number</strong>

                            <p>{profile.phoneNumber}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Date of Birth</strong>

                            <p>{profile.dateOfBirth}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Blood Group</strong>

                            <p>{profile.bloodGroup}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Emergency Contact</strong>

                            <p>{profile.emergencyContact}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Delivery Date</strong>

                            <p>{profile.deliveryDate}</p>

                        </div>

                        <div className="col-md-12 mb-3">

                            <strong>Address</strong>

                            <p>{profile.address}</p>

                        </div>

                        <div className="col-md-12 mb-4">

                            <strong>Hospital</strong>

                            <p>{profile.hospitalName}</p>

                        </div>

                    </div>

                    <div className="d-flex gap-3">

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/mother/profile/edit")}
                        >

                            Edit Profile

                        </button>

                       <button
    className="btn btn-danger"
    onClick={() => setShowDeactivateModal(true)}
>
    Deactivate Profile
</button>

                    </div>

                </div>

            </div>

            {

    showDeactivateModal && (

        <div
            className="modal fade show"
            style={{
                display: "block",
                background: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title text-danger">

                            Deactivate Profile

                        </h5>

                    </div>

                    <div className="modal-body">

                        <p className="mb-2">

                            Are you sure you want to deactivate your profile?

                        </p>

                        <small className="text-muted">

                            You can contact the administrator if you need to reactivate it later.

                        </small>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowDeactivateModal(false)}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={deactivateProfile}
                        >

                            Deactivate

                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

        </DashboardLayout>

    );

}