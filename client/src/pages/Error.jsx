import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error() {
  return (
    <div className='h-screen w-screen p-8 text-center'>
        <div className="content">
            <h2 className='text-8xl font-extrabold'>404</h2>
            <h4 className='mt-2 font-bold text-xl mb-3'>Sorry! Page not found</h4>
            <p>
                Oops! It seems like the page you're trying to access doesn't exist.
                If you <br />believe there's an issue, feel free to report it, and we'll
                look into it.
            </p>
        </div>
        <div className="buttons flex gap-8 justify-center items-center mt-3">
            <button className='px-4 py-1 bg-transparent text-blue-600 border-blue-700 border-2 rounded-full hover:border-white'>
             <NavLink to="/">Return Home</NavLink>
            </button>
            <button className='px-4 py-1 bg-transparent text-blue-600 border-blue-700 border-2 rounded-full hover:border-white'>
             <NavLink to="/contact">Report Problem</NavLink>
            </button>
            
        </div>
    </div>
  )
}
