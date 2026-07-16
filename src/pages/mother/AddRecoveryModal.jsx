import { useState } from "react";
import recoveryService from "../../services/recoveryService";
import { toast } from "react-toastify";
import { isBlank, isNumericOnly } from "../../utils/validation";

export default function AddRecoveryModal({ onSuccess }) {

    const [formData, setFormData] = useState({

        painLevel: "",
        temperature: "",
        woundStatus: "",
        notes: ""

    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        // Prevent notes from being numbers-only while typing
        if (name === "notes") {
            if (isNumericOnly(value)) {
                toast.warning("Notes cannot be numbers only.");
                return;
            }
        }

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear field error when user edits
        setErrors((prev) => ({ ...prev, [name]: undefined }));

    };

    const handlePaste = (e) => {
        const paste = (e.clipboardData || window.clipboardData).getData("text");
        if (isNumericOnly(paste)) {
            e.preventDefault();
            toast.warning("Pasted content cannot be numbers only.");
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validation for Notes:
        // - Notes: required (must not be blank)
        // - Notes: must not be numbers only
        const newErrors = {};

        if (isBlank(formData.notes)) {
            newErrors.notes = "Notes is required.";
        } else if (isNumericOnly(formData.notes)) {
            newErrors.notes = "Notes cannot be numbers only.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // show first error as toast
            toast.warning(newErrors[Object.keys(newErrors)[0]]);
            return;
        }

        try {

            setLoading(true);

            await recoveryService.createRecovery(formData);

            toast.success("Recovery record added successfully.");

            onSuccess();

            document.getElementById("closeRecoveryModal").click();

            setFormData({

                painLevel: "",
                temperature: "",
                woundStatus: "",
                notes: ""

            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to save recovery."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="modal fade"
            id="addRecoveryModal"
            tabIndex="-1"
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title">

                                Add Recovery Record

                            </h5>

                            <button
                                id="closeRecoveryModal"
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Pain Level</label>

                                    <input
                                        name="painLevel"
                                        className="form-control"
                                        value={formData.painLevel}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Temperature</label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        name="temperature"
                                        className="form-control"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label>Wound Status</label>

                                    <input
                                        name="woundStatus"
                                        className="form-control"
                                        value={formData.woundStatus}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-12">

                                    <label>Notes</label>

                                    <textarea
                                        rows="4"
                                        name="notes"
                                        className={"form-control" + (errors.notes ? " is-invalid" : "")}
                                        value={formData.notes}
                                        onChange={handleChange}
                                        onPaste={handlePaste}
                                    />

                                    {errors.notes && (
                                        <div className="invalid-feedback">{errors.notes}</div>
                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >

                                {loading ? "Saving..." : "Save"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}