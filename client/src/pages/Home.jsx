import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const nav = useNavigate();
  return (
    <div className='bg-slate-800'>
        <main className='w-screen mt-10 px-44'>
          <section className=' flex justify-evenly gap-20 items-center w-full mt-16'>
            <div className='left  w-1/2 mt-10'>
              <p>We are the World best IT company</p>
              <h1 className='text-6xl font-semibold py-2 pb-5'>Welcome to Rahul Tech</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos molestias asperiores veritatis cum ab iste nemo possimus ea inventore praesentium voluptatum nostrum in, consequatur maxime soluta excepturi officiis a. Consequatur, omnis error similique fuga minus dolorem ducimus fugiat a iure voluptatibus facilis voluptas vel molestias magnam placeat voluptatem. Eveniet, consectetur.</p>
              <div className='flex gap-8 mt-12'>
                <Link to='/contact'>
                <button className='px-4 py-1 bg-blue-700 border-blue-700 border-2 rounded-xl hover:border-white'>Connect Now</button>
                </Link> 
                <button className='px-4 py-1 bg-transparent border-blue-700 border-2 rounded-xl hover:border-white'>Learn More</button>
              </div>
            </div>
            <div className='right w-1/2'>
              <img className='w-9/12' src='/images/home.png' />
            </div>
          </section>

          <section className='mt-20 w-full'>
            <div className='w-full bg-white text-black flex justify-around items-center gap-14 p-6 rounded-xl '>
              <div className='div1 text-center border-black border-r-2 px-10'>
                <h2 className='font-semibold text-4xl'>50+</h2>
                <p>registered companies</p>
              </div>
              <div className='div2 text-center border-black border-r-2 px-10'>
                <h2 className='font-semibold text-4xl'>100,00+</h2>
                <p>Happy Clients</p>
              </div>
              <div className='div3 text-center border-black border-r-2 px-10'>
                <h2 className='font-semibold text-4xl'>500+</h2>
                <p>Well known developers</p>
              </div>
              <div className='div4 text-center px-10'>
                <h2 className='font-semibold text-4xl'>24/7</h2>
                <p>Services</p>
              </div>
            </div>
          </section>

          <section className='flex justify-evenly gap-5 items-center w-full mt-20 px-16 pb-10'>
            <div className='left w-1/2'>
              <img className='w-2/3' src='/images/design.png' />
            </div>
            <div className='right w-1/2 mt-10'>
              <p>We are here to help you</p>
              <h1 className='text-6xl font-semibold py-2 pb-5'>Get Started Today</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos molestias asperiores veritatis cum ab iste nemo possimus ea inventore praesentium voluptatum nostrum in, consequatur maxime soluta excepturi officiis a.</p>
              <div className='flex gap-8 mt-12'>
                <button className='px-4 py-1 bg-blue-700 border-blue-700 border-2 rounded-xl hover:border-white'>Connect Now</button>
                <button className='px-4 py-1 bg-transparent border-blue-700 border-2 rounded-xl hover:border-white'>Learn More</button>
              </div>
            </div>
          </section>

        </main>
    </div>
  )
}
