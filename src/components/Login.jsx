import React, { useState } from 'react'
import { CreditCard, Lock, Eye, EyeOff, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { BankService } from '../services/bankService.js'

const Login = ({ onLogin }) => {
  const [nroCuenta, setNroCuenta] = useState('')
  const [pin, setPin] = useState('')
  const [mostrarPin, setMostrarPin] = useState(false)
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (nroCuenta.length !== 14) {
      toast.error('El número de cuenta debe tener 14 dígitos')
      return
    }
    
    if (pin.length !== 4) {
      toast.error('El PIN debe tener 4 dígitos')
      return
    }

    setCargando(true)
    
    try {
      const cuenta = await BankService.login(nroCuenta, pin)
      toast.success('¡Bienvenido!')
      onLogin(cuenta)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Lado izquierdo - Imagen y texto */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-2/3 left-1/2 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          {/* Ilustración de persona con tarjeta */}
          <div className="mb-8">
            <div className="relative">
              {/* Persona */}
              <div className="w-32 h-32 bg-white/20 rounded-full border-4 border-white/30 flex items-center justify-center mb-6 mx-auto">
                <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/50 rounded-full"></div>
                </div>
              </div>
              
              {/* Tarjetas flotantes */}
              <div className="absolute -top-4 -right-8">
                <div className="w-16 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-lg transform rotate-12 flex items-center justify-center">
                  <CreditCard size={12} className="text-yellow-800" />
                </div>
              </div>
              
              <div className="absolute -bottom-2 -left-8">
                <div className="w-16 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-lg transform -rotate-12 flex items-center justify-center">
                  <CreditCard size={12} className="text-green-800" />
                </div>
              </div>
              
              <div className="absolute top-8 -left-12">
                <div className="w-16 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg shadow-lg transform rotate-45 flex items-center justify-center">
                  <CreditCard size={12} className="text-purple-800" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Texto principal */}
          <h1 className="text-4xl font-bold mb-4">
            Banca Digital Segura
          </h1>
          
          <p className="text-xl text-blue-100 mb-6 max-w-md leading-relaxed">
            Accede a todos tus servicios bancarios de forma rápida y segura las 24 horas del día
          </p>
          
          {/* Características */}
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-800 text-sm">✓</span>
              </div>
              <span className="text-blue-100">Transferencias instantáneas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-800 text-sm">✓</span>
              </div>
              <span className="text-blue-100">Consulta de saldos en tiempo real</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-800 text-sm">✓</span>
              </div>
              <span className="text-blue-100">Máxima seguridad garantizada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-md w-full mx-auto">
          {/* Header del formulario */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-sm">
                <CreditCard size={32} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Iniciar Sesión
            </h2>
            
            <p className="text-gray-600">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Número de cuenta */}
              <div>
                <label 
                  htmlFor="nroCuenta" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Número de Cuenta
                </label>
                <input
                  id="nroCuenta"
                  type="text"
                  placeholder="Ingresa tu número de cuenta"
                  value={nroCuenta}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 14)
                    setNroCuenta(value)
                  }}
                  maxLength={14}
                  required
                  className="input-clean w-full text-center font-mono text-lg tracking-wider"
                />
                <div className="mt-2 flex justify-center">
                  <div className="flex space-x-1">
                    {[...Array(14)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          i < nroCuenta.length 
                            ? 'bg-blue-500' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {nroCuenta.length}/14 dígitos
                </p>
              </div>

              {/* PIN */}
              <div>
                <label 
                  htmlFor="pin" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  PIN de Seguridad
                </label>
                <div className="relative">
                  <input
                    id="pin"
                    type={mostrarPin ? 'text' : 'password'}
                    placeholder="••••"
                    value={pin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                      setPin(value)
                    }}
                    maxLength={4}
                    required
                    className="input-clean w-full text-center font-mono text-xl tracking-widest pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPin(!mostrarPin)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {mostrarPin ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="mt-2 flex justify-center">
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          i < pin.length 
                            ? 'bg-green-500' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {pin.length}/4 dígitos
                </p>
              </div>

              {/* Botón de login */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={cargando || nroCuenta.length !== 14 || pin.length !== 4}
                  className="btn-primary w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {cargando ? (
                    <>
                      <div className="spinner w-5 h-5"></div>
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={20} />
                      <span>Iniciar Sesión</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Footer de seguridad */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <Shield size={16} />
                <span className="text-sm">Conexión segura SSL</span>
              </div>
            </div>
          </div>

          {/* Datos de prueba */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-3 flex items-center gap-2">
              <CreditCard size={16} />
              Cuentas de Prueba
            </h4>
            <div className="grid gap-2 text-sm">
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="font-mono text-blue-700 text-xs">
                  <div><strong>Cuenta:</strong> 12345678901234</div>
                  <div><strong>PIN:</strong> 1234</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="font-mono text-blue-700 text-xs">
                  <div><strong>Cuenta:</strong> 98765432109876</div>
                  <div><strong>PIN:</strong> 5678</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login