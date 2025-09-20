import React from 'react';
import { Link } from 'react-router-dom' 

const EventTicketButton = () => {

  return (
    <Link to='/events'>
    <button
      className="group relative flex h-16 w-64 cursor-pointer items-center justify-start overflow-hidden rounded-lg border border-neutral-800 bg-neutral-800 p-3 text-left text-base font-bold text-gray-50
                 duration-500 before:duration-500 after:duration-500
                 hover:border-rose-300 hover:duration-500 hover:text-rose-300 hover:underline hover:underline-offset-4 hover:decoration-2
                 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {/* Before pseudo-element for the violet blur */}
      <span
        className="absolute right-1 top-1 z-10 h-12 w-12 rounded-full bg-violet-500 blur-lg content-[''] 
                   transition-all duration-500 ease-out group-hover:right-12 group-hover:-bottom-8 group-hover:h-20 group-hover:w-20 group-hover:blur-xl group-hover:[box-shadow:_20px_20px_20px_30px_#a21caf]"
      ></span>
      {/* After pseudo-element for the rose blur */}
      <span
        className="absolute right-8 top-3 z-10 h-20 w-20 rounded-full bg-rose-300 blur-lg content-[''] 
                   transition-all duration-500 ease-out group-hover:-right-8 group-hover:h-28 group-hover:w-28 group-hover:blur-xl"
      ></span>

      {/* Main Ticket Body */}
      <div className="relative z-20 flex h-full flex-grow items-center justify-center rounded-l-md px-4 py-2">
        <span className="whitespace-nowrap">BROWSE EVENTS</span>
      </div>
    </button>
    </Link>
  );
};

export default EventTicketButton;