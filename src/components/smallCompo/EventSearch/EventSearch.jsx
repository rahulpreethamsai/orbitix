import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link
import API from "../../../services/api"; // Correctly import your API service

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

function EventSearch() {
  const [events, setEvents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState('');
  const scrollRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      setIsLoading(true);
      setError(null);
      try {
        // Correct: Fetch from your own backend API
        const { data } = await API.get("/events");
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Could not fetch events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvent();
  }, []);

  // Simplified filtering for your own database structure
  const filteredEvents = events.filter((event) => {
    const nameMatch = event.name?.toLowerCase().includes(inputValue.toLowerCase());
    // Compare just the date part, ignoring time
    const dateMatch = date ? new Date(event.date).toISOString().startsWith(date) : true;
    return nameMatch && dateMatch;
  });

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return {
      day: dateObj.getDate(),
      month: dateObj.toLocaleString("default", { month: "short" })
    };
  };

  return (
    <>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div className="p-6 flex flex-col gap-10 relative min-h-screen text-white bg-black">
        <h1 className="text-4xl tracking-[0.3em] font-bold text-center mb-6 mt-10">TRENDING FOR YOU</h1>
        
        <div className="flex flex-row justify-around items-center gap-10 mb-8 w-2xl mx-auto">
          <input
            type="search"
            placeholder='Search For Event'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-lg shadow-lg bg-black text-white p-2 border border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            placeholder='Search For Date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-white p-2 rounded-lg shadow-2xl text-black" 
          />
        </div>
        
        {isLoading ? (<p className="text-center text-gray-400">Loading Events...</p>)
        : error ? (<p className="text-center text-red-500">{error}</p>)
        : filteredEvents.length > 0 ? (
          <div className="relative">
            <div ref={scrollRef} className="flex gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth p-4">
              {filteredEvents.map((event) => {
                const { day, month } = formatDate(event.date);
                return (
                  <Link to={`/events/${event._id}`} key={event._id}>
                    <div className="snap-start flex-shrink-0 w-62 h-[300px] rounded-2xl relative overflow-hidden shadow-2xl group transition-all duration-300 ease-in-out hover:shadow-purple-500/50 cursor-pointer">
                        <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                        <div className="text-right">
                            <p className="text-3xl font-bold drop-shadow">{day}</p>
                            <p className="text-sm uppercase tracking-widest drop-shadow-sm">{month}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold drop-shadow">{event.name}</h3>
                            <p className="text-sm text-gray-300 uppercase tracking-wider drop-shadow-sm">{event.venue}</p>
                        </div>
                        </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <button onClick={scrollLeft} className="absolute top-1/2 -translate-y-1/2 left-0 bg-black/50 hover:bg-black text-white p-3 rounded-full shadow-lg z-10">
              <ChevronLeftIcon />
            </button>
            <button onClick={scrollRight} className="absolute top-1/2 -translate-y-1/2 right-0 bg-black/50 hover:bg-black text-white p-3 rounded-full shadow-lg z-10">
              <ChevronRightIcon />
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-400">No Events Found</p>
        )}
      </div>
    </>
  );
}

export default EventSearch;