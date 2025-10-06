import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = (cuenta) => {
    setUsuario(cuenta)
    setShowRegister(false)
  }

  const handleLogout = () => {
    setUsuario(null)
    setShowRegister(false)
  }

  const handleShowRegister = () => {
    setShowRegister(true)
  }

  const handleBackToLogin = () => {
    setShowRegister(false)
  }

  const handleRegisterSuccess = (accountData) => {
    // Auto-rellenar datos de login con la nueva cuenta
    setShowRegister(false)
    // Opcional: Podrías auto-logear al usuario aquí
    // handleLogin(accountData.cuenta)
  }

  return (
    <div className="app">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {usuario ? (
        <Dashboard cuentaInicial={usuario} onLogout={handleLogout} />
      ) : showRegister ? (
        <RegisterForm 
          onBackToLogin={handleBackToLogin}
          onRegisterSuccess={handleRegisterSuccess}
        />
      ) : (
        <Login 
          onLogin={handleLogin} 
          onShowRegister={handleShowRegister}
        />
      )}
    </div>
  )
}

export default App