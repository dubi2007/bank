import React, { useState } from 'react'
import { MinusCircle, ArrowLeft, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'
import { BankService } from '../../services/bankService.js'

const RetiroComponent = ({ cuenta, onSuccess }) => {
  const [monto, setMonto] = useState('')
  const [cargando, setCargando] = useState(false)

  const formatearSaldo = (saldo) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(saldo)
  }

  const handleRetiro = async (e) => {
    e.preventDefault()
    const montoNum = parseFloat(monto)
    
    if (montoNum <= 0) {
      toast.error('El monto debe ser mayor a 0')
      return
    }

    if (montoNum > cuenta.sld_cta) {
      toast.error('Saldo insuficiente')
      return
    }

    setCargando(true)
    try {
      await BankService.retirar(cuenta.idn_cta, montoNum)
      toast.success('Retiro realizado exitosamente')
      setMonto('')
      onSuccess()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <MinusCircle size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Realizar Retiro</h2>
              <p className="text-red-100">Retira dinero de tu cuenta de forma segura</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Saldo disponible */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6 border border-blue-200">
            <div className="flex items-center gap-3">
              <Wallet size={24} className="text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Saldo disponible</p>
                <p className="text-2xl font-bold text-blue-900">{formatearSaldo(cuenta.sld_cta)}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleRetiro} className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Monto a retirar
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">
                  S/
                </span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  max={cuenta.sld_cta}
                  className="w-full pl-12 pr-4 py-4 text-2xl font-bold text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Máximo disponible: {formatearSaldo(cuenta.sld_cta)}
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 text-sm">Importante</h4>
                  <p className="text-amber-700 text-sm mt-1">
                    Verifica el monto antes de confirmar. Los retiros se procesan de forma inmediata.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
              >
                <ArrowLeft size={20} />
                Cancelar
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                {cargando ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <MinusCircle size={20} />
                    Realizar Retiro
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

export default RetiroComponent