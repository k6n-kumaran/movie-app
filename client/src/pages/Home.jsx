import React, { useEffect, useState } from 'react'
import Search from '../components/Search.jsx'
import Spinner from '../components/Spinner'
import MovieCard from '../components/MovieCard'
import {useDebounce}  from 'react-use'
import Navbar from '../components/Navbar.jsx'
import  {ChevronLeft, ChevronRight} from 'lucide-react'
import { useLocation } from 'react-router-dom'

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY =  import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const Home = () => {

  const location = useLocation()

  const [searchTerm,setSearchTerm] = useState("")
  const [movies,setMovies] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const [debouncedSerchTerm, setDebouncedSearchTerm] = useState("")
  const [page,setPage] = useState(location.state?.page || 1)
  const [totalPages, setTotalPages] = useState(1);
  


  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm)
  }, 500, [searchTerm])

  const fetchMovies = async  (query = "") => {

    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint  = query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`Failed to fetch movies`);
      }

      const data = await response.json()

      if(data.Response === "False") {
        setErrorMessage(data.Error || "failed to fetch Movies");
        setMovies([])
        return;
      }

      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB max 500
      
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
     fetchMovies(debouncedSerchTerm)
  },[debouncedSerchTerm,page])

  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   }, [page]);
  
  return (
    <main>
        <div className='wrapper'>
            {/* Header */}
            <header className='mb-10'>
                <Navbar />

                <img src="./hero.png" alt="Hero Background" />
                <h1>Find <span className='text-gradient '>Movies </span> You'll Enjoy Without The Hassle</h1> 
                 <p className={` mt-2 text-gray-400 text-center italic`}>Discover your next favorite movie with ease. Search, explore, and enjoy!</p>
            </header>

            {/* Search Bar */}
            <div>
              <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Movies */}
            <section className='all-movies mt-8'>
              <h2  className=''>Movies</h2>

              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {movies.map((movie) => (
                    <li key={movie.id}>
                      <MovieCard movie={movie} page={page}/>
                    </li>
                  ))}
                </ul>
              )}
            </section>

             {/* Pagination */}
            <div>
              <div className="flex justify-between items-center px-6 md:px-10  mt-6">
               <button
                 className={`px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer`}          
                 onClick={() => setPage((prev) => prev - 1)}
                 disabled={page === 1}
                 aria-label="Previous page"
               >
                <ChevronLeft  aria-hidden={true} />
               </button>
               <span className="text-white">
                 {page} / {totalPages}
               </span>

               <button
                 className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
                 onClick={() => setPage((prev) => prev + 1)}
                 disabled={page === totalPages}
                 aria-label="Next page"
               >
                <ChevronRight aria-hidden={true} />
               </button>
              </div>
            </div>
        </div>
    </main>
  )
}

export default Home
