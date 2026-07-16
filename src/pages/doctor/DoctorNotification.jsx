import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaBell, FaPlus, FaTrash } from 'react-icons/fa'
import API from '../../api.js'

const DoctorNotification = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      const response = await API.get('/notifications/doctor/me')
      if (response.data && response.data.success && response.data.data) {
        setNotifications(response.data.data)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to retrieve notification records.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this broadcast notification?')) return
    try {
      const response = await API.delete(`/notifications/${id}`)
      if (response.data && response.data.success) {
        toast.success('Notification deleted successfully.')
        fetchNotifications()
      } else {
        toast.error(response.data.message || 'Failed to delete notification.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error deleting notification.')
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
          <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Broadcasting Alerts</h1>
          <span className="text-muted small">Broadcast instructions or warnings to patient dashboards</span>
        </div>
        <button 
          className="btn btn-primary-custom d-flex align-items-center gap-2"
          onClick={() => navigate('/doctor/notifications/create')}
        >
          <FaPlus />
          <span>Broadcast Alert</span>
        </button>
      </div>

      {/* List */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Alert Logs</h3>

        {notifications.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Mother Patient</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Category</th>
                  <th>Read Status</th>
                  <th>Date Sent</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notif) => (
                  <tr key={notif.id}>
                    <td className="text-white fw-bold">{notif.motherName}</td>
                    <td className="text-white">{notif.title}</td>
                    <td>{notif.message}</td>
                    <td>
                      <span className="badge bg-secondary text-uppercase" style={{ fontSize: '0.7rem' }}>
                        {notif.type}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${notif.status === 'READ' ? 'bg-success' : 'bg-danger'}`}>
                        {notif.status}
                      </span>
                    </td>
                    <td>{new Date(notif.createdAt).toLocaleString()}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-link text-danger p-0 border-0"
                        onClick={() => handleDelete(notif.id)}
                        title="Delete Broadcast"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <FaBell size={48} className="mb-3 opacity-30 text-secondary" />
            <div>No alerts broadcasted yet.</div>
          </div>
        )}
      </div>

    </div>
  )
}

export default DoctorNotification
