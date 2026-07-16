import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserMd, FaPlus, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa'
import API from '../../api.js'
import Swal from 'sweetalert2'

const AdminDoctors = () => {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDoctors = async () => {
    try {
      const response = await API.get('/admin/doctors')
      if (response.data && response.data.success && response.data.data) {
        setDoctors(response.data.data)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load doctors list.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const handleDeactivate = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to deactivate this doctor profile?",
      icon: 'warning',
      showCancelButton: true,
      background: '#1a152e',
      color: '#fff',
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#4b5563',
      confirmButtonText: 'Yes, deactivate!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await API.patch(`/admin/doctors/${id}/deactivate`)
          if (response.data && response.data.success) {
            toast.success('Doctor deactivated successfully.')
            fetchDoctors()
          } else {
            toast.error(response.data.message || 'Failed to deactivate doctor.')
          }
        } catch (error) {
          console.error(error)
          toast.error('Error deactivating doctor.')
        }
      }
    })
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete doctor? (This will fail if medical records exist)",
      icon: 'warning',
      showCancelButton: true,
      background: '#1a152e',
      color: '#fff',
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#4b5563',
      confirmButtonText: 'Yes, delete!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await API.delete(`/admin/doctors/${id}`)
          if (response.data && response.data.success) {
            toast.success('Doctor profile deleted successfully.')
            fetchDoctors()
          } else {
            toast.error(response.data.message || 'Failed to delete doctor.')
          }
        } catch (error) {
          console.error(error)
          toast.error(error.response?.data?.message || 'Error deleting doctor. Check if records exist.')
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
          <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Manage Doctors</h1>
          <span className="text-muted small">Overview and profile control of all registered clinical practitioners</span>
        </div>
        <button 
          className="btn btn-primary-custom d-flex align-items-center gap-2"
          onClick={() => navigate('/admin/doctors/create')}
        >
          <FaPlus />
          <span>Add Doctor</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="premium-card">
        <h3 className="h5 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Practitioner Directory</h3>

        {doctors.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>License Number</th>
                  <th>Contact Phone</th>
                  <th>Hospital Name</th>
                  <th>Experience</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td className="text-white fw-bold">{doc.fullName}</td>
                    <td>{doc.specialization}</td>
                    <td>{doc.licenseNumber}</td>
                    <td>{doc.phoneNumber}</td>
                    <td>{doc.hospitalName}</td>
                    <td>{doc.yearsOfExperience} years</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning border-0"
                          onClick={() => handleDeactivate(doc.id)}
                          title="Deactivate Doctor"
                        >
                          <FaToggleOff />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary border-0"
                          onClick={() => navigate(`/admin/doctors/edit/${doc.id}`)}
                          title="Edit Profile"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger border-0"
                          onClick={() => handleDelete(doc.id)}
                          title="Delete Doctor"
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
            <FaUserMd size={48} className="mb-3 opacity-30 text-secondary" />
            <div>No doctors registered in the system yet.</div>
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminDoctors
