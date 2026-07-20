import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUsers, FaHeartbeat, FaCalendarAlt, FaPills } from 'react-icons/fa'
import API from '../../api.js'
import StatCard from '../../components/common/StatCard.jsx'

const DoctorDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadDashboard = async () => {
    try {
      // 1. Load Stats
      try {
        const statsRes = await API.get('/doctors/dashboard')
        if (statsRes.data && statsRes.data.success) {
          setStats(statsRes.data.data)
        }
      } catch (err) {
        console.log('Error fetching stats.', err)
        // If doctor profile is not created yet, they'll get 404
        if (err.response && err.response.status === 404) {
          toast.warning('Please create your doctor profile first.')
          navigate('/doctor/create-profile')
          return
        }
      }





    } catch (error) {
      console.error(error)
      toast.error('Unexpected error loading dashboard.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
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
      
      {/* Title */}
      <div className="mb-4">
        <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Doctor Dashboard</h1>
        <span className="text-muted small">Monitor maternal recovery metrics and manage clinic operations</span>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <StatCard 
            title="Total Patients (Mothers)"
            value={stats?.totalMothers || 0}
            icon={<FaUsers />}
            variant="primary"
            description="Active postpartum mothers"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Total Recovery Reports"
            value={stats?.recoveryReports || 0}
            icon={<FaHeartbeat />}
            variant="danger"
            description="Cumulative daily log records"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Active Prescriptions"
            value={stats?.activeMedications || 0}
            icon={<FaPills />}
            variant="success"
            description="Medications being monitored"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Upcoming Checkups"
            value={stats?.upcomingAppointments || 0}
            icon={<FaCalendarAlt />}
            variant="info"
            description="Total scheduled clinic visits"
          />
        </div>
      </div>



    </div>
  )
}

export default DoctorDashboard
