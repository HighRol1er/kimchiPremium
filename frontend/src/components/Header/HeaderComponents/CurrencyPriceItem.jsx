import React from 'react'

const CurrencyPriceItem = ({ icon: Icon, price }) => {
  return (
    <div className='flex gap-2'>
      <Icon className="h-6 w-6 bg-blue-600 rounded-full" />
      <p className='pr-2'>{price} 원</p>
    </div>
  )
}

export default CurrencyPriceItem