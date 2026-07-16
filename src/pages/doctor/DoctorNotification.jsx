/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import notificationService from "../../services/notificationService";

export default function DoctorNotifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const totalNotifications = notifications.length;

    const totalRead = notifications.filter(
        n => n.status === "READ"
    ).length;

    const totalUnread = notifications.filter(
        n => n.status === "UNREAD"
    ).length;

    const filteredNotifications = notifications.filter((notification) => {

        const keyword = search.toLowerCase();

        return (

            notification.motherName?.toLowerCase().includes(keyword) ||

            notification.title?.toLowerCase().includes(keyword) ||

            notification.type?.toLowerCase().includes(keyword)

        );

    });

    useEffect(() => {

        loadNotifications();

    }, []);

     async function deleteNotification(id) {

    const confirmed = window.confirm(
        "Are you sure you want to delete this notification?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await notificationService.deleteNotification(id);

        toast.success(
            "Notification deleted successfully."
        );

        loadNotifications();

    }

    catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Unable to delete notification."
        );

    }

}

    async function loadNotifications() {

        try {

            const response =
                await notificationService.getDoctorNotifications();

            setNotifications(response.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load notifications.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <DashboardLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    Sent Notifications

                </h2>

                <p className="text-muted">

                    Track notifications sent to mothers and whether they have been read.

                </p>

            </div>

            {/* Search */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <input

                        type="text"

                        className="form-control"

                        placeholder="Search by mother, title or type..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

            </div>

            {/* Summary Cards */}

            <div className="row g-4 mb-4">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <h6 className="text-muted">

                                Total Notifications

                            </h6>

                            <h2 className="fw-bold text-primary">

                                {totalNotifications}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <h6 className="text-muted">

                                Read

                            </h6>

                            <h2 className="fw-bold text-success">

                                {totalRead}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <h6 className="text-muted">

                                Unread

                            </h6>

                            <h2 className="fw-bold text-warning">

                                {totalUnread}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* Notifications Table */}

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    {

                        loading ?

                        (

                            <div className="text-center py-5">

                                Loading...

                            </div>

                        )

                        :

                        filteredNotifications.length === 0 ?

                        (

                            <div className="text-center py-5">

                                <h5>

                                    No matching notifications found.

                                </h5>

                            </div>

                        )

                        :

                        (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-light">

                                        <tr>

                                            <th>Mother</th>

                                            <th>Title</th>

                                            <th>Type</th>

                                            <th>Status</th>

                                            <th>Read At</th>

                                            <th>Created</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            filteredNotifications.map((item) => (

                                                <tr key={item.id}>

                                                    <td>

                                                        <strong>

                                                            {item.motherName}

                                                        </strong>

                                                    </td>

                                                    <td>

                                                        {item.title}

                                                    </td>

                                                    <td>

                                                        <span className="badge bg-info">

                                                            {item.type}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {

                                                            item.status === "READ"

                                                            ?

                                                            <span className="badge bg-success">

                                                                ✓ Read

                                                            </span>

                                                            :

                                                            <span className="badge bg-warning text-dark">

                                                                Waiting

                                                            </span>

                                                        }

                                                    </td>

                                                    <td>

                                                        {

                                                            item.readAt

                                                            ?

                                                            new Date(item.readAt).toLocaleString()

                                                            :

                                                            "-"

                                                        }

                                                    </td>

                                                    <td>

                                                        {

                                                            new Date(item.createdAt).toLocaleString()

                                                        }

                                                    </td>

                                                    <td>

    <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => deleteNotification(item.id)}
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