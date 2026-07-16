import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUsers, FaUserMd, FaHeartbeat, FaCalendarAlt, FaPills, FaBell, FaClipboardList } from 'react-icons/fa'
import API from '../../api.js'
import StatCard from '../../components/common/StatCard.jsx'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadDashboard = async () => {
    try {
      // 1. Fetch dashboard stats
      const dashRes = await API.get('/admin/dashboard')
      if (dashRes.data && dashRes.data.success) {
        setDashboard(dashRes.data.data)
      }

    } catch (error) {
      console.error(error)
      toast.error('Failed to load admin dashboard data.')
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
        <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Admin Operations Dashboard</h1>
        <span className="text-muted small">System wide auditing metrics and user profile databases</span>
      </div>

      {/* Grid rows */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <StatCard 
            title="Total Registered Users"
            value={dashboard?.totalUsers || 0}
            icon={<FaUsers />}
            variant="primary"
            description="System user credentials"
          />
        </div>
        <div className="col-md-4">
          <StatCard 
            title="Active Doctors"
            value={dashboard?.totalDoctors || 0}
            icon={<FaUserMd />}
            variant="info"
            description="Licensed medical professionals"
          />
        </div>
        <div className="col-md-4">
          <StatCard 
            title="Enrolled Mothers"
            value={dashboard?.totalMothers || 0}
            icon={<FaUsers />}
            variant="secondary"
            description="Postpartum recovery monitoring"
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <StatCard 
            title="Appointments"
            value={dashboard?.totalAppointments || 0}
            icon={<FaCalendarAlt />}
            variant="success"
            description="Total scheduled consultations"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Prescriptions"
            value={dashboard?.totalMedications || 0}
            icon={<FaPills />}
            variant="warning"
            description="Medication tracking compliance"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Recovery Logs"
            value={dashboard?.totalRecoveries || 0}
            icon={<FaHeartbeat />}
            variant="danger"
            description="Daily metrics reported"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Notifications Sent"
            value={dashboard?.totalNotifications || 0}
            icon={<FaBell />}
            variant="secondary"
            description="Broadcast alerts"
          />
        </div>
      </div>



    </div>
  )
}

export default AdminDashboard
