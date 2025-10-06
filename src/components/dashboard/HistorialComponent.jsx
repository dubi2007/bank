import React, { useState, useEffect } from 'react'
import { History, PlusCircle, MinusCircle, Calendar, Filter } from 'lucide-react'
import toast from 'react-hot-toast'
import { BankService } from '../../services/bankService.js'

const HistorialComponent = ({ cuenta }) => {
  const [operaciones, setOperaciones] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarHistorial()
  }, [])

  const cargarHistorial = async () => {
    try {
      const historial = await BankService.getHistorialOperaciones(cuenta.idn_cta)
      setOperaciones(historial)
    } catch (error) {
      toast.error('Error al cargar historial')
    } finally {
      setCargando(false)
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

  const procesarOperacion = (operacion) => {
    if (operacion.deposito) {
      return {
        tipo: 'Depósito',
        monto: operacion.deposito.mnt_dep,
        fecha: operacion.fch_ope,
        icono: <PlusCircle size={20} />,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      }
    } else if (operacion.retiro) {
      return {
        tipo: 'Retiro',
        monto: operacion.retiro.mnt_ret,
        fecha: operacion.fch_ope,
        icono: <MinusCircle size={20} />,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      }
    }
    return null
  }

  if (cargando) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Cargando historial...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <History size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Historial de Operaciones</h2>
                <p className="text-purple-100">Tus últimos movimientos bancarios</p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all">
              <Filter size={18} />
              Filtrar
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {operaciones.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <History size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay operaciones</h3>
              <p className="text-gray-500">Aún no has realizado ningún movimiento en tu cuenta</p>
            </div>
          ) : (
            <div className="space-y-4">
              {operaciones.map((operacion) => {
                const op = procesarOperacion(operacion)
                if (!op) return null

                return (
                  <div
                    key={operacion.idn_ope}
                    className={`${op.bgColor} border ${op.borderColor} rounded-xl p-4 hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${op.bgColor} border ${op.borderColor} rounded-xl flex items-center justify-center`}>
                          <div className={op.color}>
                            {op.icono}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{op.tipo}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} />
                            <span>{formatearFecha(op.fecha)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${op.color}`}>
                          {op.tipo === 'Depósito' ? '+' : '-'}{formatearSaldo(op.monto)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistorialComponent