import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FaHeartbeat, FaTimes } from 'react-icons/fa'
import API from '../../api.js'

const AddRecoveryOffcanvas = ({ show, onClose, onRefresh }) => {
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split('T')[0])
  const [painLevel, setPainLevel] = useState(5)
  const [bodyTemperature, setBodyTemperature] = useState(36.6)
  const [woundCondition, setWoundCondition] = useState('NORMAL')
  const [bleedingLevel, setBleedingLevel] = useState('NONE')
  const [mobility, setMobility] = useState('INDEPENDENT')
  const [medicationTaken, setMedicationTaken] = useState(false)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (bodyTemperature < 34.0 || bodyTemperature > 43.0) {
      toast.warning('Temperature must be between 34.0°C and 43.0°C.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        recordDate,
        painLevel: parseInt(painLevel),
        bodyTemperature: parseFloat(bodyTemperature),
        woundCondition,
        bleedingLevel,
        mobility,
        medicationTaken,
        notes: notes.trim(),
      }
      
      const response = await API.post('/recovery', payload)
      if (response.data && response.data.success) {
        toast.success('Recovery record added successfully!')
        onRefresh()
        onClose()
      } else {
        toast.error(response.data.message || 'Failed to save recovery record.')
      }
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Error saving record. Check input formats.'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <>
      <div className="offcanvas-backdrop fade show" onClick={onClose} style={{ zIndex: 1040 }} />
      <div className="offcanvas offcanvas-end show text-white" tabIndex="-1" style={{ visibility: 'visible', zIndex: 1045, width: '450px', background: '#130f26', borderLeft: '1px solid var(--border-color)' }}>
        
        <div className="offcanvas-header border-bottom border-color p-3 d-flex justify-content-between align-items-center">
          <h5 className="offcanvas-title d-flex align-items-center gap-2" style={{ fontFamily: 'Outfit' }}>
            <FaHeartbeat className="text-danger animate-pulse" />
            <span>Log Recovery Details</span>
          </h5>
          <button type="button" className="btn btn-link text-white p-0 border-0" onClick={onClose} aria-label="Close">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="offcanvas-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              
              <div className="col-12">
                <label className="form-label text-muted small" htmlFor="off-date-input">Record Date</label>
                <input
                  type="date"
                  id="off-date-input"
                  className="form-control form-control-custom"
                  value={recordDate}
                  onChange={(e) => setRecordDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label text-muted small" htmlFor="off-temp-input">Body Temperature (°C)</label>
                <input
                  type="number"
                  id="off-temp-input"
                  step="0.1"
                  className="form-control form-control-custom"
                  placeholder="e.g. 36.6"
                  value={bodyTemperature}
                  onChange={(e) => setBodyTemperature(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 my-2">
                <div className="d-flex justify-content-between mb-1">
                  <label className="form-label text-muted small" htmlFor="off-pain-input">Pain Level</label>
                  <span className="badge bg-danger">{painLevel}</span>
                </div>
                <input
                  type="range"
                  id="off-pain-input"
                  className="form-range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label text-muted small" htmlFor="off-wound-input">Wound Condition</label>
                <select
                  id="off-wound-input"
                  className="form-select form-control-custom text-white"
                  value={woundCondition}
                  onChange={(e) => setWoundCondition(e.target.value)}
                  required
                  style={{ background: '#1a152e' }}
                >
                  <option value="NORMAL">Normal</option>
                  <option value="REDNESS">Redness</option>
                  <option value="SWELLING">Swelling</option>
                  <option value="DISCHARGE">Discharge</option>
                  <option value="BLEEDING">Bleeding</option>
                  <option value="INFECTION">Infection</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label text-muted small" htmlFor="off-bleeding-input">Bleeding Level</label>
                <select
                  id="off-bleeding-input"
                  className="form-select form-control-custom text-white"
                  value={bleedingLevel}
                  onChange={(e) => setBleedingLevel(e.target.value)}
                  required
                  style={{ background: '#1a152e' }}
                >
                  <option value="NONE">None</option>
                  <option value="LIGHT">Light</option>
                  <option value="MODERATE">Moderate</option>
                  <option value="HEAVY">Heavy</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label text-muted small" htmlFor="off-mobility-input">Mobility</label>
                <select
                  id="off-mobility-input"
                  className="form-select form-control-custom text-white"
                  value={mobility}
                  onChange={(e) => setMobility(e.target.value)}
                  required
                  style={{ background: '#1a152e' }}
                >
                  <option value="INDEPENDENT">Independent</option>
                  <option value="NEEDS_ASSISTANCE">Needs Assistance</option>
                  <option value="BED_REST">Bed Rest</option>
                </select>
              </div>

              <div className="col-12 my-2">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="off-med-taken-checkbox"
                    checked={medicationTaken}
                    onChange={(e) => setMedicationTaken(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  <label className="form-check-label text-white ms-2" htmlFor="off-med-taken-checkbox" style={{ cursor: 'pointer' }}>
                    Taken prescribed medications.
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label text-muted small" htmlFor="off-notes-textarea">Notes / Symptoms</label>
                <textarea
                  id="off-notes-textarea"
                  rows="3"
                  className="form-control form-control-custom"
                  placeholder="Enter notes about how you are feeling."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-primary-custom w-100 py-2" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm" role="status" /> : 'Save Log'}
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </>
  )
}

export default AddRecoveryOffcanvas
