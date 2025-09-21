import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import PassengerDashboard from './pages/PassengerDashboard'
import OperatorDashboard from './pages/OperatorDashboard'
import BusTracking from './pages/BusTracking'
import './App.css'

function ProtectedRoute({ children, userType }) {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (userType && user?.type !== userType) {
    return <Navigate to="/" replace />
  }
  
  return children
}

function AppContent() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/passenger" 
              element={
                <ProtectedRoute userType="passenger">
                  <PassengerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/operator" 
              element={
                <ProtectedRoute userType="operator">
                  <OperatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/track/:busId" element={<BusTracking />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
