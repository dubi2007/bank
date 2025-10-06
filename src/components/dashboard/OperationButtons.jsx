import React from 'react'
import { PlusCircle, MinusCircle, History } from 'lucide-react'

const OperationButtons = ({ onSelectOperation }) => {
  const operaciones = [
    {
      id: 'deposito',
      titulo: 'Depósito',
      descripcion: 'Agregar dinero a tu cuenta',
      icono: PlusCircle,
      color: 'bg-green-50 hover:bg-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      id: 'retiro',
      titulo: 'Retiro',
      descripcion: 'Retirar dinero de tu cuenta',
      icono: MinusCircle,
      color: 'bg-red-50 hover:bg-red-100',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200'
    },
    {
      id: 'historial',
      titulo: 'Historial',
      descripcion: 'Ver todos tus movimientos',
      icono: History,
      color: 'bg-purple-50 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {operaciones.map((operacion) => {
        const IconoComponent = operacion.icono
        return (
          <button
            key={operacion.id}
            onClick={() => onSelectOperation(operacion.id)}
            className={`
              bg-white rounded-xl p-6 border ${operacion.borderColor}
              ${operacion.color} transition-all duration-200
              shadow-sm hover:shadow-md group
              flex flex-col items-center space-y-4
              min-h-[140px] justify-center
            `}
          >
            <div className={`
              p-3 rounded-lg ${operacion.iconColor}
              group-hover:scale-110 transition-transform duration-200
            `}>
              <IconoComponent size={28} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {operacion.titulo}
              </h3>
              <p className="text-sm text-gray-600 leading-tight">
                {operacion.descripcion}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default OperationButtons