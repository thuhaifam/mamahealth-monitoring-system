import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserMd, FaArrowLeft, FaSave } from 'react-icons/fa'
import API from '../../api.js'

const CreateDoctor = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.warning('Please fill in all fields.')
      return
    }
    if (password.length < 8) {
      toast.warning('Password must be at least 8 characters long.')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      // 1. Create User via Signup
      const regResponse = await API.post('/auth/signup', { email, password })
      if (regResponse.data && regResponse.data.success) {
        
        // 2. Promote User to DOCTOR
        const promoteResponse = await API.patch(`/admin/users/promote?email=${encodeURIComponent(email)}&role=DOCTOR`)
        if (promoteResponse.data && promoteResponse.data.success) {
          toast.success('Doctor user account registered and promoted successfully!')
          toast.info('The doctor can now log in under their credentials to complete their profile details.')
          navigate('/admin/doctors')
        } else {
          toast.error('Account registered but role promotion failed.')
        }

      } else {
        toast.error(regResponse.data.message || 'Registration failed.')
      }
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Error creating doctor account.'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-6">
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
                <h3 className="text-white mb-0">Add Doctor User</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                <div className="col-12">
                  <label className="form-label text-muted small" htmlFor="doc-email">Doctor Email Address</label>
                  <input
                    type="email"
                    id="doc-email"
                    className="form-control form-control-custom"
                    placeholder="doctor@hospital.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label text-muted small" htmlFor="doc-pass">Password (min 8 chars)</label>
                  <input
                    type="password"
                    id="doc-pass"
                    className="form-control form-control-custom"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label text-muted small" htmlFor="doc-confirm-pass">Confirm Password</label>
                  <input
                    type="password"
                    id="doc-confirm-pass"
                    className="form-control form-control-custom"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" />
                    ) : (
                      <>
                        <FaSave />
                        <span>Register Doctor</span>
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

export default CreateDoctor
