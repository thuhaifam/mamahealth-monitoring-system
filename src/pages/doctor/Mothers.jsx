import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUsers, FaEye, FaSearch } from 'react-icons/fa'
import API from '../../api.js'

const Mothers = () => {
  const navigate = useNavigate()
  const [mothers, setMothers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchMothers = async () => {
    try {
      const response = await API.get('/mothers/all')
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

  const filteredMothers = mothers.filter(mother => {
    const term = searchTerm.toLowerCase()
    return (
      mother.fullName.toLowerCase().includes(term) ||
      (mother.hospitalName && mother.hospitalName.toLowerCase().includes(term)) ||
      (mother.phoneNumber && mother.phoneNumber.includes(term))
    )
  })

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
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Enrolled Mothers</h1>
          <span className="text-muted small">Manage and monitor enrolled postpartum patient records</span>
        </div>
        
        {/* Search Bar */}
        <div className="input-group" style={{ maxWidth: '300px' }}>
          <span className="input-group-text bg-transparent border-end-0 border-color text-muted" style={{ borderRadius: '10px 0 0 10px' }}>
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control form-control-custom border-start-0"
            placeholder="Search by name, hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: '0 10px 10px 0' }}
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Patient Roster</h3>

        {filteredMothers.length > 0 ? (
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
                {filteredMothers.map((mother) => (
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
                        onClick={() => navigate(`/doctor/mothers/${mother.id}`)}
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
            <div>No enrolled mothers matching search query.</div>
          </div>
        )}
      </div>

    </div>
  )
}

export default Mothers
