import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBell, FaSignOutAlt, FaBars } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Topbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate()
  const email = localStorage.getItem('email') || 'user@mamahealth.com'
  const role = localStorage.getItem('role') || 'MOTHER'

  const handleLogout = () => {
    localStorage.clear()
    toast.info('Logged out successfully.')
    navigate('/login')
  }

  // Get initials for avatar
  const getInitials = (emailStr) => {
    if (!emailStr) return 'M'
    return emailStr.substring(0, 2).toUpperCase()
  }

  return (
    <header className="topbar-container">
      <div className="d-flex align-items-center gap-3">
        <button 
          className="btn text-white d-lg-none p-0 border-0" 
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars size={20} />
        </button>
        <h2 className="topbar-title">MamaHealth Monitoring</h2>
      </div>

      <div className="topbar-actions">
        <div className="topbar-notifications" title="Notifications">
          <FaBell />
          <span className="notification-badge"></span>
        </div>

        <div className="topbar-user">
          <div className="user-avatar" title={email}>
            {getInitials(email)}
          </div>
          <div className="user-info d-none d-sm-flex">
            <span className="user-email">{email}</span>
            <span className="user-role-badge">{role.toLowerCase()}</span>
          </div>
        </div>

        <button 
          className="btn btn-link text-muted p-0 border-0 d-flex align-items-center justify-content-center"
          onClick={handleLogout}
          title="Logout"
          style={{ transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
        >
          <FaSignOutAlt size={18} />
        </button>
      </div>
    </header>
  )
}

export default Topbar
