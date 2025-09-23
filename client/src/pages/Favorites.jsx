import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-hot-toast'
import FavMovie from '../components/FavMovie';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Favorites = () => {

  const [favorites,setFavorites] = useState([])
  

  useEffect(() => {
    const fetchFavorites = async () => {
        const res = await fetch(`${API_BASE}/api/favorites`, {
      method : "GET",
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })  

    const data = await res.json()
    console.log(data.favorites);
    
    if(data.success) setFavorites(data.favorites)
    }

    fetchFavorites()
    console.log(favorites);
    

  },[])

  const handleRemoveFavorite = async (movieId) => {
      const res = await fetch(`${API_BASE}/api/favorites/remove/${movieId}`, {
        method : "DELETE",
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        },
        body : JSON.stringify({movieId})
      })

      const data = await res.json()
      if(data.success){
        setFavorites(favorites.filter((movie) => movie.movieId !== movieId))
        toast.success("Movie removed from favorites")
        } else {
          toast.error(data.message)
        }
      console.log(data);

  }  
 
  return (
    <div className='px-4 sm:px-8 md:px-16 lg:px-24 py-4 min-h-screen bg-gradient-to-b from-black to-gray-900'>
      <Navbar />
      <div>
         <h2 className='mt-10 text-white text-3xl font-semibold  ml-5'>Favorites</h2>

          {favorites.length > 0 ?  (
            <div className='grid place-items-center  grid-cols-1  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 mt-6 '>
              {favorites.map((movie) => (
                <div key={movie.movieId}>
                  <FavMovie  movie={movie} onRemove={handleRemoveFavorite} />
                </div>
              
              ))}
              </div>) : (
                <div className='flex flex-col justify-center items-center h-[50vh] '>
                  <h3 className='text-white text-2xl  font-medium'>Nothing in Favorites</h3>
                </div>
             
             )}
         
      </div>
    </div>
  )
}

export default Favorites



// grid  grid-cols-1  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  