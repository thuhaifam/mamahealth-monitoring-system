import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCalendarAlt, FaArrowLeft, FaSave } from 'react-icons/fa'
import API from '../../api.js'

const EditAppointment = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [motherName, setMotherName] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [purpose, setPurpose] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await API.get(`/appointments/${id}`)
        if (response.data && response.data.success && response.data.data) {
          const appt = response.data.data
          setMotherName(appt.motherName)
          setAppointmentDate(appt.appointmentDate)
          setAppointmentTime(appt.appointmentTime.substring(0, 5)) // Bind HH:mm
          setPurpose(appt.purpose)
          setNotes(appt.notes || '')
        }
      } catch (error) {
        console.error(error)
        toast.error('Failed to load appointment details.')
        navigate('/doctor/appointments')
      } finally {
        setLoading(false)
      }
    }
    fetchAppointment()
  }, [id])

  const validateForm = () => {
    const purposeRegex = /^[A-Za-z0-9 .,'()\-]+$/
    const notesRegex = /^[A-Za-z0-9 .,'()\-]*$/

    if (!appointmentDate) {
      toast.warning('Appointment date is required.')
      return false
    }
    const selectedDate = new Date(appointmentDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      toast.warning('Appointment date cannot be in the past.')
      return false
    }
    if (!appointmentTime) {
      toast.warning('Appointment time is required.')
      return false
    }
    if (!purpose || purpose.trim() === '') {
      toast.warning('Purpose is required.')
      return false
    }
    if (!purposeRegex.test(purpose)) {
      toast.warning('Purpose contains invalid characters.')
      return false
    }
    if (notes && !notesRegex.test(notes)) {
      toast.warning('Notes contain invalid characters.')
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
        motherId: 0, // Backend Mapper ignores this for update or it is retrieved from existing record
        appointmentDate,
        appointmentTime: appointmentTime + ':00', // HH:mm:ss
        purpose,
        notes,
      }
      const response = await API.put(`/appointments/${id}`, payload)
      if (response.data && response.data.success) {
        toast.success('Appointment updated successfully!')
        navigate('/doctor/appointments')
      } else {
        toast.error(response.data.message || 'Failed to update appointment.')
      }
    } catch (error) {
      console.error(error)
      let errorMsg = 'Error updating appointment.'
      if (error.response?.data) {
        const data = error.response.data
        if (data.errors && typeof data.errors === 'object') {
          errorMsg = Object.values(data.errors).join(' ')
        } else if (data.message) {
          errorMsg = data.message
        }
      }
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
                  onClick={() => navigate('/doctor/appointments')}
                  type="button"
                >
                  <FaArrowLeft />
                </button>
                <h3 className="text-white mb-0">Edit Appointment</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                {/* Mother Display (Read-Only) */}
                <div className="col-md-12">
                  <label className="form-label text-muted small">Patient (Mother)</label>
                  <input
                    type="text"
                    className="form-control form-control-custom text-white"
                    value={motherName}
                    disabled
                  />
                </div>

                {/* Appointment Date */}
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-appt-date">Appointment Date</label>
                  <input
                    type="date"
                    id="edit-appt-date"
                    className="form-control form-control-custom"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>

                {/* Appointment Time */}
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-appt-time">Appointment Time</label>
                  <input
                    type="time"
                    id="edit-appt-time"
                    className="form-control form-control-custom"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  />
                </div>

                {/* Purpose */}
                <div className="col-md-12">
                  <label className="form-label text-muted small" htmlFor="edit-appt-purpose">Purpose / Reason</label>
                  <input
                    type="text"
                    id="edit-appt-purpose"
                    className="form-control form-control-custom"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  />
                </div>

                {/* Notes */}
                <div className="col-md-12">
                  <label className="form-label text-muted small" htmlFor="edit-appt-notes">Notes / Instructions</label>
                  <textarea
                    id="edit-appt-notes"
                    rows="4"
                    className="form-control form-control-custom"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Submit */}
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

export default EditAppointment
