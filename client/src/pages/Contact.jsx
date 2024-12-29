import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth'
import { toast } from 'react-toastify';

export default function Contact() {

  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userData, setUserData] = useState(true);

  if(userData && user) {
    setValue('username', user.username);
    setValue('email', user.email);
    setUserData(false);
  }

  const onSubmit = useCallback(async(data) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}/api/form/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if(result.success) {
       toast.success("Your request has been sent successfully");
       navigate('/contact');
       reset(()=> {
        username = '',
        email = '',
        message = ''
       });
      } else {
        console.log("Unable to sent suggestion");
      }
    } catch (err) {
      console.error(err.message);
    }
  }, [reset] )

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className='min-h-screen bg-slate-800 px-44'>
    <section className='h-full'>
        <main className='p-3 w-full'>
          <div className='flex gap-32 w-full mt-3'>
            <div className='left-side w-1/2 h-full'>
            <span className='text-4xl font-semibold mr-60 border-b-4 border-blue-500 mb-7'>Contact Us</span>
            <img src= '/images/support.png'/>
            </div>
            <div className='right-side w-1/2 h-full'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-16 items-center w-full'>
                    <div className='flex flex-col gap-2 mt-8 w-full'>
                        <label htmlFor='username'>UserName:</label>
                        <input 
                        type='text' 
                        id='username' 
                        className='p-2 rounded-lg text-black'
                        autoComplete='off' 
                        required
                        {...register('username')} />
                    </div>

                    <div className='flex flex-col gap-2 mt-4 w-full'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email'
                        required
                         id='email' 
                         className='p-2 rounded-lg text-black'
                        {...register('email')} />
                    </div>

                    <div className='flex flex-col gap-2 mt-4 w-full'>
                        <label htmlFor='message'>Message:</label>
                        <textarea 
                         id="message"
                         className='p-2 rounded-lg text-black resize-none'
                          {...register('message',{required: true})} />
                    </div>

                    <button 
                    type='submit'
                    className='bg-blue-600 px-4 py-2 w-full rounded-2xl mt-8'
                    > Submit
                    </button>
                  </form>
            </div>
          </div>
        </main>
      </section>
  </div>
  )
}
