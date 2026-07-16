import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Role not authorized, redirect to their proper dashboard
    if (role === 'MOTHER') return <Navigate to="/mother" replace />
    if (role === 'DOCTOR') return <Navigate to="/doctor" replace />
    if (role === 'ADMIN') return <Navigate to="/admin" replace />
    
    // Default fallback
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
