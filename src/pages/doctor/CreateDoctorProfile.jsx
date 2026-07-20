import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserMd, FaPlus } from 'react-icons/fa'
import API from '../../api.js'

const CreateDoctorProfile = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [hospitalName, setHospitalName] = useState('Suza Hospital')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [loading, setLoading] = useState(false)

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

    setLoading(true)
    try {
      const payload = {
        fullName,
        phoneNumber,
        specialization,
        licenseNumber,
        hospitalName,
        yearsOfExperience: parseInt(yearsOfExperience),
      }
      const response = await API.post('/doctors', payload)
      if (response.data && response.data.success) {
        toast.success('Doctor profile created successfully!')
        navigate('/doctor/profile')
      } else {
        toast.error(response.data.message || 'Failed to create profile.')
      }
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Error creating profile. Check validations or license uniqueness.'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="premium-card">
            
            <div className="border-bottom border-color pb-3 mb-4 text-center">
              <div className="d-inline-flex align-items-center justify-content-center bg-info bg-opacity-10 text-info rounded-circle p-3 mb-2" style={{ width: '60px', height: '60px' }}>
                <FaUserMd size={28} />
              </div>
              <h3 className="text-white">Create Doctor Profile</h3>
              <p className="text-muted small">Please complete your practitioner profile to begin patient recovery support.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="doc-fullname">Full Name</label>
                  <input
                    type="text"
                    id="doc-fullname"
                    className="form-control form-control-custom"
                    placeholder="e.g. Dr. Nahir Ali"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="doc-phone">Phone Number (10 digits)</label>
                  <input
                    type="tel"
                    id="doc-phone"
                    className="form-control form-control-custom"
                    placeholder="e.g. 0712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="doc-spec">Specialization</label>
                  <input
                    type="text"
                    id="doc-spec"
                    className="form-control form-control-custom"
                    placeholder="e.g. Obstetrics & Gynecology"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="doc-license">Medical License Number</label>
                  <input
                    type="text"
                    id="doc-license"
                    className="form-control form-control-custom"
                    placeholder="e.g. LIC-98765"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="doc-experience">Years of Experience</label>
                  <input
                    type="number"
                    id="doc-experience"
                    className="form-control form-control-custom"
                    placeholder="e.g. 8"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="doc-hospital">Hospital / Clinic Registered</label>
                  <input
                    type="text"
                    id="doc-hospital"
                    className="form-control form-control-custom text-white"
                    placeholder="e.g. City General Hospital"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    required
                    disabled
                  />
                </div>

                <div className="col-md-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" />
                    ) : (
                      <>
                        <FaPlus />
                        <span>Save Profile</span>
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

export default CreateDoctorProfile
