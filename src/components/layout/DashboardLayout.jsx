import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import Footer from './Footer.jsx'
import './layout.css'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar isOpen={sidebarOpen} onCloseSidebar={handleCloseSidebar} />
      
      <div className="main-content-wrapper">
        <Topbar onToggleSidebar={handleToggleSidebar} />
        
        <main className="page-body-container">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
