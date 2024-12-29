import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'

export default function Navbar() {

    const navigate = useNavigate();
    const {isLoggedIn,LogoutUser} = useAuth();

    const navItems = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'About',
            path: '/about',
        },
        {
            name: 'Contact',
            path: '/contact',
        },
        {
            name: 'Services',
            path: '/services',
        }] 

        // Conditionally add 'Login'/'Register' or 'Logout' based on authentication status
        if (isLoggedIn) {
          navItems.push({
            name: 'Logout',
            path: '/logout',
            onClick:LogoutUser,
          });
        } else {
          navItems.push(
            {
              name: 'Login',
              path: '/login',
            },
            {
              name: 'Register',
              path: '/register',
            }
          );
        }


  return (
    <>
      <header>
            <nav className='flex justify-between text-lg items-center w-full text-blue-600 bg-slate-800 px-44'>
                <div className='logo'>
                    <Link to='/'>
                     <h2 className='text-xl'>RAHUL MERN</h2>
                    </Link>
                </div>
                <ul className='flex gap-5'>
                    {navItems && navItems.map((items) => (
                        <li key={items.name} className='speed:200 hover:border-b-2 pb-1 border-blue-500 hover:text-white active:text-white'>
                            <button  
                            onClick={() => navigate(items.path)}
                            className='inline-bock px-4 pt-4  '>
                            {items.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
      </header>
    </>
  )
}
