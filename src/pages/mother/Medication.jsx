import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import medicationService from "../../services/medicationService";

export default function Medication() {

    const [medications, setMedications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadMedications();

    }, []);

    async function loadMedications() {

        try {

            const response =
                await medicationService.getMyMedications();

setMedications(response.data);
        } catch (error) {

            console.error(error);

            toast.error("Failed to load medications.");

        } finally {

            setLoading(false);

        }

    }

    async function markCompleted(id) {

        try {

            await medicationService.markCompleted(id);

            toast.success("Medication marked as completed.");

            loadMedications();

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to complete medication."

            );

        }

    }

    return (

        <DashboardLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    My Medications

                </h2>

                <p className="text-muted">

                    View all medications prescribed by your doctor.

                </p>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    {

                        loading ?

                            (

                                <div className="text-center py-5">

                                    Loading...

                                </div>

                            )

                            :

                            medications.length === 0 ?

                                (

                                    <div className="text-center py-5">

                                        <h5>

                                            No medications available.

                                        </h5>

                                    </div>

                                )

                                :

                                (

                                    <div className="table-responsive">

                                        <table className="table table-hover align-middle">

                                            <thead className="table-light">

                                                <tr>

                                                    <th>Medication</th>

                                                    <th>Dosage</th>

                                                    <th>Frequency</th>

                                                    <th>Start Date</th>

                                                    <th>End Date</th>

                                                    <th>Status</th>

                                                    <th>Action</th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {

                                                    medications.map((item) => (

                                                        <tr key={item.id}>

                                                            <td>

                                                                <strong>

                                                                    {item.medicationName}

                                                                </strong>

                                                                <br />

                                                                <small className="text-muted">

                                                                    {item.instructions}

                                                                </small>

                                                            </td>

                                                            <td>

                                                                {item.dosage}

                                                            </td>

                                                            <td>

                                                                {item.frequency}

                                                            </td>

                                                            <td>

                                                                {item.startDate}

                                                            </td>

                                                            <td>

                                                                {item.endDate}

                                                            </td>

                                                            <td>

    {

        item.status === "COMPLETED" ?

        (

            <span className="badge bg-success">

                Completed

            </span>

        )

        :

        item.status === "STOPPED" ?

        (

            <span className="badge bg-danger">

                Stopped

            </span>

        )

        :

        (

            <span className="badge bg-warning text-dark">

                Active

            </span>

        )

    }

</td>

                                                            <td>

    {

        item.status === "ACTIVE" &&

        (

            <button

                className="btn btn-success btn-sm"

                onClick={() => markCompleted(item.id)}

            >

                Mark Completed

            </button>

        )

    }

</td>

                                                        </tr>

                                                    ))

                                                }

                                            </tbody>

                                        </table>

                                    </div>

                                )

                    }

                </div>

            </div>

        </DashboardLayout>

    );

}