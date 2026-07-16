import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { 
  FaPills, 
  FaHeartbeat, 
  FaThermometerHalf, 
  FaHospital, 
  FaExclamationTriangle 
} from 'react-icons/fa'
import API from '../../api.js'
import StatCard from '../../components/common/StatCard.jsx'

const MotherDashboard = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [medications, setMedications] = useState([])
  const [recoveryHistory, setRecoveryHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [profileMissing, setProfileMissing] = useState(false)

  const loadDashboardData = async () => {
    try {
      // 1. Fetch profile
      let userProfile = null
      try {
        const pRes = await API.get('/mothers/me')
        if (pRes.data && pRes.data.success && pRes.data.data) {
          userProfile = pRes.data.data
          setProfile(userProfile)
        } else {
          setProfileMissing(true)
          setLoading(false)
          return
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setProfileMissing(true)
        } else {
          toast.error('Error fetching profile details.')
        }
        setLoading(false)
        return
      }



      // 3. Fetch medications
      try {
        const medRes = await API.get('/medications/me')
        if (medRes.data && medRes.data.success && medRes.data.data) {
          setMedications(medRes.data.data)
        }
      } catch (err) {
        console.log('Error fetching medications.', err)
      }

      // 4. Fetch recovery history
      try {
        const recRes = await API.get('/recovery/me/history')
        if (recRes.data && recRes.data.success && recRes.data.data) {
          // Sort history by date ascending for the chart
          const sorted = recRes.data.data.sort((a, b) => new Date(a.recordDate) - new Date(b.recordDate))
          setRecoveryHistory(sorted)
        }
      } catch (err) {
        console.log('Error fetching recovery logs.', err)
      }

    } catch (error) {
      console.error(error)
      toast.error('Unexpected error loading dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  // Calculate compliance statistics
  const totalMeds = medications.length
  const completedMeds = medications.filter(m => m.status === 'COMPLETED').length
  const complianceRate = totalMeds > 0 ? Math.round((completedMeds / totalMeds) * 100) : 100

  // Calculate stats from latest recovery entry
  const latestRecovery = recoveryHistory.length > 0 ? recoveryHistory[recoveryHistory.length - 1] : null
  const currentPain = latestRecovery ? latestRecovery.painLevel : 'N/A'
  const currentTemp = latestRecovery ? `${latestRecovery.bodyTemperature}°C` : 'N/A'

  // Prepare chart data
  const chartData = {
    labels: recoveryHistory.map(r => r.recordDate),
    datasets: [
      {
        label: 'Pain Level (1-10)',
        data: recoveryHistory.map(r => r.painLevel),
        borderColor: '#fd79a8',
        backgroundColor: 'rgba(253, 121, 168, 0.1)',
        tension: 0.3,
        borderWidth: 3,
        pointBackgroundColor: '#fd79a8',
      },
      {
        label: 'Body Temp (°C)',
        data: recoveryHistory.map(r => r.bodyTemperature),
        borderColor: '#6c5ce7',
        backgroundColor: 'rgba(108, 92, 231, 0.1)',
        tension: 0.3,
        borderWidth: 3,
        pointBackgroundColor: '#6c5ce7',
      }
    ]
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

  if (profileMissing) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 text-center">
            <div className="premium-card p-5">
              <FaExclamationTriangle size={60} className="text-warning mb-4 animate-bounce" />
              <h2 className="text-white mb-3">Profile Incomplete</h2>
              <p className="text-muted mb-4">
                You must complete your mother profile before you can access the dashboard, log recovery metrics, view medications, or confirm appointments.
              </p>
              <Link to="/mother/profile" className="btn btn-primary-custom px-4 py-2">
                Create My Profile Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Hello, {profile?.fullName}!</h1>
          <span className="text-muted small">Here is your postpartum recovery monitoring summary</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <StatCard 
            title="Current Pain Level"
            value={currentPain}
            icon={<FaHeartbeat />}
            variant={latestRecovery && latestRecovery.painLevel > 5 ? 'danger' : 'secondary'}
            description={latestRecovery ? 'From latest logged record' : 'No records logged yet'}
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Body Temperature"
            value={currentTemp}
            icon={<FaThermometerHalf />}
            variant={latestRecovery && latestRecovery.bodyTemperature > 37.8 ? 'danger' : 'primary'}
            description={latestRecovery ? 'From latest logged record' : 'No records logged yet'}
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Medication Compliance"
            value={`${complianceRate}%`}
            icon={<FaPills />}
            variant={complianceRate < 80 ? 'warning' : 'success'}
            description={`${completedMeds} of ${totalMeds} completed`}
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Hospital Registered"
            value={profile?.hospitalName ? (profile.hospitalName.length > 15 ? `${profile.hospitalName.substring(0, 15)}...` : profile.hospitalName) : 'N/A'}
            icon={<FaHospital />}
            variant="info"
            description="Linked treatment center"
          />
        </div>
      </div>



    </div>
  )
}

export default MotherDashboard
