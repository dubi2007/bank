import React from 'react'

const AccountInfo = ({ cuenta }) => {
  const infoItems = [
    {
      label: 'Tipo de Cuenta',
      value: cuenta.tpo_cta
    },
    {
      label: 'Número de Cuenta',
      value: cuenta.nro_cta,
      isMonospace: true
    },
    {
      label: 'CCI',
      value: cuenta.cci_cta,
      isMonospace: true
    }
  ]

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {infoItems.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
            <p className={`text-lg font-bold text-gray-900 ${item.isMonospace ? 'font-mono' : ''}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountInfo