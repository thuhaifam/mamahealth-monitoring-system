import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaPills, FaArrowLeft, FaSave } from 'react-icons/fa'
import API from '../../api.js'

const CreateMedication = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preSelectedMotherId = searchParams.get('motherId')

  const [mothers, setMothers] = useState([])
  const [motherId, setMotherId] = useState(preSelectedMotherId || '')
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [instructions, setInstructions] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchingMothers, setFetchingMothers] = useState(true)

  useEffect(() => {
    const fetchMothers = async () => {
      try {
        const response = await API.get('/mothers/all')
        if (response.data && response.data.success && response.data.data) {
          setMothers(response.data.data)
          if (!preSelectedMotherId && response.data.data.length > 0) {
            setMotherId(response.data.data[0].id)
          }
        }
      } catch (error) {
        console.error(error)
        toast.error('Failed to load mothers dropdown list.')
      } finally {
        setFetchingMothers(false)
      }
    }
    fetchMothers()
  }, [preSelectedMotherId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!motherId || !name || !dosage || !frequency) {
      toast.warning('Please fill in all required fields.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        motherId: parseInt(motherId),
        name,
        dosage,
        frequency,
        instructions,
      }
      const response = await API.post('/medications', payload)
      if (response.data && response.data.success) {
        toast.success('Medication prescribed successfully!')
        if (preSelectedMotherId) {
          navigate(`/doctor/mothers/${preSelectedMotherId}`)
        } else {
          navigate('/doctor/medications')
        }
      } else {
        toast.error(response.data.message || 'Failed to prescribe medication.')
      }
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Error prescribing medication.'
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
            
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between border-bottom border-color pb-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <button 
                  className="btn btn-secondary-custom p-2" 
                  onClick={() => preSelectedMotherId ? navigate(`/doctor/mothers/${preSelectedMotherId}`) : navigate('/doctor/medications')}
                  type="button"
                >
                  <FaArrowLeft />
                </button>
                <h3 className="text-white mb-0">Prescribe Medication</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                {/* Select Mother */}
                <div className="col-md-12">
                  <label className="form-label text-muted small" htmlFor="med-mother-select">Select Patient (Mother)</label>
                  <select
                    id="med-mother-select"
                    className="form-select form-control-custom text-white"
                    value={motherId}
                    onChange={(e) => setMotherId(e.target.value)}
                    required
                    style={{ background: '#1a152e' }}
                    disabled={!!preSelectedMotherId}
                  >
                    {preSelectedMotherId ? (
                      <option value={preSelectedMotherId}>
                        Pre-selected Patient
                      </option>
                    ) : (
                      mothers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.fullName} (ID: {m.id}, Hospital: {m.hospitalName})
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Medication Name */}
                <div className="col-md-12">
                  <label className="form-label text-muted small" htmlFor="med-name">Medication Name</label>
                  <input
                    type="text"
                    id="med-name"
                    className="form-control form-control-custom"
                    placeholder="e.g. Paracetamol"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Dosage */}
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="med-dosage">Dosage</label>
                  <input
                    type="text"
                    id="med-dosage"
                    className="form-control form-control-custom"
                    placeholder="e.g. 500mg / 1 Tablet"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    required
                  />
                </div>

                {/* Frequency */}
                <div className="col-md-6">
                  <label className="form-label text-muted small" htmlFor="med-freq">Frequency</label>
                  <input
                    type="text"
                    id="med-freq"
                    className="form-control form-control-custom"
                    placeholder="e.g. Twice daily"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                  />
                </div>

                {/* Instructions */}
                <div className="col-md-12">
                  <label className="form-label text-muted small" htmlFor="med-instructions">Intake Instructions</label>
                  <textarea
                    id="med-instructions"
                    rows="3"
                    className="form-control form-control-custom"
                    placeholder="e.g. Take after meals with plenty of water."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </div>

                {/* Submit */}
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
                        <FaSave />
                        <span>Prescribe Medication</span>
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

export default CreateMedication
