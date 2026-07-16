/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import adminService from "../../services/adminService";

export default function AdminActivities() {

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadActivities();

    }, []);

    async function loadActivities() {

        try {

            const response =
                await adminService.getActivities();

            setActivities(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <DashboardLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    System Activity Log

                </h2>

                <p className="text-muted">

                    Recent activities performed in MamaHealth.

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

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>Activity</th>

                                        <th>Performed By</th>

                                        <th>Date</th>

                                        <th>Time</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        activities.length === 0 ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="4"

                                                    className="text-center py-5"

                                                >

                                                    No activities found.

                                                </td>

                                            </tr>

                                        )

                                        :

                                        activities.map((activity, index) => (

                                            <tr key={index}>

                                                <td>

                                                    {activity.activity}

                                                </td>

                                                <td>

                                                    {activity.performedBy}

                                                </td>

                                                <td>

                                                    {

                                                        new Date(activity.createdAt)

                                                            .toLocaleDateString()

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        new Date(activity.createdAt)

                                                            .toLocaleTimeString()

                                                    }

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    }

                </div>

            </div>

        </DashboardLayout>

    );

}