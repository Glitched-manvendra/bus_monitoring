import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Bus, User, Eye, EyeOff, AlertCircle } from 'lucide-react'

function Login() {
  const [loginType, setLoginType] = useState('passenger')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      // Mock authentication - in real app, this would be an API call
      if (formData.email && formData.password) {
        const userData = {
          id: Date.now(),
          name: formData.name || (loginType === 'passenger' ? 'John Passenger' : 'Bus Operator'),
          email: formData.email,
          type: loginType,
          loginTime: new Date().toISOString()
        }
        
        login(userData)
        navigate(loginType === 'passenger' ? '/passenger' : '/operator')
      } else {
        setError('Please fill in all required fields')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <Bus className="login-icon" />
            <h1 className="login-title">Welcome to Track-My-Bus</h1>
            <p className="login-subtitle">Sign in to access your dashboard</p>
          </div>

          <div className="login-type-selector">
            <button
              className={`type-btn ${loginType === 'passenger' ? 'active' : ''}`}
              onClick={() => setLoginType('passenger')}
            >
              <User className="type-icon" />
              Passenger
            </button>
            <button
              className={`type-btn ${loginType === 'operator' ? 'active' : ''}`}
              onClick={() => setLoginType('operator')}
            >
              <Bus className="type-icon" />
              Bus Operator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {loginType === 'operator' && (
              <div className="input-group">
                <label htmlFor="name" className="label">Operator Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email" className="label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="label">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-large login-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <User className="btn-icon" />
                  Sign In as {loginType === 'passenger' ? 'Passenger' : 'Operator'}
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="demo-info">
              <strong>Demo Mode:</strong> Use any email and password to login
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
