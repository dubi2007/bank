import React, { useState, useEffect } from 'react'
import { 
  User, 
  Eye, 
  EyeOff, 
  TrendingUp,
  Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'
import { BankService } from '../services/bankService.js'
import { 
  DepositoComponent, 
  RetiroComponent, 
  HistorialComponent,
  NavigationButtons,
  OperationButtons,
  AccountInfo,
  UserInfoModal,
  EditUserModal
} from './dashboard/index.js'

const Dashboard = ({ cuentaInicial, onLogout }) => {
  const [cuenta, setCuenta] = useState(cuentaInicial)
  const [mostrarSaldo, setMostrarSaldo] = useState(true)
  const [vistaActual, setVistaActual] = useState('home')
  const [cargando, setCargando] = useState(false)
  const [mostrarInfoUsuario, setMostrarInfoUsuario] = useState(false)
  const [mostrarEditarUsuario, setMostrarEditarUsuario] = useState(false)

  const actualizarCuenta = async () => {
    try {
      const cuentaActualizada = await BankService.getCuentaInfo(cuenta.idn_cta)
      setCuenta(cuentaActualizada)
    } catch (error) {
      console.error('Error al actualizar cuenta:', error)
    }
  }

  const formatearSaldo = (saldo) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(saldo)
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderHome = () => (
    <div className="space-y-8">
      {/* Tarjeta de Saldo Principal */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Saldo Disponible</h2>
                <p className="text-blue-100">Tu dinero siempre seguro</p>
              </div>
            </div>
            <button
              onClick={() => setMostrarSaldo(!mostrarSaldo)}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"
            >
              {mostrarSaldo ? <EyeOff size={24} className="text-white" /> : <Eye size={24} className="text-white" />}
            </button>
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <div className={`text-5xl font-bold text-gray-900 transition-all duration-500 ${
              mostrarSaldo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              {mostrarSaldo ? formatearSaldo(cuenta.sld_cta) : '••••••'}
            </div>
            <div className="flex justify-center items-center gap-2 mt-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium text-sm">Cuenta Activa</span>
            </div>
          </div>

          {/* Información de la cuenta */}
          <AccountInfo cuenta={cuenta} />
        </div>
      </div>

      {/* Botones de Operaciones */}
      <OperationButtons onSelectOperation={setVistaActual} />
    </div>
  )

  const renderCurrentView = () => {
    switch (vistaActual) {
      case 'deposito':
        return <DepositoComponent cuenta={cuenta} onSuccess={actualizarCuenta} />
      case 'retiro':
        return <RetiroComponent cuenta={cuenta} onSuccess={actualizarCuenta} />
      case 'historial':
        return <HistorialComponent cuenta={cuenta} />
      default:
        return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Información del usuario */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {cuenta.titular.nom_tit} {cuenta.titular.fir_ape_tit}
                </h3>
                <p className="text-sm text-gray-500">{cuenta.titular.eml_tit}</p>
              </div>
            </div>
            
            {/* Botones de navegación */}
            <NavigationButtons 
              vistaActual={vistaActual}
              onNavigateHome={() => setVistaActual('home')}
              onLogout={onLogout}
              onShowUserInfo={() => setMostrarInfoUsuario(true)}
            />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>

      {/* Modales */}
      <UserInfoModal
        cuenta={cuenta}
        isOpen={mostrarInfoUsuario}
        onClose={() => setMostrarInfoUsuario(false)}
        onEditUser={() => {
          setMostrarInfoUsuario(false)
          setMostrarEditarUsuario(true)
        }}
      />

      <EditUserModal
        cuenta={cuenta}
        isOpen={mostrarEditarUsuario}
        onClose={() => setMostrarEditarUsuario(false)}
        onSuccess={actualizarCuenta}
      />
    </div>
  )
}

export default Dashboard