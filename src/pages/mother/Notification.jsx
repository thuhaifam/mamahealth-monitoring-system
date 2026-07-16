/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import notificationService from "../../services/notificationService";

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadNotifications();

    }, []);

    async function loadNotifications() {

        try {

            const response =
                await notificationService.getMyNotifications();

            setNotifications(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load notifications.");

        } finally {

            setLoading(false);

        }

    }

    async function markAsRead(id) {

        try {

            await notificationService.markAsRead(id);

            toast.success("Notification marked as read.");

            loadNotifications();

        } catch (error) {

            console.error(error);

            toast.error("Failed to update notification.");

        }

    }

   

 

    return (

        <DashboardLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    My Notifications

                </h2>

                <p className="text-muted">

                    Stay updated with important messages from your doctor and administrators.

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

                            notifications.length === 0 ?

                                (

                                    <div className="text-center py-5">

                                        <h5>

                                            No notifications found.

                                        </h5>

                                    </div>

                                )

                                :

                                (

                                    <div className="table-responsive">

                                        <table className="table table-hover align-middle">

                                            <thead className="table-light">

                                                <tr>

                                                    <th>Title</th>

                                                    <th>Message</th>

                                                    <th>Type</th>

                                                    <th>Date</th>

                                                    <th>Status</th>
                                                    <th>Action</th>

                                                </tr>

                                            </thead>

                                            <tbody>

    {

        notifications.map((item) => (

            <tr key={item.id}>

                <td>

                    <strong>

                        {item.title}

                    </strong>

                </td>

                <td>

                    {item.message}

                </td>

                <td>

                    {item.type}

                </td>

                <td>

                    {item.createdAt}

                </td>

                <td>

                    {

                        item.status === "READ" ?

                        (

                            <span className="badge bg-success">

                                Read

                            </span>

                        )

                        :

                        (

                            <span className="badge bg-warning text-dark">

                                Unread

                            </span>

                        )

                    }

                    {

                        item.status === "READ" && item.readAt &&

                        <div>

                            <small className="text-muted">

                                {new Date(item.readAt).toLocaleString()}

                            </small>

                        </div>

                    }

                </td>

                <td>

                    {

                        item.status === "UNREAD" &&

                        <button

                            className="btn btn-success btn-sm me-2"

                            onClick={() => markAsRead(item.id)}

                        >

                            Mark as Read

                        </button>

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