import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaCalendarAlt, FaCheck, FaHospital, FaUserMd, FaInfoCircle } from 'react-icons/fa'
import API from '../../api.js'

const Appointment = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const response = await API.get('/appointments/me')
      if (response.data && response.data.success && response.data.data) {
        // Sort appointments by date (newest/upcoming first)
        const sorted = response.data.data.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
        setAppointments(sorted)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load appointments.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleConfirm = async (id) => {
    try {
      const response = await API.patch(`/appointments/${id}/confirm`)
      if (response.data && response.data.success) {
        toast.success('Appointment attendance confirmed successfully!')
        fetchAppointments()
      } else {
        toast.error(response.data.message || 'Failed to confirm appointment.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error confirming appointment.')
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return <span className="badge bg-warning text-dark">Scheduled</span>
      case 'CONFIRMED':
        return <span className="badge bg-success">Confirmed</span>
      case 'COMPLETED':
        return <span className="badge bg-info">Completed</span>
      case 'CANCELLED':
        return <span className="badge bg-secondary">Cancelled</span>
      case 'MISSED':
        return <span className="badge bg-danger">Missed</span>
      default:
        return <span className="badge bg-dark">{status}</span>
    }
  }

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
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>My Appointments</h1>
        <span className="text-muted small">View your scheduled clinic visits and confirm attendance</span>
      </div>

      {/* Main List */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-4" style={{ fontFamily: 'Outfit' }}>Appointment List</h3>
        
        {appointments.length > 0 ? (
          <div className="row g-3">
            {appointments.map((app) => (
              <div key={app.id} className="col-md-6 col-lg-4">
                <div className="bg-white bg-opacity-5 p-3 rounded-3 border border-color d-flex flex-column justify-content-between h-100" style={{ transition: 'all 0.3s' }}>
                  
                  <div>
                    {/* Header info */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h4 className="h6 text-white mb-0 fw-bold">{app.purpose}</h4>
                      {getStatusBadge(app.status)}
                    </div>
                    
                    <div className="text-muted small mb-3">
                      {app.appointmentDate} at {app.appointmentTime}
                    </div>

                    <hr className="border-color my-2" />

                    <div className="small text-muted mb-3">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <FaUserMd className="text-primary-light" />
                        <span><strong>Doctor:</strong> {app.doctorName || 'Clinic Doctor'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <FaHospital className="text-success" />
                        <span><strong>Hospital:</strong> {app.hospitalName || 'Health Center'}</span>
                      </div>
                    </div>


                  </div>

                  {app.status === 'SCHEDULED' && (
                    <button 
                      className="btn btn-sm btn-primary-custom w-100 mt-3"
                      onClick={() => handleConfirm(app.id)}
                    >
                      <FaCheck className="me-2" />
                      Confirm Attendance
                    </button>
                  )}
                  {app.status === 'CONFIRMED' && (
                    <div className="alert alert-success p-2 mb-0 mt-3 text-center small">
                      Attendance Confirmed!
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <FaCalendarAlt size={48} className="mb-3 opacity-30 text-secondary" />
            <div>No appointments scheduled.</div>
            <p className="small">Your doctor will schedule appointments for you during your checks.</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Appointment
