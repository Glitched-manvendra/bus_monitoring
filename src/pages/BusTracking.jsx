import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Bus, Navigation, RefreshCw } from 'lucide-react'
import { getBusById, mockRoutes } from '../data/mockData'

function BusTracking() {
  const { busId } = useParams()
  const [bus, setBus] = useState(null)
  const [route, setRoute] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const busData = getBusById(busId)
      if (busData) {
        setBus(busData)
        // Find the route for this bus
        const busRoute = mockRoutes.find(r => r.buses.includes(busId))
        setRoute(busRoute)
      }
      setLoading(false)
    }, 1000)
  }, [busId])

  useEffect(() => {
    if (!bus) return

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBus(prevBus => ({
        ...prevBus,
        lastUpdated: new Date().toISOString(),
        // Simulate some movement
        eta: prevBus.status !== 'cancelled' ? 
          Math.max(1, parseInt(prevBus.eta) + Math.floor(Math.random() * 3) - 1) + ' mins' : 
          'N/A',
        speed: Math.max(20, prevBus.speed + Math.floor(Math.random() * 10) - 5)
      }))
      setLastUpdated(new Date())
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [bus])

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

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString()
  }

  if (loading) {
    return (
      <div className="bus-tracking">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading bus information...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!bus) {
    return (
      <div className="bus-tracking">
        <div className="container">
          <div className="error-container">
            <h2>Bus not found</h2>
            <p>The requested bus could not be found.</p>
            <Link to="/passenger" className="btn btn-primary">
              <ArrowLeft className="btn-icon" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bus-tracking">
      <div className="container">
        {/* Header */}
        <div className="tracking-header">
          <Link to="/passenger" className="back-btn">
            <ArrowLeft className="btn-icon" />
            Back to Dashboard
          </Link>
          <div className="header-info">
            <h1 className="tracking-title">Bus Tracking</h1>
            <p className="tracking-subtitle">Real-time location and status updates</p>
          </div>
          <div className="last-updated">
            <RefreshCw className="refresh-icon" />
            <span>Last updated: {formatTime(lastUpdated)}</span>
          </div>
        </div>

        {/* Bus Information */}
        <div className="bus-info-card">
          <div className="bus-header">
            <div className="bus-route">
              <h2 className="route-name">{bus.route}</h2>
              <p className="bus-number">{bus.number} • {bus.operator}</p>
            </div>
            <div className="bus-status">
              <div className={`status-badge ${getStatusClass(bus.status)}`}>
                {getStatusText(bus.status)}
              </div>
              <div className="eta-display">
                <div className="eta">{bus.eta}</div>
                <div className="eta-label">ETA</div>
              </div>
            </div>
          </div>

          <div className="bus-details-grid">
            <div className="detail-card">
              <Bus className="detail-icon" />
              <div className="detail-content">
                <div className="detail-label">Bus Type</div>
                <div className="detail-value">{bus.type}</div>
              </div>
            </div>
            
            <div className="detail-card">
              <MapPin className="detail-icon" />
              <div className="detail-content">
                <div className="detail-label">Current Location</div>
                <div className="detail-value">{bus.currentLocation.address}</div>
              </div>
            </div>
            
            <div className="detail-card">
              <Clock className="detail-icon" />
              <div className="detail-content">
                <div className="detail-label">Next Stop</div>
                <div className="detail-value">{bus.nextStop}</div>
              </div>
            </div>
            
            <div className="detail-card">
              <Navigation className="detail-icon" />
              <div className="detail-content">
                <div className="detail-label">Speed</div>
                <div className="detail-value">{bus.speed} km/h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="map-container">
          <div className="map-placeholder">
            <MapPin className="map-icon" />
            <h3>Interactive Map</h3>
            <p>Real-time bus location would be displayed here</p>
            <div className="map-coordinates">
              <span>Lat: {bus.currentLocation.lat}</span>
              <span>Lng: {bus.currentLocation.lng}</span>
            </div>
          </div>
        </div>

        {/* Route Information */}
        {route && (
          <div className="route-section">
            <h3 className="section-title">Route Information</h3>
            <div className="route-card">
              <div className="route-header">
                <h4 className="route-name">{route.name}</h4>
                <div className="route-meta">
                  <span>{route.distance}</span>
                  <span>{route.duration}</span>
                </div>
              </div>
              
              <div className="route-stops">
                <div className="stops-timeline">
                  {route.stops.map((stop, index) => (
                    <div key={index} className="stop-timeline-item">
                      <div className="stop-timeline-dot"></div>
                      <div className="stop-timeline-content">
                        <div className="stop-name">{stop.name}</div>
                        <div className="stop-time">{stop.time}</div>
                      </div>
                      {index < route.stops.length - 1 && (
                        <div className="stop-timeline-line"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Updates */}
        <div className="live-updates">
          <h3 className="section-title">Live Updates</h3>
          <div className="updates-list">
            <div className="update-item">
              <div className="update-time">{formatTime(bus.lastUpdated)}</div>
              <div className="update-content">
                Bus is currently at {bus.currentLocation.address}
              </div>
            </div>
            <div className="update-item">
              <div className="update-time">{formatTime(new Date(Date.now() - 300000))}</div>
              <div className="update-content">
                Bus departed from previous stop
              </div>
            </div>
            <div className="update-item">
              <div className="update-time">{formatTime(new Date(Date.now() - 600000))}</div>
              <div className="update-content">
                Bus is running on schedule
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusTracking
