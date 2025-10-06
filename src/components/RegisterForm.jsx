import React, { useState } from 'react'
import { UserPlus, Eye, EyeOff, Copy, Check, ArrowLeft, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { RegisterService } from '../services/registerService.js'

const RegisterForm = ({ onBackToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    dni: '',
    email: '',
    telefono: '',
    tipoCuenta: 'AHORRO',
    pin: '',
    confirmPin: '',
    saldoInicial: '0'
  })

  const [errors, setErrors] = useState({})
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [createdAccount, setCreatedAccount] = useState(null)
  const [copiedField, setCopiedField] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error específico cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      // Validar formulario
      const validation = RegisterService.validateFormData(formData)
      if (!validation.isValid) {
        setErrors(validation.errors)
        setLoading(false)
        toast.error('Por favor corrige los errores en el formulario')
        return
      }

      // Registrar cuenta
      const result = await RegisterService.registerNewAccount(formData)
      
      // Mostrar éxito
      setCreatedAccount(result)
      setShowSuccess(true)
      toast.success('¡Cuenta creada exitosamente!')

    } catch (error) {
      console.error('Error en registro:', error)
      toast.error(error.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      toast.success('Copiado al portapapeles')
      setTimeout(() => setCopiedField(''), 2000)
    } catch (error) {
      toast.error('Error al copiar')
    }
  }

  const handleContinueToLogin = () => {
    if (onRegisterSuccess) {
      onRegisterSuccess(createdAccount)
    } else {
      onBackToLogin()
    }
  }

  // Modal de éxito
  if (showSuccess && createdAccount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header de éxito */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <Check size={48} className="text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                ¡Cuenta Creada Exitosamente!
              </h1>
              <p className="text-green-100">
                Tu nueva cuenta bancaria está lista para usar
              </p>
            </div>

            {/* Información de la cuenta */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Datos personales */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Datos Personales
                  </h3>
                  
                  <div>
                    <label className="text-sm text-gray-600">Titular</label>
                    <p className="font-medium text-gray-900">
                      {createdAccount.cuenta.nom_tit} {createdAccount.cuenta.fir_ape_tit} {createdAccount.cuenta.sec_ape_tit}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">DNI</label>
                    <p className="font-mono text-gray-900">{createdAccount.cuenta.dni_tit}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-gray-900">{createdAccount.cuenta.eml_tit}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Teléfono</label>
                    <p className="font-mono text-gray-900">{createdAccount.cuenta.tlf_tit}</p>
                  </div>
                </div>

                {/* Datos de la cuenta */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Datos de la Cuenta
                  </h3>

                  <div>
                    <label className="text-sm text-gray-600">Tipo de Cuenta</label>
                    <p className="font-medium text-gray-900">{createdAccount.cuenta.tpo_cta}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Número de Cuenta</label>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-lg font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg flex-1">
                        {createdAccount.cuenta.nro_cta}
                      </p>
                      <button
                        onClick={() => handleCopy(createdAccount.cuenta.nro_cta, 'account')}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copiar número de cuenta"
                      >
                        {copiedField === 'account' ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">CCI</label>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex-1">
                        {createdAccount.cuenta.cci_cta}
                      </p>
                      <button
                        onClick={() => handleCopy(createdAccount.cuenta.cci_cta, 'cci')}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copiar CCI"
                      >
                        {copiedField === 'cci' ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Saldo Inicial</label>
                    <p className="text-2xl font-bold text-green-600">
                      S/ {parseFloat(createdAccount.cuenta.sld_cta).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información importante */}
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">📋 Información Importante:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Guarda tu número de cuenta y PIN en un lugar seguro</li>
                  <li>• Necesitarás estos datos para acceder a tu cuenta</li>
                  <li>• Tu PIN es: <span className="font-mono font-bold">••••</span> (el que configuraste)</li>
                </ul>
              </div>

              {/* Botón para continuar */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleContinueToLogin}
                  className="btn-primary px-8 py-3 flex items-center gap-2"
                >
                  <CreditCard size={20} />
                  Iniciar Sesión con mi Nueva Cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Formulario de registro
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBackToLogin}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al Login
          </button>
          
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-sm">
              <UserPlus size={32} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Nueva Cuenta
          </h1>
          
          <p className="text-gray-600">
            Completa el formulario para crear tu cuenta bancaria
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos Personales */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                📋 Datos Personales
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`input-clean w-full ${errors.nombre ? 'border-red-500' : ''}`}
                    placeholder="Ingresa tu nombre"
                    required
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primer Apellido *
                  </label>
                  <input
                    type="text"
                    name="primerApellido"
                    value={formData.primerApellido}
                    onChange={handleInputChange}
                    className={`input-clean w-full ${errors.primerApellido ? 'border-red-500' : ''}`}
                    placeholder="Primer apellido"
                    required
                  />
                  {errors.primerApellido && <p className="text-red-500 text-xs mt-1">{errors.primerApellido}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Segundo Apellido *
                  </label>
                  <input
                    type="text"
                    name="segundoApellido"
                    value={formData.segundoApellido}
                    onChange={handleInputChange}
                    className={`input-clean w-full ${errors.segundoApellido ? 'border-red-500' : ''}`}
                    placeholder="Segundo apellido"
                    required
                  />
                  {errors.segundoApellido && <p className="text-red-500 text-xs mt-1">{errors.segundoApellido}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DNI *
                  </label>
                  <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 8)
                      setFormData(prev => ({ ...prev, dni: value }))
                    }}
                    maxLength={8}
                    className={`input-clean w-full font-mono text-center ${errors.dni ? 'border-red-500' : ''}`}
                    placeholder="12345678"
                    required
                  />
                  {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input-clean w-full ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="tu@email.com"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 15)
                      setFormData(prev => ({ ...prev, telefono: value }))
                    }}
                    maxLength={15}
                    className={`input-clean w-full font-mono ${errors.telefono ? 'border-red-500' : ''}`}
                    placeholder="987654321"
                    required
                  />
                  {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                </div>
              </div>
            </div>

            {/* Configuración de Cuenta */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                🏦 Configuración de Cuenta
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Cuenta *
                  </label>
                  <select
                    name="tipoCuenta"
                    value={formData.tipoCuenta}
                    onChange={handleInputChange}
                    className={`input-clean w-full ${errors.tipoCuenta ? 'border-red-500' : ''}`}
                    required
                  >
                    <option value="AHORRO">Cuenta de Ahorro</option>
                    <option value="CORRIENTE">Cuenta Corriente</option>
                  </select>
                  {errors.tipoCuenta && <p className="text-red-500 text-xs mt-1">{errors.tipoCuenta}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saldo Inicial (Opcional)
                  </label>
                  <input
                    type="number"
                    name="saldoInicial"
                    value={formData.saldoInicial}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`input-clean w-full ${errors.saldoInicial ? 'border-red-500' : ''}`}
                    placeholder="0.00"
                  />
                  {errors.saldoInicial && <p className="text-red-500 text-xs mt-1">{errors.saldoInicial}</p>}
                </div>
              </div>
            </div>

            {/* Configuración de PIN */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                🔒 Configuración de Seguridad
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN de Seguridad (4 dígitos) *
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? 'text' : 'password'}
                      name="pin"
                      value={formData.pin}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                        setFormData(prev => ({ ...prev, pin: value }))
                      }}
                      maxLength={4}
                      className={`input-clean w-full font-mono text-center text-xl tracking-widest pr-12 ${errors.pin ? 'border-red-500' : ''}`}
                      placeholder="••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar PIN *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPin ? 'text' : 'password'}
                      name="confirmPin"
                      value={formData.confirmPin}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                        setFormData(prev => ({ ...prev, confirmPin: value }))
                      }}
                      maxLength={4}
                      className={`input-clean w-full font-mono text-center text-xl tracking-widest pr-12 ${errors.confirmPin ? 'border-red-500' : ''}`}
                      placeholder="••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPin(!showConfirmPin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPin ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPin && <p className="text-red-500 text-xs mt-1">{errors.confirmPin}</p>}
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onBackToLogin}
                className="btn-secondary flex-1 py-3"
                disabled={loading}
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner w-5 h-5"></div>
                    <span>Creando Cuenta...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    <span>Crear Cuenta</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm