import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Bus, User, LogOut, MapPin, Sun, Moon } from 'lucide-react'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Bus className="brand-icon" />
            <span>Track My Bus</span>
          </Link>
          
          <div className="navbar-menu">
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  <User className="user-icon" />
                  <span className="user-name">
                    {user?.name} ({user?.type === 'passenger' ? 'Passenger' : 'Operator'})
                  </span>
                </div>
                
                <div className="navbar-actions">
                  <button onClick={toggleTheme} className="btn btn-outline theme-toggle">
                    {isDarkMode ? <Sun className="btn-icon" /> : <Moon className="btn-icon" />}
                    {isDarkMode ? 'Light' : 'Dark'}
                  </button>
                  
                  {user?.type === 'passenger' ? (
                    <Link to="/passenger" className="btn btn-outline">
                      <MapPin className="btn-icon" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/operator" className="btn btn-outline">
                      <MapPin className="btn-icon" />
                      Dashboard
                    </Link>
                  )}
                  
                  <button onClick={handleLogout} className="btn btn-secondary">
                    <LogOut className="btn-icon" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={toggleTheme} className="btn btn-outline theme-toggle">
                  {isDarkMode ? <Sun className="btn-icon" /> : <Moon className="btn-icon" />}
                  {isDarkMode ? 'Light' : 'Dark'}
                </button>
                <Link to="/login" className="btn btn-primary">
                  <User className="btn-icon" />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
