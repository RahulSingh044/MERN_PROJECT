import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen bg-slate-800 px-44'>
    <section className='h-full mt-20'>
        <main className='p-3 w-full'>
          <div className='flex gap-32 w-full mt-3'>
            <div className='left-side w-1/2 h-full'>
              <h2 className='text-sm'>Welcome, Rahul Tech.</h2>
              <h1 className='text-4xl font-bold'>
                Why Choose us?
              </h1>
              <p className='mt-2 leading-2'>
                Expertise: Our team consist of experienced IT proffesionals who are passionate about staying up-to-date with the latest industry trends.<br /><br />

                Customization: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, earum optio consectetur ipsa et rerum cumque nesciunt, eum dolores minima deserunt accusantium aperiam maxime non?<br /><br />

                Affordability: Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia temporibus repellendus obcaecati!<br /><br />

                Reliability: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus culpa similique et minima dolorum cumque excepturi fugit soluta quidem laudantium.<br /><br />

              </p>

              <div className='flex gap-8 mt-12'>
                <button className='px-4 py-1 bg-blue-700 border-blue-700 border-2 rounded-xl hover:border-white'>Connect Now</button>
                <button className='px-4 py-1 bg-transparent border-blue-700 border-2 rounded-xl hover:border-white'>Learn More</button>
              </div>
            </div>
            <div className='right-side w-1/2 h-full'>
              <img src= '/images/about.png'/>
            </div>
          </div>
        </main>
      </section>
  </div>
  )
}
