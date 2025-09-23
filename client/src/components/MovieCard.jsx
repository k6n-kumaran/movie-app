import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";


const MovieCard = ({movie : {id,title,vote_average, poster_path, release_date, original_language},page}) => {

  const navigate = useNavigate()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}      // hidden below
      whileInView={{ opacity: 1, y: 0 }}   // animate when visible
      viewport={{ once: true, amount: 0.1 }} // trigger once when 20% visible
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
       onClick={() => navigate(`/movie/${id}`,{state : { page}})}
       className=" cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-dark-200 to-dark-100 
       hover:bg-gradient-to-br hover:from-dark-100 hover:to-dark-200 hover:scale-101 hover:shadow-xl transition-all duration-300"
    >     
  {/* Poster */}
     <div className="relative">
      <img
       src={
        poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : "/no-movie.png"
      }
      alt={title}
      className="w-full h-85 object-cover"
      />
      {/* Rating badge (top-right corner) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-lg text-yellow-400 text-sm font-medium">
        <img src="/star.svg" alt="star icon" className="w-4 h-4" />
        {vote_average ? vote_average.toFixed(1) : "N/A"}
      </div>
     </div>

  {/* Info section */}
     <div className="p-3 text-white">
       <h3 className="text-lg font-semibold truncate">{title}</h3>

       <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
         <p className="uppercase">{original_language}</p>
         <span>•</span>
         <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>
       </div>
     </div>
    </motion.div>

  )
}

export default MovieCard
