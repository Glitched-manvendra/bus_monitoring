import React from 'react'
import { Link } from 'react-router-dom'
import { Bus, MapPin, Clock, Users, ArrowRight } from 'lucide-react'

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Track Your Bus in Real-Time
            </h1>
            <p className="hero-description">
              Never miss your bus again. Get live updates on bus locations, 
              arrival times, and route information with our advanced tracking system.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary btn-large">
                <MapPin className="btn-icon" />
                Start Tracking
                <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose BusTracker?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <MapPin />
              </div>
              <h3 className="feature-title">Real-Time Tracking</h3>
              <p className="feature-description">
                Track buses in real-time with live GPS updates and accurate location data.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Clock />
              </div>
              <h3 className="feature-title">Accurate ETAs</h3>
              <p className="feature-description">
                Get precise arrival times based on current traffic and route conditions.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h3 className="feature-title">Dual Access</h3>
              <p className="feature-description">
                Separate dashboards for passengers and bus operators with tailored features.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Bus />
              </div>
              <h3 className="feature-title">Route Management</h3>
              <p className="feature-description">
                Comprehensive route information and bus schedules for better planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join thousands of passengers and operators who trust BusTracker for reliable bus tracking.
            </p>
            <div className="cta-actions">
              <Link to="/login" className="btn btn-primary btn-large">
                <Users className="btn-icon" />
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
