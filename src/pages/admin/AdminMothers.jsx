import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUsers, FaEye } from 'react-icons/fa'
import API from '../../api.js'

const AdminMothers = () => {
  const navigate = useNavigate()
  const [mothers, setMothers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMothers = async () => {
    try {
      const response = await API.get('/admin/mothers')
      if (response.data && response.data.success && response.data.data) {
        setMothers(response.data.data)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load mothers list.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMothers()
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
        <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Enrolled Mothers</h1>
        <span className="text-muted small">Overview of all active postpartum patient records across hospitals</span>
      </div>

      {/* Table Card */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Patient Directory</h3>

        {mothers.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Contact Phone</th>
                  <th>Email Address</th>
                  <th>Blood Group</th>
                  <th>Delivery Date</th>
                  <th>Registered Hospital</th>
                  <th className="text-end">Monitor</th>
                </tr>
              </thead>
              <tbody>
                {mothers.map((mother) => (
                  <tr key={mother.id}>
                    <td className="text-white fw-bold">{mother.fullName}</td>
                    <td>{mother.phoneNumber}</td>
                    <td>{mother.email}</td>
                    <td>{mother.bloodGroup}</td>
                    <td>{mother.deliveryDate}</td>
                    <td>{mother.hospitalName || '-'}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-primary-custom d-inline-flex align-items-center gap-1 py-1"
                        onClick={() => navigate(`/admin/mothers/${mother.id}`)}
                        title="View Medical File"
                      >
                        <FaEye size={12} />
                        <span>View File</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <FaUsers size={48} className="mb-3 opacity-30 text-secondary" />
            <div>No postpartum mothers enrolled in the database.</div>
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminMothers
