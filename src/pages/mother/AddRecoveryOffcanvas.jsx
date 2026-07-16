import { useState } from "react";
import { toast } from "react-toastify";
import recoveryService from "../../services/recoveryService";

export default function AddRecoveryOffcanvas({ onSuccess }) {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        recordDate: "",
        painLevel: 1,
        bodyTemperature: "",
        woundCondition: "NORMAL",
        bleedingLevel: "NONE",
        mobility: "INDEPENDENT",
        medicationTaken: false,
        notes: ""

    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]: type === "checkbox"
                ? checked
                : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

console.log(formData);

await recoveryService.createRecovery(formData);
            toast.success("Recovery record saved successfully.");

            onSuccess();

            document
                .getElementById("closeRecovery")
                .click();

        } catch (error) {

    console.log(error.response);

    console.log(error.response?.data);

    toast.error("Failed");

}finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="addRecovery"
        >

            <div className="offcanvas-header">

                <h4>

                    Add Recovery Record

                </h4>

                <button
                    id="closeRecovery"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                ></button>

            </div>

            <div className="offcanvas-body">

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Record Date</label>

                        <input
                            type="date"
                            name="recordDate"
                            className="form-control"
                            value={formData.recordDate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Pain Level</label>

                        <input
                            type="number"
                            min="1"
                            max="10"
                            name="painLevel"
                            className="form-control"
                            value={formData.painLevel}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Body Temperature</label>

                        <input
                            type="number"
                            step="0.1"
                            name="bodyTemperature"
                            className="form-control"
                            value={formData.bodyTemperature}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Wound Condition</label>

                        <select
                            name="woundCondition"
                            className="form-select"
                            value={formData.woundCondition}
                            onChange={handleChange}
                        >

                            <option>NORMAL</option>
                            <option>REDNESS</option>
                            <option>SWELLING</option>
                            <option>DISCHARGE</option>
                            <option>BLEEDING</option>
                            <option>INFECTION</option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>Bleeding Level</label>

                        <select
                            name="bleedingLevel"
                            className="form-select"
                            value={formData.bleedingLevel}
                            onChange={handleChange}
                        >

                            <option>NONE</option>
                            <option>LIGHT</option>
                            <option>MODERATE</option>
                            <option>HEAVY</option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>Mobility</label>

                        <select
                            name="mobility"
                            className="form-select"
                            value={formData.mobility}
                            onChange={handleChange}
                        >

                            <option>INDEPENDENT</option>
                            <option>NEEDS_ASSISTANCE</option>
                            <option>BED_REST</option>

                        </select>

                    </div>

                    <div className="form-check mb-3">

                        <input
                            type="checkbox"
                            name="medicationTaken"
                            className="form-check-input"
                            checked={formData.medicationTaken}
                            onChange={handleChange}
                        />

                        <label className="form-check-label">

                            Medication Taken

                        </label>

                    </div>

                    <div className="mb-4">

                        <label>Notes</label>

                        <textarea
                            rows="4"
                            name="notes"
                            className="form-control"
                            value={formData.notes}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {loading ? "Saving..." : "Save Recovery"}

                    </button>

                </form>

            </div>

        </div>

    );

}