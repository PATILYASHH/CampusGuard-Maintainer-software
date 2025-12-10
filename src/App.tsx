import { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import Auth from './components/Auth'
import AddDevice from './components/AddDevice'
import AddLog from './components/AddLog'
import Dashboard from './components/Dashboard'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import './styles/animations.css'

type Page = 'dashboard' | 'add-device' | 'add-log'

function App() {
  const { user, loading, signOut } = useAuth()
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner">
          <i className="bi bi-arrow-repeat"></i>
        </div>
        <p>Loading CampusGuard...</p>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <i className="bi bi-shield-check"></i>
            <span>CampusGuard</span>
          </div>
          <div className="nav-links">
            <button
              className={currentPage === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentPage('dashboard')}
            >
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </button>
            <button
              className={currentPage === 'add-device' ? 'active' : ''}
              onClick={() => setCurrentPage('add-device')}
            >
              <i className="bi bi-plus-circle"></i>
              <span>Add Device</span>
            </button>
            <button
              className={currentPage === 'add-log' ? 'active' : ''}
              onClick={() => setCurrentPage('add-log')}
            >
              <i className="bi bi-clipboard-data"></i>
              <span>Add Log</span>
            </button>
          </div>
          <div className="nav-user">
            <div className="user-info">
              <i className="bi bi-person-circle"></i>
              <span>{user.email}</span>
            </div>
            <button onClick={signOut} className="logout-btn">
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'add-device' && <AddDevice />}
        {currentPage === 'add-log' && <AddLog />}
      </main>
    </div>
  )
}

export default App
