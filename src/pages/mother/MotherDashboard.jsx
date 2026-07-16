import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { 
  FaPlus, 
  FaCalendarCheck, 
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
  const [nextAppointment, setNextAppointment] = useState(null)
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

      // 2. Fetch next appointment
      try {
        const appRes = await API.get('/appointments/next')
        if (appRes.data && appRes.data.success && appRes.data.data) {
          setNextAppointment(appRes.data.data)
        }
      } catch (err) {
        console.log('No upcoming appointment or error.', err)
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
        <button 
          className="btn btn-primary-custom d-flex align-items-center gap-2"
          onClick={() => navigate('/mother/recovery')}
        >
          <FaPlus />
          <span>Log Daily Recovery</span>
        </button>
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

      <div className="row g-4 mb-4">
        {/* Recovery Chart */}
        <div className="col-lg-8">
          <div className="premium-card h-100">
            {recoveryHistory.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-custom mb-0">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Pain Level</th>
                      <th>Temp (°C)</th>
                      <th>Wound</th>
                      <th>Bleeding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...recoveryHistory].reverse().slice(0, 5).map((rec, index) => (
                      <tr key={index}>
                        <td className="text-white fw-bold">{rec.recordDate}</td>
                        <td>
                          <span className={`badge ${rec.painLevel > 6 ? 'bg-danger' : 'bg-success'}`}>
                            {rec.painLevel}/10
                          </span>
                        </td>
                        <td>{rec.bodyTemperature}°C</td>
                        <td>
                          <span className={`badge ${rec.woundCondition === 'NORMAL' ? 'bg-success' : 'bg-danger'}`}>
                            {rec.woundCondition}
                          </span>
                        </td>
                        <td>{rec.bleedingLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center text-muted" style={{ height: '200px' }}>
                <FaHeartbeat size={48} className="mb-3 opacity-30" />
                <span>No recovery records logged yet. Begin logging to see your reports!</span>
              </div>
            )}
          </div>
        </div>

        {/* Next Appointment Card */}
        <div className="col-lg-4">
          <div className="premium-card h-100 d-flex flex-column justify-content-between">
            <div>
              <h3 className="h5 text-white mb-3" style={{ fontFamily: 'Outfit' }}>Upcoming Appointment</h3>
              {nextAppointment ? (
                <div className="bg-white bg-opacity-5 p-3 rounded-3 border border-color mb-3">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <FaCalendarCheck size={24} className="text-secondary" />
                    <div>
                      <div className="text-white fw-bold">{nextAppointment.purpose}</div>
                      <div className="text-muted small">{nextAppointment.appointmentDate} at {nextAppointment.appointmentTime}</div>
                    </div>
                  </div>
                  <hr className="border-color my-2" />
                  <div className="small text-muted">
                    <div><strong>Doctor:</strong> {nextAppointment.doctorName || 'Assigned Specialist'}</div>
                    <div><strong>Hospital:</strong> {nextAppointment.hospitalName || 'Clinic Center'}</div>
                  </div>
                  {nextAppointment.notes && (
                    <div className="mt-2 p-2 bg-black bg-opacity-20 rounded text-muted small">
                      {nextAppointment.notes}
                    </div>
                  )}
                  {nextAppointment.status === 'SCHEDULED' && (
                    <button 
                      className="btn btn-sm btn-primary-custom mt-3 w-100"
                      onClick={() => navigate('/mother/appointment')}
                    >
                      Confirm Attendance
                    </button>
                  )}
                  {nextAppointment.status === 'CONFIRMED' && (
                    <div className="badge bg-success w-100 py-2 mt-3">Attendance Confirmed</div>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <FaCalendarCheck size={36} className="mb-2 opacity-30" />
                  <div>No scheduled appointments.</div>
                </div>
              )}
            </div>
            
            <Link to="/mother/appointment" className="btn btn-secondary-custom w-100">
              View All Appointments
            </Link>
          </div>
        </div>
      </div>

      {/* Medications Quick List */}
      <div className="row g-4">
        <div className="col-md-12">
          <div className="premium-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h5 text-white mb-0" style={{ fontFamily: 'Outfit' }}>Today's Medications</h3>
              <Link to="/mother/medication" className="text-decoration-none small" style={{ color: 'var(--primary-light)' }}>
                Manage Medications
              </Link>
            </div>
            
            {medications.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-custom mb-0">
                  <thead>
                    <tr>
                      <th>Medication Name</th>
                      <th>Dosage & Frequency</th>
                      <th>Instructions</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.slice(0, 3).map((med, index) => (
                      <tr key={index}>
                        <td className="text-white fw-bold">{med.name}</td>
                        <td>{med.dosage} — {med.frequency}</td>
                        <td>{med.instructions || 'Take as directed'}</td>
                        <td>
                          <span className={`badge ${med.status === 'COMPLETED' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {med.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-muted py-4">
                <FaPills size={36} className="mb-2 opacity-30" />
                <div>No medications prescribed.</div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default MotherDashboard
