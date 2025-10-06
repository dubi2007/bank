import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null)

  const handleLogin = (cuenta) => {
    setUsuario(cuenta)
  }

  const handleLogout = () => {
    setUsuario(null)
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
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App