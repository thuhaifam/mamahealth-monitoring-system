import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorProfile from "../pages/doctor/DoctorProfile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Recovery from "../pages/mother/Recovery";
import Mothers from "../pages/doctor/Mothers";
import MotherDetails from "../pages/doctor/MotherDetails";
import MotherDashboard from "../pages/mother/MotherDashboard";
import Medication from "../pages/mother/Medication";
import Appointments from "../pages/mother/Appointment";
import Notifications from "../pages/mother/Notification";
import MotherProfile from "../pages/mother/MotherProfile";
import EditMotherProfile from "../pages/mother/EditMotherProfile";
import CreateMedication from "../pages/doctor/CreateMedication";
import CreateAppointment from "../pages/doctor/CreateAppointments";
import CreateNotification from "../pages/doctor/CreateNotification";
import CreateDoctorProfile from "../pages/doctor/CreateDoctorProfile";
import DoctorRecoveryHistory from "../pages/doctor/DoctorRecoveryHistory";
import ManageAppointments from "../pages/doctor/ManageAppointments";
import EditAppointment from "../pages/doctor/EditAppointment";
import DoctorAppointmentDetails from "../pages/doctor/DoctorAppointmentDetails";
import EditDoctorProfile from "../pages/doctor/EditDoctorProfile";
import DoctorNotification from "../pages/doctor/DoctorNotification";
import EditMedication from "../pages/doctor/EditMedication";
import DoctorMedications from "../pages/doctor/DoctorMedications";
import AdminDoctors from "../pages/admin/AdminDoctors";
import CreateDoctor from "../pages/admin/CreateDoctor";
import EditDoctor from "../pages/admin/EditDoctor";
import AdminMothers from "../pages/admin/AdminMothers";
import AdminMotherDetails from "../pages/admin/AdminMotherDetails";
import AdminReports from "../pages/admin/AdminReports";
import AdminActivities from "../pages/admin/AdminActivities";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Authentication */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                {/* Mother */}

<Route
    path="/mother/dashboard"
    element={
        <ProtectedRoute
            allowedRoles={["MOTHER"]}
        >
            <MotherDashboard />
        </ProtectedRoute>
    }
/>


<Route

    path="/mother/profile"

    element={<MotherProfile />}

/>

<Route
    path="/mother/profile/edit"
    element={<EditMotherProfile />}
/>

<Route
    path="/mother/recovery"
    element={<Recovery />}
/>
<Route
    path="/mother/medication"
    element={<Medication />}
/>

<Route
    path="/mother/appointments"
    element={<Appointments />}
/>

<Route
    path="/mother/notifications"
    element={<Notifications />}
/>

                {/* Doctor */}

                <Route
    path="/doctor/dashboard"
    element={
        <ProtectedRoute
            allowedRoles={["DOCTOR"]}
        >
            <DoctorDashboard />
        </ProtectedRoute>
    }
/>

                 <Route
    path="/doctor/profile"
    element={<DoctorProfile />}
/>

<Route
    path="/doctor/profile/create"
    element={<CreateDoctorProfile />}
/>
<Route
    path="/doctor/profile/edit"
    element={<EditDoctorProfile />}
/>

<Route
    path="/doctor/medications"
    element={<DoctorMedications />}
/>

<Route
    path="/doctor/medications/edit/:id"
    element={<EditMedication />}
/>
<Route
    path="/doctor/notifications"
    element={<DoctorNotification />}
/>  

<Route

    path="/doctor/mothers"

    element={<Mothers />}

/>

<Route
    path="/doctor/mothers/:id"
    element={<MotherDetails />}
/>
<Route
    path="/doctor/mothers/:id/recovery"
    element={<DoctorRecoveryHistory />}
/>
<Route
    path="/doctor/medications/create/:id"
    element={<CreateMedication />}
/>

<Route
    path="/doctor/appointments/create/:id"
    element={<CreateAppointment />}
/>

<Route
    path="/doctor/notifications/create/:id"
    element={<CreateNotification />}
/>

<Route
    path="/doctor/appointments"
    element={<ManageAppointments />}
/>
               
<Route
    path="/doctor/appointments/edit/:id"
    element={<EditAppointment />}
/>

<Route
    path="/doctor/appointments/:id"
    element={<DoctorAppointmentDetails />}
/>

       

                {/* Admin */}

<Route
    path="/admin/dashboard"
    element={
        <ProtectedRoute
            allowedRoles={["ADMIN"]}
        >
            <AdminDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/doctors"
    element={<AdminDoctors />}
/>

<Route
    path="/admin/doctors/create"
    element={<CreateDoctor />}
/>

<Route
    path="/admin/doctors/edit/:id"
    element={<EditDoctor />}
/>

<Route
    path="/admin/mothers"
    element={<AdminMothers />}
/>

<Route
    path="/admin/mothers/:id"
    element={<AdminMotherDetails />}
/>

<Route
    path="/admin/reports"
    element={<AdminReports />}
/>

<Route
    path="/admin/activities"
    element={<AdminActivities />}
/>



            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;