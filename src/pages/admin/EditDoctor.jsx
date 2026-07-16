import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserMd, FaArrowLeft, FaSave } from 'react-icons/fa'
import API from '../../api.js'

const EditDoctor = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [hospitalName, setHospitalName] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await API.get(`/admin/doctors/${id}`)
        if (response.data && response.data.success && response.data.data) {
          const doc = response.data.data
          setFullName(doc.fullName)
          setPhoneNumber(doc.phoneNumber)
          setSpecialization(doc.specialization)
          setLicenseNumber(doc.licenseNumber)
          setHospitalName(doc.hospitalName)
          setYearsOfExperience(doc.yearsOfExperience)
        }
      } catch (error) {
        console.error(error)
        toast.error('Failed to load doctor profile details.')
        navigate('/admin/doctors')
      } finally {
        setLoading(false)
      }
    }
    fetchDoctor()
  }, [id])

  const validateForm = () => {
    const phoneRegex = /^\d{10}$/
    const nameRegex = /^[A-Za-z .'-]+$/

    if (!nameRegex.test(fullName)) {
      toast.warning('Full name must contain letters and spaces only.')
      return false
    }
    if (!phoneRegex.test(phoneNumber)) {
      toast.warning('Phone number must be exactly 10 digits.')
      return false
    }
    if (!nameRegex.test(hospitalName)) {
      toast.warning('Hospital name must contain letters and spaces only.')
      return false
    }
    if (isNaN(yearsOfExperience) || parseInt(yearsOfExperience) < 0) {
      toast.warning('Years of experience must be a non-negative number.')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setSaving(true)
    try {
      const payload = {
        fullName,
        phoneNumber,
        specialization,
        licenseNumber,
        hospitalName,
        yearsOfExperience: parseInt(yearsOfExperience),
      }
      const response = await API.put(`/admin/doctors/${id}`, payload)
      if (response.data && response.data.success) {
        toast.success('Doctor profile updated successfully!')
        navigate('/admin/doctors')
      } else {
        toast.error(response.data.message || 'Failed to update doctor.')
      }
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Error updating doctor profile.'
      toast.error(errorMsg)
    } finally {
      setSaving(false)
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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="premium-card">
            
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between border-bottom border-color pb-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <button 
                  className="btn btn-secondary-custom p-2" 
                  onClick={() => navigate('/admin/doctors')}
                  type="button"
                >
                  <FaArrowLeft />
                </button>
                <h3 className="text-white mb-0">Edit Doctor Profile</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-doc-fullname">Full Name</label>
                  <input
                    type="text"
                    id="edit-doc-fullname"
                    className="form-control form-control-custom"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-doc-phone">Phone Number (10 digits)</label>
                  <input
                    type="tel"
                    id="edit-doc-phone"
                    className="form-control form-control-custom"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-doc-spec">Specialization</label>
                  <input
                    type="text"
                    id="edit-doc-spec"
                    className="form-control form-control-custom"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-doc-license">Medical License Number</label>
                  <input
                    type="text"
                    id="edit-doc-license"
                    className="form-control form-control-custom"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-doc-experience">Years of Experience</label>
                  <input
                    type="number"
                    id="edit-doc-experience"
                    className="form-control form-control-custom"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-doc-hospital">Hospital / Clinic Registered</label>
                  <input
                    type="text"
                    id="edit-doc-hospital"
                    className="form-control form-control-custom"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="spinner-border spinner-border-sm" role="status" />
                    ) : (
                      <>
                        <FaSave />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDoctor
