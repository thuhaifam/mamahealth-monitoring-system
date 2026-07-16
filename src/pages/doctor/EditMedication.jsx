import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaPills, FaArrowLeft, FaSave } from 'react-icons/fa'
import API from '../../api.js'

const EditMedication = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [motherName, setMotherName] = useState('')
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [instructions, setInstructions] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await API.get(`/medications/${id}`)
        if (response.data && response.data.success && response.data.data) {
          const med = response.data.data
          setMotherName(med.motherName)
          setName(med.name)
          setDosage(med.dosage)
          setFrequency(med.frequency)
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
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !dosage || !frequency) {
      toast.warning('Please fill in all required fields.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        motherId: 0, // Backend Mapper ignores this for update or it is retrieved from existing record
        name,
        dosage,
        frequency,
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
      const errorMsg = error.response?.data?.message || 'Error updating medication.'
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
