import React from 'react'
import { X, User, Phone, Mail, CreditCard, Hash, Building, Wallet } from 'lucide-react'

const UserInfoModal = ({ cuenta, isOpen, onClose, onEditUser }) => {
  if (!isOpen) return null

  const formatearSaldo = (saldo) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(saldo)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Mi Información</h2>
                <p className="text-sm text-gray-500">Datos de tu cuenta</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Usuario */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <User size={16} />
              Datos Personales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nombre Completo</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {cuenta.titular.nom_tit} {cuenta.titular.fir_ape_tit}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">DNI</p>
                <p className="font-semibold text-gray-900 text-sm font-mono">{cuenta.titular.dni_tit}</p>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
              <Mail size={16} />
              Información de Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-blue-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-600 mb-1">Correo Electrónico</p>
                  <p className="font-medium text-gray-900 text-sm break-all">{cuenta.titular.eml_tit}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-green-600 mb-1">Teléfono</p>
                  <p className="font-medium text-gray-900 text-sm">{cuenta.titular.tlf_tit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cuenta */}
          <div className="bg-purple-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
              <CreditCard size={16} />
              Información de Cuenta
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-purple-600 mb-1">Tipo de Cuenta</p>
                <p className="font-semibold text-gray-900 text-sm">{cuenta.tpo_cta}</p>
              </div>
              <div>
                <p className="text-xs text-purple-600 mb-1">Número</p>
                <p className="font-semibold text-gray-900 text-sm font-mono">{cuenta.nro_cta}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-purple-600 mb-1">CCI</p>
                <p className="font-semibold text-gray-900 text-sm font-mono break-all">{cuenta.cci_cta}</p>
              </div>
            </div>
          </div>

          {/* Saldo */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wallet size={20} className="text-white/80" />
              <p className="text-white/90 text-sm font-medium">Saldo Disponible</p>
            </div>
            <p className="text-white text-3xl font-bold">{formatearSaldo(cuenta.sld_cta)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-all duration-200"
            >
              Cerrar
            </button>
            <button
              onClick={onEditUser}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-sm"
            >
              Modificar Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoModal