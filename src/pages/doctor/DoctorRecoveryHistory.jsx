import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaHeartbeat,
    FaThermometerHalf,
    FaWalking,
    FaCheckCircle
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";

import motherService from "../../services/motherService";
import recoveryService from "../../services/recoveryService";

export default function DoctorRecoveryHistory() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mother, setMother] = useState(null);

    const [recoveries, setRecoveries] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const [motherRes, recoveryRes] = await Promise.all([
                    motherService.getMotherById(id),
                    recoveryService.getMotherRecoveryHistory(id)
                ]);
                setMother(motherRes.data);
                setRecoveries(recoveryRes.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadData();
    }, [id]);

    if (!mother) {

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

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        Recovery History

                    </h2>

                    <p className="text-muted">

                        {mother.fullName}

                    </p>

                </div>

                <button

                    className="btn btn-secondary"

                    onClick={() =>

                        navigate(`/doctor/mothers/${id}`)

                    }

                >

                    <FaArrowLeft className="me-2" />

                    Back

                </button>

            </div>

            {

                recoveries.length === 0 ?

                (

                    <div className="card shadow border-0">

                        <div className="card-body text-center py-5">

                            <FaHeartbeat

                                size={50}

                                className="text-danger mb-3"

                            />

                            <h5>

                                No Recovery Records

                            </h5>

                            <p className="text-muted">

                                This mother has not submitted any recovery records.

                            </p>

                        </div>

                    </div>

                )

                :

               

                    recoveries.map((recovery) => (

    <div key={recovery.id} className="mb-4">

        {/* Recovery Indicator */}

        {
            recovery.recoveryIndicator === "IMPROVING" && (

                <div className="alert alert-success d-flex align-items-center">

                    <span className="fs-3 me-3">🟢</span>

                    <div>

                        <h5 className="mb-1 fw-bold">

                            Recovery Improving

                        </h5>

                        <small>

                            Recovery is progressing normally. Continue the current care plan.

                        </small>

                    </div>

                </div>

            )
        }

        {
            recovery.recoveryIndicator === "MONITOR" && (

                <div className="alert alert-warning d-flex align-items-center">

                    <span className="fs-3 me-3">🟡</span>

                    <div>

                        <h5 className="mb-1 fw-bold">

                            Monitor Recovery

                        </h5>

                        <small>

                            Mild symptoms detected. Continue monitoring closely.

                        </small>

                    </div>

                </div>

            )
        }

        {
            recovery.recoveryIndicator === "NEEDS_ATTENTION" && (

                <div className="alert alert-danger d-flex align-items-center">

                    <span className="fs-3 me-3">🔴</span>

                    <div>

                        <h5 className="mb-1 fw-bold">

                            Needs Immediate Attention

                        </h5>

                        <small>

                            Serious symptoms detected. Review this patient as soon as possible.

                        </small>

                    </div>

                </div>

            )
        }

        {/* Recovery Details */}

        <div className="card shadow-sm border-0">

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <strong>Pain Level</strong>

                        <p>

                            <FaHeartbeat className="text-danger me-2" />

                            {recovery.painLevel}/10

                        </p>

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>Temperature</strong>

                        <p>

                            <FaThermometerHalf className="text-warning me-2" />

                            {recovery.bodyTemperature}°C

                        </p>

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>Wound</strong>

                        <p>{recovery.woundCondition}</p>

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>Bleeding</strong>

                        <p>{recovery.bleedingLevel}</p>

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>Mobility</strong>

                        <p>

                            <FaWalking className="me-2" />

                            {recovery.mobility}

                        </p>

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>Medication</strong>

                        <p>

                            <FaCheckCircle className="text-success me-2" />

                            {recovery.medicationTaken ? "Taken" : "Not Taken"}

                        </p>

                    </div>

                    <div className="col-12">

                        <strong>Notes</strong>

                        <div className="border rounded p-3 bg-light">

                            {recovery.notes || "No notes provided."}

                        </div>

                    </div>

                </div>

            </div>

        </div>

        {/* Doctor Recommendation */}

        <div className="card border-0 shadow-sm mt-3">

            <div className="card-header bg-light">

                <h5 className="fw-bold mb-0">

                    Doctor Recommendation

                </h5>

            </div>

            <div className="card-body">

                {

                    recovery.recoveryIndicator === "IMPROVING" && (

                        <ul className="mb-0">

                            <li>Continue current medication.</li>

                            <li>Maintain wound hygiene.</li>

                            <li>Attend the next scheduled appointment.</li>

                        </ul>

                    )

                }

                {

                    recovery.recoveryIndicator === "MONITOR" && (

                        <ul className="mb-0">

                            <li>Monitor symptoms closely.</li>

                            <li>Review within 24–48 hours.</li>

                            <li>Schedule follow-up if necessary.</li>

                        </ul>

                    )

                }

                {

                    recovery.recoveryIndicator === "NEEDS_ATTENTION" && (

                        <ul className="mb-0">

                            <li>Prescribe appropriate medication.</li>

                            <li>Schedule an urgent appointment.</li>

                            <li>Send an immediate notification to the mother.</li>

                        </ul>

                    )

                }

            </div>

        </div>

    </div>

))

                

            }

        </DashboardLayout>

    );

}