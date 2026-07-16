import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaPills, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'
import API from '../../api.js'

const DoctorMedications = () => {
  const navigate = useNavigate()
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMedications = async () => {
    try {
      const response = await API.get('/medications/doctor/me')
      if (response.data && response.data.success && response.data.data) {
        setMedications(response.data.data)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to retrieve medications.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedications()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this medication prescription?')) return
    try {
      const response = await API.delete(`/medications/${id}`)
      if (response.data && response.data.success) {
        toast.success('Medication prescription deleted.')
        fetchMedications()
      } else {
        toast.error(response.data.message || 'Failed to delete medication.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error deleting medication.')
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
          <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Prescribe Medications</h1>
          <span className="text-muted small">Manage prescriptions for postpartum mothers</span>
        </div>
        <button 
          className="btn btn-primary-custom d-flex align-items-center gap-2"
          onClick={() => navigate('/doctor/medications/create')}
        >
          <FaPlus />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Table List */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Active Prescriptions</h3>

        {medications.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Mother Patient</th>
                  <th>Medication Name</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Instructions</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med) => (
                  <tr key={med.id}>
                    <td className="text-white fw-bold">{med.motherName}</td>
                    <td className="text-white">{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.frequency}</td>
                    <td>{med.instructions || '-'}</td>
                    <td>
                      <span className={`badge ${med.status === 'COMPLETED' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {med.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary border-0"
                          onClick={() => navigate(`/doctor/medications/edit/${med.id}`)}
                          title="Edit Prescription"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger border-0"
                          onClick={() => handleDelete(med.id)}
                          title="Delete Prescription"
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
            <FaPills size={48} className="mb-3 opacity-30 text-secondary" />
            <div>No medications prescribed.</div>
          </div>
        )}
      </div>

    </div>
  )
}

export default DoctorMedications
