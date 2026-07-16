import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCalendarAlt, FaPlus, FaCheck, FaTimes, FaBan, FaTrash, FaEdit } from 'react-icons/fa'
import API from '../../api.js'

const ManageAppointments = () => {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const response = await API.get('/appointments/doctor/me')
      if (response.data && response.data.success && response.data.data) {
        setAppointments(response.data.data)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to retrieve doctor appointments.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleMarkCompleted = async (id) => {
    try {
      const res = await API.patch(`/appointments/${id}/complete`)
      if (res.data && res.data.success) {
        toast.success('Appointment marked as completed.')
        fetchAppointments()
      }
    } catch (error) {
      toast.error('Error completing appointment.')
    }
  }

  const handleMarkMissed = async (id) => {
    try {
      const res = await API.patch(`/appointments/${id}/missed`)
      if (res.data && res.data.success) {
        toast.success('Appointment marked as missed.')
        fetchAppointments()
      }
    } catch (error) {
      toast.error('Error updating appointment.')
    }
  }

  const handleCancel = async (id) => {
    try {
      const res = await API.patch(`/appointments/${id}/cancel`)
      if (res.data && res.data.success) {
        toast.success('Appointment cancelled successfully.')
        fetchAppointments()
      }
    } catch (error) {
      toast.error('Error cancelling appointment.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return
    try {
      const res = await API.delete(`/appointments/${id}`)
      if (res.data && res.data.success) {
        toast.success('Appointment deleted successfully.')
        fetchAppointments()
      }
    } catch (error) {
      toast.error('Error deleting appointment.')
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Manage Appointments</h1>
          <span className="text-muted small">Schedule and process clinic consultations</span>
        </div>
        <button 
          className="btn btn-primary-custom d-flex align-items-center gap-2"
          onClick={() => navigate('/doctor/appointments/create')}
        >
          <FaPlus />
          <span>New Appointment</span>
        </button>
      </div>

      {/* List */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Scheduled Visitiations</h3>

        {appointments.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Mother Patient</th>
                  <th>Date & Time</th>
                  <th>Purpose</th>
                  <th>Hospital</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td className="text-white fw-bold">{appt.motherName}</td>
                    <td>{appt.appointmentDate} at {appt.appointmentTime}</td>
                    <td>{appt.purpose}</td>
                    <td>{appt.hospitalName}</td>
                    <td>
                      <span className={`badge ${
                        appt.status === 'CONFIRMED' ? 'bg-success' : 
                        appt.status === 'SCHEDULED' ? 'bg-warning text-dark' : 
                        appt.status === 'COMPLETED' ? 'bg-info' : 
                        appt.status === 'MISSED' ? 'bg-danger' : 'bg-secondary'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td>{appt.notes || '-'}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        {appt.status !== 'COMPLETED' && appt.status !== 'CANCELLED' && appt.status !== 'MISSED' && (
                          <>
                            <button 
                              className="btn btn-sm btn-outline-success border-0" 
                              onClick={() => handleMarkCompleted(appt.id)}
                              title="Mark Completed"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-warning border-0" 
                              onClick={() => handleMarkMissed(appt.id)}
                              title="Mark Missed"
                            >
                              <FaTimes />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-secondary border-0" 
                              onClick={() => handleCancel(appt.id)}
                              title="Cancel"
                            >
                              <FaBan />
                            </button>
                          </>
                        )}
                        <button 
                          className="btn btn-sm btn-outline-primary border-0" 
                          onClick={() => navigate(`/doctor/appointments/edit/${appt.id}`)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger border-0" 
                          onClick={() => handleDelete(appt.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <FaCalendarAlt size={48} className="mb-3 opacity-30 text-secondary" />
            <div>No appointments scheduled.</div>
          </div>
        )}
      </div>

    </div>
  )
}

export default ManageAppointments
