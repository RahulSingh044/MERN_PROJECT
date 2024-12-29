import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify'


export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const {storerTokenInLS} = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Logged in successfully');
        storerTokenInLS(result.token);
        navigate('/');
      }
      else {
        toast.error(result.message);
      }
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <div className='min-h-screen bg-slate-800 px-44'>
      <section className='h-full'>
          <main className='px-20 py-20'>
            <div className='flex gap-8 w-full'>
              <div className='left-side w-1/2 h-1/3'>
                <img src= '/images/login.png'/>
              </div>
              <div className='register-form w-1/2 p-2 px-16 py-24'>
                  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full'>
                    <h1 className='text-4xl font-semibold  border-b-4 border-blue-500'>Login Form</h1>

                    <div className='flex flex-col gap-2 mt-4 w-full'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email'
                        required
                         id='email' 
                         className='p-2 rounded-lg text-black'
                        {...register('email', { required: true })} />
                    </div>

                    <div className='flex flex-col gap-2 mt-4 w-full'>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' className='p-2 rounded-lg text-black' {...register('password', { required: true })} />
                    </div>

                    <button 
                    type='submit'
                    className='bg-blue-600 px-4 py-2 w-full rounded-2xl mt-8'
                    > Log In
                    </button>
                  </form>
              </div>
            </div>
          </main>
        </section>
    </div>
  )
}
