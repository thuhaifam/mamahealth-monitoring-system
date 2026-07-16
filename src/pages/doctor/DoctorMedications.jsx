/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import medicationService from "../../services/medicationService";

export default function DoctorMedications() {

    const navigate = useNavigate();

    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadMedications();

    }, []);

    async function loadMedications() {

        try {

            const response =
                await medicationService.getDoctorMedications();

            setMedications(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load medications.");

        }

        finally {

            setLoading(false);

        }

    }

    async function deleteMedication(id) {

    const confirmed = window.confirm(

        "Delete this medication?"

    );

    if (!confirmed) {

        return;

    }

    try {

        await medicationService.deleteMedication(id);

        toast.success(

            "Medication deleted successfully."

        );

        loadMedications();

    }

    catch (error) {

        console.log(error);

        toast.error(

            error.response?.data?.message ||

            "Unable to delete medication."

        );

    }

}

    const filteredMedications = medications.filter(

        medication =>

            medication.motherName
                .toLowerCase()
                .includes(search.toLowerCase())

    );

    const totalMedications = medications.length;

    const completedMedications = medications.filter(

        medication => medication.status === "COMPLETED"

    ).length;

    const activeMedications = medications.filter(

        medication => medication.status === "PRESCRIBED"

    ).length;

    return (

        <DashboardLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    My Prescribed Medications

                </h2>

                <p className="text-muted">

                    View and manage medications prescribed to mothers.

                </p>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <h6 className="text-muted">

                                Total

                            </h6>

                            <h2 className="fw-bold text-primary">

                                {totalMedications}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <h6 className="text-muted">

                                Active

                            </h6>

                            <h2 className="fw-bold text-warning">

                                {activeMedications}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <h6 className="text-muted">

                                Completed

                            </h6>

                            <h2 className="fw-bold text-success">

                                {completedMedications}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="mb-3">

                        <input

                            className="form-control"

                            placeholder="Search mother..."

                            value={search}

                            onChange={(e) =>

                                setSearch(e.target.value)

                            }

                        />

                    </div>

                    {

                        loading ?

                        (

                            <div className="text-center py-5">

                                Loading...

                            </div>

                        )

                        :

                        filteredMedications.length === 0 ?

                        (

                            <div className="text-center py-5">

                                No medications found.

                            </div>

                        )

                        :

                        (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-light">

                                        <tr>

                                            <th>Mother</th>

                                            <th>Medication</th>

                                            <th>Dosage</th>

                                            <th>Frequency</th>

                                            <th>Start</th>

                                            <th>End</th>

                                            <th>Status</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            filteredMedications.map((item) => (

                                                <tr key={item.id}>

                                                    <td>

                                                        {item.motherName}

                                                    </td>

                                                    <td>

                                                        {item.medicationName}

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

                                                            item.status === "COMPLETED"

                                                            ?

                                                            <span className="badge bg-success">

                                                                Completed

                                                            </span>

                                                            :

                                                            <span className="badge bg-warning text-dark">

                                                                Prescribed

                                                            </span>

                                                        }

                                                    </td>

                                                    <td>

                                                        {

                                                            item.status === "PRESCRIBED"

                                                            &&

                                                            <button
    className="btn btn-warning btn-sm me-2"
    onClick={() =>
        navigate(
            `/doctor/medications/edit/${item.id}`
        )
    }
>

    Edit

</button>

                                                        }

                                                        <button

                                                            className="btn btn-danger btn-sm"

                                                            onClick={() =>

                                                                deleteMedication(item.id)

                                                            }

                                                        >

                                                            Delete

                                                        </button>

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