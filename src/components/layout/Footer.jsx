import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer-container">
      <div>
        &copy; {currentYear} <strong>MamaHealth</strong>. All rights reserved.
      </div>
      <div className="d-none d-md-flex gap-3">
        <a href="#privacy" className="text-decoration-none text-muted-hover text-reset small">Privacy Policy</a>
        <a href="#terms" className="text-decoration-none text-muted-hover text-reset small">Terms of Service</a>
      </div>
    </footer>
  )
}

export default Footer
