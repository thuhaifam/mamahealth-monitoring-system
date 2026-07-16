import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUsers, FaHeartbeat, FaCalendarAlt, FaPills, FaEye } from 'react-icons/fa'
import API from '../../api.js'
import StatCard from '../../components/common/StatCard.jsx'

const DoctorDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [todayAppointments, setTodayAppointments] = useState([])
  const [recentRecoveries, setRecentRecoveries] = useState([])
  const [loading, setLoading] = useState(true)

  const loadDashboard = async () => {
    try {
      // 1. Load Stats
      try {
        const statsRes = await API.get('/doctors/dashboard')
        if (statsRes.data && statsRes.data.success) {
          setStats(statsRes.data.data)
        }
      } catch (err) {
        console.log('Error fetching stats.', err)
        // If doctor profile is not created yet, they'll get 404
        if (err.response && err.response.status === 404) {
          toast.warning('Please create your doctor profile first.')
          navigate('/doctor/create-profile')
          return
        }
      }

      // 2. Load Today's Appointments
      try {
        const appRes = await API.get('/appointments/today')
        if (appRes.data && appRes.data.success) {
          setTodayAppointments(appRes.data.data)
        }
      } catch (err) {
        console.log('Error loading today\'s appointments.', err)
      }

      // 3. Load Recent Recoveries
      try {
        const recRes = await API.get('/recovery/recent')
        if (recRes.data && recRes.data.success) {
          setRecentRecoveries(recRes.data.data)
        }
      } catch (err) {
        console.log('Error loading recent recoveries.', err)
      }

    } catch (error) {
      console.error(error)
      toast.error('Unexpected error loading dashboard.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      
      {/* Title */}
      <div className="mb-4">
        <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Doctor Dashboard</h1>
        <span className="text-muted small">Monitor maternal recovery metrics and manage clinic operations</span>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <StatCard 
            title="Total Patients (Mothers)"
            value={stats?.totalMothers || 0}
            icon={<FaUsers />}
            variant="primary"
            description="Active postpartum mothers"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Total Recovery Reports"
            value={stats?.recoveryReports || 0}
            icon={<FaHeartbeat />}
            variant="danger"
            description="Cumulative daily log records"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Active Prescriptions"
            value={stats?.activeMedications || 0}
            icon={<FaPills />}
            variant="success"
            description="Medications being monitored"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Upcoming Checkups"
            value={stats?.upcomingAppointments || 0}
            icon={<FaCalendarAlt />}
            variant="info"
            description="Total scheduled clinic visits"
          />
        </div>
      </div>

      <div className="row g-4">
        {/* Today's Appointments */}
        <div className="col-lg-6">
          <div className="premium-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-color pb-2">
              <h3 className="h5 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Today's Appointments</h3>
              <button className="btn btn-sm btn-secondary-custom" onClick={() => navigate('/doctor/appointments')}>
                Manage Schedule
              </button>
            </div>

            {todayAppointments.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-custom mb-0">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Time</th>
                      <th>Purpose</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.map((app) => (
                      <tr key={app.id}>
                        <td className="text-white fw-bold">{app.motherName}</td>
                        <td>{app.appointmentTime}</td>
                        <td>{app.purpose}</td>
                        <td>
                          <span className={`badge ${app.status === 'CONFIRMED' ? 'bg-success' : app.status === 'SCHEDULED' ? 'bg-warning text-dark' : 'bg-info'}`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-muted py-5">
                <FaCalendarAlt size={36} className="mb-2 opacity-30" />
                <div>No appointments scheduled for today.</div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Recovery Logs */}
        <div className="col-lg-6">
          <div className="premium-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-color pb-2">
              <h3 className="h5 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Recent Recovery Logs</h3>
              <button className="btn btn-sm btn-secondary-custom" onClick={() => navigate('/doctor/mothers')}>
                View Patients
              </button>
            </div>

            {recentRecoveries.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-custom mb-0">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Patient</th>
                      <th>Pain</th>
                      <th>Temp</th>
                      <th>Wound</th>
                      <th className="text-end">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRecoveries.slice(0, 5).map((rec) => (
                      <tr key={rec.id}>
                        <td>{rec.recordDate}</td>
                        <td className="text-white fw-bold">{rec.motherName || `Patient #${rec.motherId}`}</td>
                        <td>
                          <span className={`badge ${rec.painLevel > 6 ? 'bg-danger' : 'bg-success'}`}>
                            {rec.painLevel}/10
                          </span>
                        </td>
                        <td>{rec.bodyTemperature}°C</td>
                        <td>
                          <span className={`badge ${rec.woundCondition === 'NORMAL' ? 'bg-success' : 'bg-danger'}`}>
                            {rec.woundCondition}
                          </span>
                        </td>
                        <td className="text-end">
                          <button 
                            className="btn btn-sm btn-link text-primary-light p-0 border-0"
                            onClick={() => navigate(`/doctor/mothers/${rec.motherId}`)}
                            title="Monitor Patient"
                          >
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-muted py-5">
                <FaHeartbeat size={36} className="mb-2 opacity-30 text-danger" />
                <div>No recent recovery logs found.</div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
