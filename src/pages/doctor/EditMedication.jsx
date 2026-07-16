import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaPills, FaArrowLeft, FaSave } from 'react-icons/fa'
import API from '../../api.js'

const EditMedication = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [motherId, setMotherId] = useState(0)
  const [motherName, setMotherName] = useState('')
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [instructions, setInstructions] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await API.get(`/medications/${id}`)
        if (response.data && response.data.success && response.data.data) {
          const med = response.data.data
          setMotherId(med.motherId || 0)
          setMotherName(med.motherName)
          setName(med.medicationName || '')
          setDosage(med.dosage)
          setFrequency(med.frequency)
          setStartDate(med.startDate || '')
          setEndDate(med.endDate || '')
          setInstructions(med.instructions || '')
        }
      } catch (error) {
        console.error(error)
        toast.error('Failed to load medication details.')
        navigate('/doctor/medications')
      } finally {
        setLoading(false)
      }
    }
    fetchMedication()
  }, [id, navigate])

  const validateForm = () => {
    const textRegex = /^[A-Za-z0-9 .,'()\-]+$/
    const freqRegex = /^[A-Za-z0-9 /,.'()\-]+$/
    const instructionsRegex = /^[A-Za-z0-9 .,'()\-]*$/

    if (!name || name.trim() === '') {
      toast.warning('Medication name is required.')
      return false
    }
    if (!textRegex.test(name)) {
      toast.warning('Medication name contains invalid characters.')
      return false
    }
    if (!dosage || dosage.trim() === '') {
      toast.warning('Dosage is required.')
      return false
    }
    if (!textRegex.test(dosage)) {
      toast.warning('Dosage contains invalid characters.')
      return false
    }
    if (!frequency || frequency.trim() === '') {
      toast.warning('Frequency is required.')
      return false
    }
    if (!freqRegex.test(frequency)) {
      toast.warning('Frequency contains invalid characters.')
      return false
    }
    if (!startDate) {
      toast.warning('Start date is required.')
      return false
    }
    // Note: for edit, we might let them save start dates in the past if they were already set in the past,
    // but the backend uses @FutureOrPresent for CreateMedicationRequest. However, on update, Spring MVC checks validation again.
    // If the medication started in the past, editing might need the start date, but let's check it anyway.
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedStart = new Date(startDate)
    if (selectedStart < today) {
      toast.warning('Start date cannot be in the past.')
      return false
    }
    if (!endDate) {
      toast.warning('End date is required.')
      return false
    }
    const selectedEnd = new Date(endDate)
    if (selectedEnd < selectedStart) {
      toast.warning('End date cannot be before the start date.')
      return false
    }
    if (instructions && !instructionsRegex.test(instructions)) {
      toast.warning('Instructions contain invalid characters.')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setSaving(true)
    try {
      const payload = {
        motherId: motherId || 0,
        medicationName: name,
        dosage,
        frequency,
        startDate,
        endDate,
        instructions,
      }
      const response = await API.put(`/medications/${id}`, payload)
      if (response.data && response.data.success) {
        toast.success('Medication updated successfully!')
        navigate('/doctor/medications')
      } else {
        toast.error(response.data.message || 'Failed to update medication.')
      }
    } catch (error) {
      console.error(error)
      let errorMsg = 'Error updating medication.'
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
                  onClick={() => navigate('/doctor/medications')}
                  type="button"
                >
                  <FaArrowLeft />
                </button>
                <h3 className="text-white mb-0">Edit Medication</h3>
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

                {/* Medication Name */}
                <div className="col-md-12">
                  <label className="form-label text-muted small" htmlFor="edit-med-name">Medication Name</label>
                  <input
                    type="text"
                    id="edit-med-name"
                    className="form-control form-control-custom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Dosage */}
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-med-dosage">Dosage</label>
                  <input
                    type="text"
                    id="edit-med-dosage"
                    className="form-control form-control-custom"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    required
                  />
                </div>

                {/* Frequency */}
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-med-freq">Frequency</label>
                  <input
                    type="text"
                    id="edit-med-freq"
                    className="form-control form-control-custom"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                  />
                </div>

                {/* Start Date */}
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-med-start-date">Start Date</label>
                  <input
                    type="date"
                    id="edit-med-start-date"
                    className="form-control form-control-custom"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                {/* End Date */}
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="edit-med-end-date">End Date</label>
                  <input
                    type="date"
                    id="edit-med-end-date"
                    className="form-control form-control-custom"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>

                {/* Instructions */}
                <div className="col-md-12">
                  <label className="form-label text-muted small" htmlFor="edit-med-instructions">Intake Instructions</label>
                  <textarea
                    id="edit-med-instructions"
                    rows="3"
                    className="form-control form-control-custom"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
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

export default EditMedication
