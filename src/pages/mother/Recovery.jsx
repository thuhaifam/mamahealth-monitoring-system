import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaHeartbeat, FaPlus, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import API from '../../api.js'
import Swal from 'sweetalert2'
import AddRecoveryModal from './AddRecoveryModal.jsx'

const Recovery = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchHistory = async () => {
    try {
      const response = await API.get('/recovery/me/history')
      if (response.data && response.data.success && response.data.data) {
        // Sort history by date descending (most recent first) for display
        const sorted = response.data.data.sort((a, b) => new Date(b.recordDate) - new Date(a.recordDate))
        setHistory(sorted)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load recovery history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this recovery record?",
      icon: 'warning',
      showCancelButton: true,
      background: '#1a152e',
      color: '#fff',
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#4b5563',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await API.delete(`/recovery/${id}`)
          if (response.data && response.data.success) {
            toast.success('Record deleted successfully.')
            fetchHistory()
          } else {
            toast.error(response.data.message || 'Failed to delete record.')
          }
        } catch (error) {
          console.error(error)
          toast.error('Error deleting record.')
        }
      }
    })
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
          <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Daily Recovery Logs</h1>
          <span className="text-muted small">Record and monitor your daily recovery indicators</span>
        </div>
        <button 
          className="btn btn-primary-custom d-flex align-items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          <span>New Log Entry</span>
        </button>
      </div>

      {/* History Card */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-4" style={{ fontFamily: 'Outfit' }}>Logged History</h3>
        
        {history.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Pain Level</th>
                  <th>Body Temp</th>
                  <th>Wound Condition</th>
                  <th>Bleeding</th>
                  <th>Mobility</th>
                  <th>Medication Taken</th>
                  <th>Notes</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record) => (
                  <tr key={record.id}>
                    <td className="text-white fw-bold">{record.recordDate}</td>
                    <td>
                      <span className={`badge ${record.painLevel > 6 ? 'bg-danger' : record.painLevel > 3 ? 'bg-warning text-dark' : 'bg-success'}`}>
                        {record.painLevel} / 10
                      </span>
                    </td>
                    <td className="fw-bold">{record.bodyTemperature}°C</td>
                    <td>
                      <span className={`badge ${record.woundCondition === 'NORMAL' ? 'bg-success' : 'bg-danger'}`}>
                        {record.woundCondition}
                      </span>
                    </td>
                    <td>{record.bleedingLevel}</td>
                    <td>{record.mobility.replace('_', ' ')}</td>
                    <td className="text-center">
                      {record.medicationTaken ? (
                        <FaCheck className="text-success" />
                      ) : (
                        <FaTimes className="text-danger" />
                      )}
                    </td>
                    <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={record.notes}>
                      {record.notes || '-'}
                    </td>
                    <td className="text-end">
                      <button 
                        className="btn btn-sm btn-link text-danger p-0 border-0"
                        onClick={() => handleDelete(record.id)}
                        title="Delete Record"
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
            <FaHeartbeat size={48} className="mb-3 opacity-30 text-danger" />
            <div>No recovery logs recorded yet.</div>
            <p className="small">Please log your daily state to track metrics over time.</p>
          </div>
        )}
      </div>

      <AddRecoveryModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onRefresh={fetchHistory} 
      />
    </div>
  )
}

export default Recovery
