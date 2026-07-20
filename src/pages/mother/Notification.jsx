import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaBell, FaCheck, FaInfoCircle, FaPills, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa'
import API from '../../api.js'

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      const response = await API.get('/notifications/me')
      if (response.data && response.data.success && response.data.data) {
        // Sort notifications by date descending
        const sorted = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setNotifications(sorted)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load notifications.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleMarkAsRead = async (id) => {
    try {
      const response = await API.patch(`/notifications/${id}/read`)
      if (response.data && response.data.success) {
        toast.success('Notification marked as read.')
        fetchNotifications()
      } else {
        toast.error(response.data.message || 'Failed to mark as read.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error updating notification status.')
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'MEDICATION':
        return <FaPills className="text-warning" size={20} />
      case 'APPOINTMENT':
        return <FaCalendarAlt className="text-success" size={20} />
      case 'RECOVERY':
        return <FaHeartbeat className="text-danger" size={20} />
      default:
        return <FaInfoCircle className="text-primary-light" size={20} />
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
        <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Notification Center</h1>
        <span className="text-muted small">View clinical notifications and instructions from your healthcare providers</span>
      </div>

      {/* Main Panel */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-4" style={{ fontFamily: 'Outfit' }}>Inbox</h3>

        {notifications.length > 0 ? (
          <div className="row g-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="col-12">
                <div 
                  className="p-3 rounded-3 border d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: notif.status === 'UNREAD' ? 'rgba(108, 92, 231, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    borderColor: notif.status === 'UNREAD' ? 'rgba(108, 92, 231, 0.2)' : 'var(--border-color)',
                    transition: 'all 0.3s'
                  }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-white bg-opacity-5 p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h4 className="h6 text-white mb-0 fw-bold">{notif.title}</h4>
                        {notif.status === 'UNREAD' && (
                          <span className="badge bg-danger">New</span>
                        )}
                        <span className="badge bg-secondary text-uppercase" style={{ fontSize: '0.65rem' }}>{notif.type}</span>
                      </div>
                      <p className="text-muted mb-0 small">{notif.message}</p>
                      <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                        {new Date(notif.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {notif.status === 'UNREAD' && (
                    <button 
                      className="btn btn-sm btn-secondary-custom px-3 py-1 d-flex align-items-center gap-1"
                      onClick={() => handleMarkAsRead(notif.id)}
                      title="Mark as Read"
                    >
                      <FaCheck size={12} />
                      <span>Mark Read</span>
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <FaBell size={48} className="mb-3 opacity-30 text-secondary" />
            <div>No notifications found.</div>
            <p className="small">You will see alert cards here when your doctor broadcasts medication/check instructions.</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Notification
