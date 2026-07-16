import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import doctorService from "../../services/doctorService";

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const response = await doctorService.getDoctorAppointments();
                setAppointments(response.data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadAppointments();
    }, []);

    return (
        <DashboardLayout>
            <div className="card border-0 shadow-sm" style={{ borderRadius: 20 }}>
                <div className="card-body">
                    <h4 className="fw-bold mb-3">My Appointments</h4>
                    <p className="text-muted">Manage your upcoming and scheduled consultations.</p>

                    {loading ? (
                        <div className="text-muted">Loading appointments…</div>
                    ) : appointments.length === 0 ? (
                        <div className="text-muted">No appointments found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Mother ID</th>
                                        <th>Purpose</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td>{appointment.appointmentDate}</td>
                                            <td>{appointment.appointmentTime}</td>
                                            <td>{appointment.motherId}</td>
                                            <td>{appointment.purpose || "Consultation"}</td>
                                            <td>
                                                <span className="badge bg-primary">{appointment.status}</span>
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
    );
}
