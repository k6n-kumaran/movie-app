import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function FavMovie({ movie, onRemove }) {

    const navigate = useNavigate();

    const handleRemove = (e) => {
      e.stopPropagation();
      onRemove(movie.movieId);
    }
    
  return (
    <div className="bg-gray-900 mt-4  text-white rounded-2xl shadow-lg overflow-hidden w-60 hover:scale-102 transition-transform duration-300  cursor-pointer" 
    onClick={() => navigate(`/movie/${movie.movieId}`)}>
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-80 object-cover"
        />
        <button
          onClick={(e) => handleRemove(e)}
          className="absolute top-2 right-2 bg-black/70 p-2 rounded-full hover:bg-red-500 transition"
         >
          <X className="w-5 h-5 text-red-400" />
        </button>
      </div>
      <div className="p-3" >
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
      </div>
    </div>
  );
}




