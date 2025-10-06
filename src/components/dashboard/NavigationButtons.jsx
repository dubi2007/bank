import React from 'react'
import { LogOut, Wallet, UserCircle } from 'lucide-react'

const NavigationButtons = ({ vistaActual, onNavigateHome, onLogout, onShowUserInfo }) => {
  return (
    <div className="flex items-center space-x-3">
      {vistaActual !== 'home' && (
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
        >
          <Wallet size={20} />
          <span className="hidden sm:block">Inicio</span>
        </button>
      )}
      <button 
        onClick={onShowUserInfo} 
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
      >
        <UserCircle size={20} />
        <span className="hidden sm:block">Mi Info</span>
      </button>
      <button 
        onClick={onLogout} 
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
      >
        <LogOut size={20} />
        <span className="hidden sm:block">Salir</span>
      </button>
    </div>
  )
}

export default NavigationButtons