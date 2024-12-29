import React from 'react'
import { useAuth } from '../store/Auth'

export default function Services() {
  
  const { service } = useAuth()
  return (
    <section className='w-screen px-44 mt-8 mb-6'>
      <div className='container'>
        <span className='text-6xl border-b-8 border-blue-700'>Services</span>
      </div>

      
        <div className='cards-container grid grid-cols-3 gap-10 mt-16'>
        {service && service.map((serv, index) => {
          const { services, description, duration, price} = serv;
          return (
            <div className='cards border-2 rounded-lg p-3' key={index}>
          <div className='image pl-6'>
            <img src="images/design.png" alt="" width='300px'/>
          </div>
          <div className='content pl-10 mb-6'>
              <div className='grid grid-cols-2 justify-between mb-3'>
                <p>{duration}</p>
                <p>{price}</p>
              </div>
              <h2 className='text-2xl font-bold mb-2'>{services}</h2>
              <p className='text-sm'>{description}</p>
          </div>
        </div>
          )
        
      })}
       </div>
      
    </section>
  )
}
