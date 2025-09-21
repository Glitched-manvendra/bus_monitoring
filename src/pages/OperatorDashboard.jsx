import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bus, MapPin, Clock, Users, Plus, Settings, BarChart3 } from 'lucide-react'
import { getBusesByOperator, mockOperators } from '../data/mockData'

function OperatorDashboard() {
  const [operator, setOperator] = useState(null)
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBus, setSelectedBus] = useState(null)

  useEffect(() => {
    // Simulate loading operator data
    setTimeout(() => {
      // In a real app, this would be based on the logged-in operator
      const operatorData = mockOperators[0] // KSRTC
      setOperator(operatorData)
      
      const operatorBuses = getBusesByOperator(operatorData.id)
      setBuses(operatorBuses)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!buses.length) return

    // Simulate real-time updates for operator buses
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          lastUpdated: new Date().toISOString(),
          // Simulate some movement and status changes
          eta: bus.status !== 'cancelled' ? 
            Math.max(1, parseInt(bus.eta) + Math.floor(Math.random() * 3) - 1) + ' mins' : 
            'N/A',
          speed: Math.max(20, bus.speed + Math.floor(Math.random() * 10) - 5)
        }))
      )
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [buses.length])

  const getStatusClass = (status) => {
    switch (status) {
      case 'on-time': return 'status-on-time'
      case 'delayed': return 'status-delayed'
      case 'early': return 'status-early'
      case 'cancelled': return 'status-cancelled'
      default: return 'status-on-time'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'on-time': return 'On Time'
      case 'delayed': return 'Delayed'
      case 'early': return 'Early'
      case 'cancelled': return 'Cancelled'
      default: return 'On Time'
    }
  }

  const handleBusStatusChange = (busId, newStatus) => {
    setBuses(prevBuses => 
      prevBuses.map(bus => 
        bus.id === busId 
          ? { ...bus, status: newStatus }
          : bus
      )
    )
  }

  if (loading) {
    return (
      <div className="operator-dashboard">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading operator dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="operator-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Operator Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back, {operator?.name} • Manage your fleet and routes
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline">
              <Settings className="btn-icon" />
              Settings
            </button>
            <button className="btn btn-primary">
              <Plus className="btn-icon" />
              Add Bus
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">
              <Bus />
            </div>
            <div className="stat-content">
              <div className="stat-number">{buses.length}</div>
              <div className="stat-label">Total Buses</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <MapPin />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {buses.filter(bus => bus.status === 'on-time').length}
              </div>
              <div className="stat-label">On Time</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Clock />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {buses.filter(bus => bus.status === 'delayed').length}
              </div>
              <div className="stat-label">Delayed</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Users />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {buses.reduce((total, bus) => total + bus.capacity, 0)}
              </div>
              <div className="stat-label">Total Capacity</div>
            </div>
          </div>
        </div>

        {/* Fleet Management */}
        <div className="fleet-section">
          <div className="section-header">
            <h2 className="section-title">Fleet Management</h2>
            <div className="section-actions">
              <button className="btn btn-outline">
                <BarChart3 className="btn-icon" />
                Analytics
              </button>
            </div>
          </div>

          <div className="fleet-grid">
            {buses.map(bus => (
              <div key={bus.id} className="fleet-card">
                <div className="fleet-header">
                  <div className="bus-info">
                    <h3 className="bus-route">{bus.route}</h3>
                    <p className="bus-number">{bus.number}</p>
                  </div>
                  <div className="bus-status">
                    <div className={`status-badge ${getStatusClass(bus.status)}`}>
                      {getStatusText(bus.status)}
                    </div>
                  </div>
                </div>

                <div className="fleet-details">
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{bus.type}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Capacity:</span>
                    <span className="detail-value">{bus.capacity} seats</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Speed:</span>
                    <span className="detail-value">{bus.speed} km/h</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">ETA:</span>
                    <span className="detail-value">{bus.eta}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Next Stop:</span>
                    <span className="detail-value">{bus.nextStop}</span>
                  </div>
                </div>

                <div className="fleet-actions">
                  <Link to={`/track/${bus.id}`} className="btn btn-outline">
                    <MapPin className="btn-icon" />
                    Track
                  </Link>
                  
                  <div className="status-controls">
                    <select 
                      value={bus.status}
                      onChange={(e) => handleBusStatusChange(bus.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="on-time">On Time</option>
                      <option value="delayed">Delayed</option>
                      <option value="early">Early</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Management */}
        <div className="routes-section">
          <h2 className="section-title">Route Management</h2>
          <div className="routes-grid">
            {operator?.routes.map(routeId => {
              const route = mockOperators.find(op => op.routes.includes(routeId))
              return route ? (
                <div key={routeId} className="route-card">
                  <div className="route-header">
                    <h3 className="route-name">{route.name}</h3>
                    <div className="route-meta">
                      <span>{route.distance}</span>
                      <span>{route.duration}</span>
                    </div>
                  </div>
                  <div className="route-actions">
                    <button className="btn btn-outline">Edit Route</button>
                    <button className="btn btn-outline">View Schedule</button>
                  </div>
                </div>
              ) : null
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-time">2 minutes ago</div>
              <div className="activity-content">
                Bus KA-01-AB-1234 status changed to "On Time"
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">15 minutes ago</div>
              <div className="activity-content">
                Bus KA-02-CD-5678 departed from Electronic City
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">1 hour ago</div>
              <div className="activity-content">
                New route "Bangalore to Mysore" added to fleet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperatorDashboard
