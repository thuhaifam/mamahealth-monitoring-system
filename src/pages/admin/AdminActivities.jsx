import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaClipboardList } from 'react-icons/fa'
import API from '../../api.js'

const AdminActivities = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchActivities = async () => {
    try {
      const response = await API.get('/admin/activities')
      if (response.data && response.data.success && response.data.data) {
        setActivities(response.data.data)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load activity logs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
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
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>System Activity Audit Logs</h1>
        <span className="text-muted small">Chronological ledger of modifications performed by doctors</span>
      </div>

      {/* Main logs */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Activity Logs</h3>

        {activities.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Log Action / Event</th>
                  <th>Performed By (Doctor Email)</th>
                  <th>Execution Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act, index) => (
                  <tr key={index}>
                    <td className="text-white fw-bold">{act.activity}</td>
                    <td>{act.performedBy}</td>
                    <td>{new Date(act.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <FaClipboardList size={48} className="mb-3 opacity-30 text-secondary" />
            <div>No activities logged in the database yet.</div>
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminActivities
