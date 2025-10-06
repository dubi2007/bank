import React, { useState } from 'react'
import { X, User, Phone, Mail, Hash, Save, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { BankService } from '../../services/bankService.js'

const EditUserModal = ({ cuenta, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    telefono: cuenta?.titular?.tlf_tit || '',
    correo: cuenta?.titular?.eml_tit || ''
  })
  const [cargando, setCargando] = useState(false)

  if (!isOpen) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validaciones
    if (!formData.telefono.trim()) {
      toast.error('El teléfono es requerido')
      return
    }
    
    if (!formData.correo.trim()) {
      toast.error('El correo es requerido')
      return
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.correo)) {
      toast.error('Formato de correo inválido')
      return
    }

    // Validar teléfono (solo números y longitud)
    const phoneRegex = /^\d{9,15}$/
    if (!phoneRegex.test(formData.telefono)) {
      toast.error('El teléfono debe tener entre 9 y 15 dígitos')
      return
    }

    setCargando(true)
    try {
      await BankService.actualizarDatosUsuario(cuenta.titular.idn_tit, {
        telefono: formData.telefono,
        correo: formData.correo
      })
      toast.success('Datos actualizados correctamente')
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(error.message || 'Error al actualizar datos')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Modificar Datos</h2>
                <p className="text-sm text-gray-500">Actualiza tu información</p>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Datos no editables */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
              <Lock size={16} />
              Datos Protegidos
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                <User size={16} className="text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Nombre Completo</p>
                  <p className="font-medium text-gray-600 text-sm">
                    {cuenta.titular.nom_tit} {cuenta.titular.fir_ape_tit}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                <Hash size={16} className="text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">DNI</p>
                  <p className="font-medium text-gray-600 text-sm font-mono">{cuenta.titular.dni_tit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Datos editables */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Información de Contacto</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Número de Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                  placeholder="999 999 999"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Solo números, entre 9 y 15 dígitos</p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={cargando}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              {cargando ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={18} />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUserModal