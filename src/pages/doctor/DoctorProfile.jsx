import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserMd, FaPhone, FaHospital, FaAward, FaIdCard, FaClock, FaEdit } from 'react-icons/fa'
import API from '../../api.js'

const DoctorProfile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      const response = await API.get('/doctors/me')
      if (response.data && response.data.success && response.data.data) {
        setProfile(response.data.data)
      }
    } catch (error) {
      console.log('No doctor profile found or unauthorized.', error)
      if (error.response && error.response.status === 404) {
        // Redirect to create profile
        navigate('/doctor/create-profile')
      } else {
        toast.error('Failed to fetch doctor profile.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="premium-card">
            
            {/* Profile Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom border-color pb-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="user-avatar bg-info" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                  <FaUserMd />
                </div>
                <div>
                  <h3 className="text-white mb-0">{profile?.fullName}</h3>
                  <span className="text-muted small">Medical Practitioner / Doctor</span>
                </div>
              </div>
              <button 
                className="btn btn-primary-custom d-flex align-items-center gap-2"
                onClick={() => navigate('/doctor/edit-profile')}
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Profile Details */}
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start gap-3">
                  <FaAward className="text-primary mt-1" size={20} />
                  <div>
                    <div className="text-muted small">Specialization</div>
                    <div className="text-white fw-bold">{profile?.specialization}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start gap-3">
                  <FaIdCard className="text-primary mt-1" size={20} />
                  <div>
                    <div className="text-muted small">License Number</div>
                    <div className="text-white fw-bold">{profile?.licenseNumber}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start gap-3">
                  <FaPhone className="text-primary mt-1" size={20} />
                  <div>
                    <div className="text-muted small">Contact Number</div>
                    <div className="text-white fw-bold">{profile?.phoneNumber}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start gap-3">
                  <FaClock className="text-primary mt-1" size={20} />
                  <div>
                    <div className="text-muted small">Years of Experience</div>
                    <div className="text-white fw-bold">{profile?.yearsOfExperience} years</div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="d-flex align-items-start gap-3">
                  <FaHospital className="text-success mt-1" size={20} />
                  <div>
                    <div className="text-muted small">Hospital Registered</div>
                    <div className="text-white fw-bold">{profile?.hospitalName}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
