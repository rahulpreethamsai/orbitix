import React, { useEffect, useState, useMemo } from 'react';
import FilterLogic from '../../Hooks/FilterLogic';
import Navbar from '../../smallCompo/Navbar/Navbar';
import { Link } from 'react-router-dom';
import API from '../../../services/api';

function AttractionsPage() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [typeFilter, setTypeFilter] = useState("name");
  const [filterValue, setFilterValue] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
  async function pageAttractions() {
    setLoading(true);
    try {
      const { data } = await API.get('/events/attractions');
      console.log('API response:', data);
      setAttractions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setAttractions([]);
    } finally {
      setLoading(false);
    }
  }
  pageAttractions();
}, []);
  
  const filteredEvents = useMemo(() => {
    return FilterLogic(attractions, typeFilter, filterValue, date, activeCategory);
  }, [attractions, typeFilter, filterValue, date, activeCategory]);

  // ... rest of your component code remains the same
  return (
    <main>
      <div className='min-h-screen w-full bg-black'>
        <Navbar/>
        <div className='bg-[#1F1F1F] flex flex-row justify-around items-center text-white p-4 sticky top-0 z-50'>
            <p className={`text-lg ${activeCategory == "All" ? "text-yellow-400 underline" : "hover:underline hover:text-yellow-400" } p-1 cursor-pointer`} onClick={() => setActiveCategory("All")}>All</p>
            <p className={`text-lg ${activeCategory == "Music" ? "text-green-500 underline" : "hover:underline hover:text-green-500"} p-1 cursor-pointer`} onClick={() => setActiveCategory("Music")}>Music</p>
            <p className={`text-lg ${activeCategory == "Sports" ? "text-orange-500 underline" : "hover:underline hover:text-orange-500"} p-1 cursor-pointer`} onClick={() => setActiveCategory("Sports")}>Sports</p>
        </div>
        <aside className='flex flex-row gap-5 p-6 justify-around'>
          <div className="flex flex-col justify-center items-center gap-4 p-10 h-60 bg-[#1F1F1F] rounded-xl shadow-2xl sticky top-30 z-100">
            <input 
              type="date" 
              className="w-full rounded-lg shadow-lg bg-blue-400 text-white p-2 border border-slate-600"
              value={date} 
              onChange={(e) => setDate(e.target.value)}
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-pink-400 text-white p-2 rounded-lg border border-black/60"
            >
              <option value="name">Name</option>
              <option value="city">City</option>
              <option value="classification">Classification</option>
              <option value="genre">Genre</option>
              <option value="subGenre">Sub Genre</option>
            </select>
            <input
              type="search"
              placeholder={`Search by ${typeFilter}...`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-full md:flex-grow rounded-lg shadow-lg bg-black/60 text-white p-2 border border-slate-600"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {loading ? (
              <p className="text-white">Is LOADING...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((item) => (
                <div
                  key={item.id}
                  className="relative group shadow-2xl hover:scale-105 hover:shadow-purple-500/50 rounded-xl transition-transform duration-300 cursor-pointer overflow-hidden h-full"
                >
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:blur-sm ease-in-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-bold drop-shadow">{item.name}</h3>
                    <p className="text-sm text-gray-300 uppercase tracking-wider drop-shadow-sm">
                      {item.classifications?.[0]?.segment?.name || 'Unknown Type'}
                    </p>
                  </div>
                  <Link to={`/attractions/${item.id}`}>
                    <div className='absolute bottom-10 right-3 bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='black'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5.25 5.653v12.694a.75.75 0 0 0 1.142.639l10.569-6.347a.75.75 0 0 0 0-1.278L6.392 5.014a.75.75 0 0 0-1.142.639Z'
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <img
                src='https://media4.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bnJpczExcjh2cm5pc3R1ZW5lencyeGN3a3c3N3lhNGNhaXU2cW1pNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OiC5BKaPVLl60/200.webp'
                alt='monkey-logo'
                className='mx-auto w-32 sm:w-40'
              />
            )}
</div>

        </aside>
      </div>
    </main>
  );
}

export default AttractionsPage;
