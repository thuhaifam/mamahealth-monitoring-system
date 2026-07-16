import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import recoveryService from "../../services/recoveryService";
import AddRecoveryOffcanvas from "./AddRecoveryOffcanvas";
export default function Recovery() {

    const [recoveries, setRecoveries] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadRecoveries() {

        try {

            setLoading(true);

            const response = await recoveryService.getRecoveryHistory();

            setRecoveries(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function deleteRecovery(id) {

    const confirmed = window.confirm(
        "Are you sure you want to delete this recovery record?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await recoveryService.deleteRecovery(id);

        loadRecoveries();

    }

    catch (error) {

        console.error(error);

    }

}

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadRecoveries();

    }, []);

    return (

        <>

            <DashboardLayout>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">

                            Recovery Records

                        </h2>

                        <p className="text-muted">

                            Track your recovery after delivery.

                        </p>

                    </div>

                    <button
                        className="btn btn-primary"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#addRecovery"
                    >

                        + Add Recovery

                    </button>

                </div>

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        {loading ? (

                            <div className="text-center py-5">

                                Loading...

                            </div>

                        ) : recoveries.length === 0 ? (

                            <div className="text-center py-5">

                                <h5>

                                    No recovery records found.

                                </h5>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-light">

                                        <tr>

                                            <th>Date</th>
                                            <th>Pain</th>
                                            <th>Temperature</th>
                                            <th>Wound</th>
                                            <th>Bleeding</th>
                                            <th>Mobility</th>
                                            <th>Medication</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {recoveries.map((record) => (

                                            <tr key={record.id}>

                                                <td>

                                                    {record.recordDate}

                                                </td>

                                                <td>

                                                    {record.painLevel}/10

                                                </td>

                                                <td>

                                                    {record.bodyTemperature}°C

                                                </td>

                                                <td>

                                                    {record.woundCondition}

                                                </td>

                                                <td>

                                                    {record.bleedingLevel}

                                                </td>

                                                <td>

                                                    {record.mobility}

                                                </td>

                                                <td>

                                                    {record.medicationTaken
                                                        ? "✅ Yes"
                                                        : "❌ No"}

                                                </td>

                                                <td>

                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteRecovery(record.id)}
                >

                    Delete

                </button>

            </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </DashboardLayout>

            <AddRecoveryOffcanvas
                onSuccess={loadRecoveries}
            />

        </>

    );

}