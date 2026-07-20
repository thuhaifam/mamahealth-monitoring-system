import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaChartBar, FaFileDownload, FaClipboardCheck, FaHospital } from 'react-icons/fa'
import API from '../../api.js'

const AdminReports = () => {
  const [reports, setReports] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchReports = async () => {
    try {
      const response = await API.get('/admin/reports')
      if (response.data && response.data.success && response.data.data) {
        setReports(response.data.data)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load system reports.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
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

  // Calculate counts
  const scheduledCount = reports ? (reports.totalAppointments - reports.completedAppointments - reports.missedAppointments) : 0
  const totalMeds = reports ? (reports.activeMedications + reports.completedMedications) : 0

  return (
    <div className="container-fluid">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>System Reports & Analytics</h1>
        <span className="text-muted small">Analyze system compliance rates and patient enrollment stats</span>
      </div>

      <div className="row g-4 mb-4">
        
        {/* Enrolment metrics */}
        <div className="col-lg-6">
          <div className="premium-card h-100">
            <h3 className="h5 text-white mb-4 d-flex align-items-center gap-2" style={{ fontFamily: 'Outfit' }}>
              <FaClipboardCheck className="text-primary-light" />
              <span>Enrollment & Care Volumes</span>
            </h3>

            <div className="d-flex flex-column gap-3 mb-2">
              <div className="d-flex justify-content-between align-items-center border-bottom border-color pb-2">
                <span className="text-muted small">Registered Postpartum Patients</span>
                <span className="h4 text-white mb-0 fw-bold">{reports?.totalMothers}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom border-color pb-2">
                <span className="text-muted small">Licensed Practitioners</span>
                <span className="h4 text-white mb-0 fw-bold">{reports?.totalDoctors}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom border-color pb-2">
                <span className="text-muted small">Total Daily Health logs submitted</span>
                <span className="h4 text-white mb-0 fw-bold">{reports?.recoveryReports}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom border-color pb-2">
                <span className="text-muted small">Clinical Notifications broadcasted</span>
                <span className="h4 text-white mb-0 fw-bold">{reports?.notifications}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown: Appointments */}
        <div className="col-lg-3">
          <div className="premium-card h-100">
            <h3 className="h6 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Appointments Breakdown</h3>
            <div className="d-flex flex-column gap-3">
              <div>
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Completed</span>
                  <strong>{reports?.completedAppointments}</strong>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-success" style={{ width: `${reports?.totalAppointments > 0 ? (reports.completedAppointments / reports.totalAppointments) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Missed</span>
                  <strong>{reports?.missedAppointments}</strong>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-danger" style={{ width: `${reports?.totalAppointments > 0 ? (reports.missedAppointments / reports.totalAppointments) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Scheduled</span>
                  <strong>{Math.max(0, scheduledCount)}</strong>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-warning" style={{ width: `${reports?.totalAppointments > 0 ? (scheduledCount / reports.totalAppointments) * 100 : 0}%` }}></div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-muted small pt-2 border-top border-color">
              Total appointments: <strong>{reports?.totalAppointments}</strong>
            </div>
          </div>
        </div>

        {/* Breakdown: Medications */}
        <div className="col-lg-3">
          <div className="premium-card h-100">
            <h3 className="h6 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Medications Breakdown</h3>
            <div className="d-flex flex-column gap-3">
              <div>
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Completed Log Intake</span>
                  <strong>{reports?.completedMedications}</strong>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-success" style={{ width: `${totalMeds > 0 ? (reports.completedMedications / totalMeds) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Active Prescriptions</span>
                  <strong>{reports?.activeMedications}</strong>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-primary" style={{ width: `${totalMeds > 0 ? (reports.activeMedications / totalMeds) * 100 : 0}%` }}></div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-muted small pt-2 border-top border-color">
              Total prescribed regimes: <strong>{totalMeds}</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminReports
