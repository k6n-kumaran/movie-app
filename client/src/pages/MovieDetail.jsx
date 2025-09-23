import { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-hot-toast'

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY; 
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate()
  const location = useLocation()

  const page = location.state?.page || 1


  const handleFavorite = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/favorites/add/${id}`, {
      method : "POST",
      headers : {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ movieId: id,  title : movie.title ,poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}) 
      }
     ) 
     const data = await res.json()

     if(!res.ok) {
        return toast.error(data.message || "Something went wrong");
     } 

     if(data.success) {
      return toast.success("Movie added to favorites!")
     } 
    } catch (error) {
      console.error("Failed to add favorite:", error);
      toast.error("Failed to add favorite")
    }
     
  }

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };
 
    fetchMovie();
  }, [id]);  

  if (!movie) return <p className="text-white">Loading...</p>;

  return (
      <div className="bg-[#1D2129] min-h-screen text-white px-6 py-10">
      
      {/* Title + Rating */}
      <div className="p-2">
         <div className="flex flex-col lg:flex-row  justify-between mb-6">
            <h2 className="text-4xl  font-bold">{movie.title}</h2>
            <div className="p-2 bg-[#333131] rounded-lg w-fit ">
               <span className="text-yellow-400 font-semibold text-sm sm:text-base md:text-lg">
                 ⭐ {movie.vote_average.toFixed(1)} / 10
               </span> 
        </div>
      </div>
      <div className="flex justify-between mb-6">
        <div>
          <p className="">{(movie.release_date).split('-')[0]} <span className="mx-2">•</span> {Math.floor(movie.runtime/60)}hr {(movie.runtime%60)}mins</p>

        </div>
      </div>
      </div>
     

      {/* Poster + Backdrop */}
      <div className="mb-8 ">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          className="rounded-2xl shadow-lg w-full max-h-[520px] object-cover  mb-4"
        />
        
      </div>

      {/* Genres */}
        <div className="flex flex-wrap gap-3 mb-6">
        {movie.genres.map((g) => (
          <span
            key={g.id}
            className="bg-purple-700 px-4 py-2 rounded-full text-sm font-medium"
          >
            {g.name}
          </span>
        ))}
        </div>
      
      

      {/* Overview */}
      <p className="text-lg leading-relaxed mb-6">{movie.overview}</p>

      {/* Extra Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <p><span className="font-bold">Release date:</span> {movie.release_date}</p>
        <p><span className="font-bold">Status:</span> {movie.status}</p>
        <p><span className="font-bold">Language:</span> {movie.original_language.toUpperCase()}</p>
        <p><span className="font-bold">Countries:</span> {movie.production_countries[0].name}</p>
        <p><span className="font-bold">Budget:</span> ${movie.budget.toLocaleString()}</p>
        <p><span className="font-bold">Revenue:</span> ${movie.revenue.toLocaleString()}</p>
        {movie.tagline && (
          <p><span className="font-bold">Tagline:</span> "{movie.tagline}"</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between">
        <button  onClick={()=>handleFavorite(id)}
        className="mt-8 inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-2xl shadow-md transition cursor-pointer">
          Add to Favorites
        </button>
        <button 
         onClick={() => navigate('/',{state : { page}})}
        className="mt-8 inline-block bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-2xl shadow-md transition  cursor-pointer text-center "
        >
          Back to Home
        </button>
      </div>
      </div>
  );
}

export default MovieDetail;
