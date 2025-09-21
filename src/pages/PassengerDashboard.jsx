import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Clock, Bus, ArrowRight, Filter } from 'lucide-react'
import { mockBuses, mockRoutes, searchBuses } from '../data/mockData'

function PassengerDashboard() {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [searchResults, setSearchResults] = useState([])
  const [allBuses, setAllBuses] = useState(mockBuses)
  const [filteredBuses, setFilteredBuses] = useState(mockBuses)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAllBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          lastUpdated: new Date().toISOString(),
          // Simulate some movement
          eta: bus.status !== 'cancelled' ? 
            Math.max(1, parseInt(bus.eta) + Math.floor(Math.random() * 3) - 1) + ' mins' : 
            'N/A'
        }))
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      if (searchData.from && searchData.to) {
        const results = searchBuses(searchData.from, searchData.to)
        setSearchResults(results)
        // Filter buses based on search results
        const routeIds = results.map(route => route.id)
        const filtered = allBuses.filter(bus => 
          routeIds.some(routeId => 
            mockRoutes.find(route => route.id === routeId)?.buses.includes(bus.id)
          )
        )
        setFilteredBuses(filtered)
      } else {
        setFilteredBuses(allBuses)
      }
      setLoading(false)
    }, 1000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }))
  }

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

  return (
    <div className="passenger-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Find Your Bus</h1>
          <p className="dashboard-subtitle">Search and track buses in real-time</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-grid">
            <div className="input-group">
              <label htmlFor="from" className="label">From</label>
              <input
                type="text"
                id="from"
                name="from"
                value={searchData.from}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter departure city"
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="to" className="label">To</label>
              <input
                type="text"
                id="to"
                name="to"
                value={searchData.to}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter destination city"
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="date" className="label">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={searchData.date}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>
            
            <div className="input-group">
              <button type="submit" className="btn btn-primary search-btn" disabled={loading}>
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <Search className="btn-icon" />
                    Search Buses
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <h2 className="results-title">Available Routes</h2>
            {searchResults.map(route => (
              <div key={route.id} className="route-card">
                <div className="route-header">
                  <h3 className="route-name">{route.name}</h3>
                  <div className="route-info">
                    <span className="route-distance">{route.distance}</span>
                    <span className="route-duration">{route.duration}</span>
                  </div>
                </div>
                <div className="route-stops">
                  <div className="stop-list">
                    {route.stops.map((stop, index) => (
                      <div key={index} className="stop-item">
                        <div className="stop-dot"></div>
                        <span className="stop-name">{stop.name}</span>
                        <span className="stop-time">{stop.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bus List */}
        <div className="buses-section">
          <div className="section-header">
            <h2 className="section-title">Available Buses</h2>
            <div className="filter-options">
              <button className="btn btn-outline">
                <Filter className="btn-icon" />
                Filter
              </button>
            </div>
          </div>

          <div className="buses-list">
            {filteredBuses.map(bus => (
              <div key={bus.id} className="bus-card">
                <div className="bus-header">
                  <div className="bus-route">
                    <h3 className="route-name">{bus.route}</h3>
                    <p className="bus-number">{bus.number} • {bus.operator}</p>
                  </div>
                  <div className="bus-timing">
                    <div className="eta">{bus.eta}</div>
                    <div className="eta-label">ETA</div>
                    <div className={`status-badge ${getStatusClass(bus.status)}`}>
                      {getStatusText(bus.status)}
                    </div>
                  </div>
                </div>

                <div className="bus-details">
                  <div className="detail-item">
                    <Bus className="detail-icon" />
                    <span>{bus.type}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin className="detail-icon" />
                    <span>{bus.currentLocation.address}</span>
                  </div>
                  <div className="detail-item">
                    <Clock className="detail-icon" />
                    <span>Next: {bus.nextStop}</span>
                  </div>
                  <div className="detail-item">
                    <span>Speed: {bus.speed} km/h</span>
                  </div>
                </div>

                <div className="bus-actions">
                  <Link to={`/track/${bus.id}`} className="btn btn-primary">
                    <MapPin className="btn-icon" />
                    Track Bus
                    <ArrowRight className="btn-icon" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-number">{filteredBuses.length}</div>
            <div className="stat-label">Available Buses</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {filteredBuses.filter(bus => bus.status === 'on-time').length}
            </div>
            <div className="stat-label">On Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {filteredBuses.filter(bus => bus.status === 'delayed').length}
            </div>
            <div className="stat-label">Delayed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassengerDashboard
