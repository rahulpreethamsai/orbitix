import React from 'react'
import Navbar from '../../smallCompo/Navbar/Navbar'
import EventTicketButton from '../../smallCompo/EventButton/EventTicketButton'
import EventSearch from '../../smallCompo/EventSearch/EventSearch'
import About from '../../smallCompo/OurEvents/OurEvents'
import AboutUs from '../AboutUsPage/AboutPage'
import Footer from '../FooterPage/Footer'

function Home() {
  return (
    <>
      {/* bg-[url(https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] */}
      <div className='w-full min-h-screen bg-black font-roboto text-white p-4'>
        <div className='bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/fs/755d9d17643801.562bcb7615047.png)] bg-center h-180 bg-cover flex flex-col gap-100'>
        <Navbar/>
        <div className='mr-10'>
            <p className='text-2xl text-right font-light mr-10 text-shadow-lg/30'>Your city. <span className='text-blue-400'>Your events.</span> Your vibe.</p>
            <div className='flex justify-end p-4'>
                <button className="group flex cursor-pointer items-center border-none">
                    <span className="relative pb-5 pr-[15px] text-lg font-semibold uppercase tracking-[4px] text-pink-400 mr-auto 
                                     after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full 
                                     after:origin-bottom-right after:scale-x-0 after:bg-white 
                                     after:transition-transform after:duration-250 after:ease-out 
                                     group-hover:after:origin-bottom-left group-hover:after:scale-x-100">
                        Festival Creativity
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="10"
                        viewBox="0 0 46 16"
                        className="-translate-x-2 -translate-y-2 fill-current transition-all duration-300 ease-out 
                                   group-hover:translate-x-0 group-active:scale-90"
                    >
                        <path
                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                        transform="translate(30)"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className='ml-20'>
            <EventTicketButton/>
        </div>
        </div>
        {/* <img className="size-7 animate-bounce bg-white rounded-3xl flex mx-auto" src='https://www.svgrepo.com/show/335016/arrow-down.svg' /> */}
            {/* <div> */}
                {/* <h1 className='text-9xl text-left font-sans font-bold tracking-[0.2em] ml-10 text-[#FF13F0]'>EVENT</h1> */}
                {/* <img src='https://th.bing.com/th/id/R.676487120eba08aefafe0321f9a66168?rik=YmuhnyZmo2xJHQ&riu=http%3a%2f%2fmedia.giphy.com%2fmedia%2fbZvgdYFhBqeK4%2fgiphy.gif&ehk=xID%2bbMR%2fB9cTqECAC0n2mDZntJ9ZBWgv7JcrEczRhPs%3d&risl=&pid=ImgRaw&r=0' className='mx-auto h-'/> */}
                {/* <hr className='text-gray-400 w-[20%] mt-3'/> */}
            {/* </div>      
            <div> */}
                {/* <h1 className='text-9xl text-right font-sans font-bold tracking-[0.2em] mr-10 text-blue-400'>PARTY</h1> */}
                {/* <img src='https://31.media.tumblr.com/tumblr_m02bnyoJRm1r3sps0o1_500.gif' className='p-10 w-100 ml-auto'/> */}
                {/* <hr className='text-gray-400 ml-auto w-[20%] mt-3'/> */}
            {/* </div> */}
        </div>
      </div>
      <main className='bg-black p-4'>
        <EventSearch/>
      </main>
      <About/>
      <AboutUs/>
      <Footer/>
    </>
  )
}

export default Home