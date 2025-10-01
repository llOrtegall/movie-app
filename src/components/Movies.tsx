import { type MappMovies } from '../services/movies'
import { MovieDetails } from './MovieDetails'
import { useState } from 'react'

export function Movies({ movies }: { movies: MappMovies }) {
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState('')
  
  const handleClickMovie = (id: string) => {
    setId(id)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setId('')
    setShowModal(false)
  }

  return (
    <>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {movies.map((movie) => (
        <li 
        key={movie.id}
        className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-200"
        >
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img 
              src={movie.image} 
              alt={movie.title}
              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              />
            
            {/* Year badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full shadow-lg">
                {movie.year}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
              {movie.title}
            </h3>
            
            {/* IMDb indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">IMDb</span>
              </div>
              
              {/* View button */}
              <button 
              onClick={() => handleClickMovie(movie.id)} 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium cursor-pointer">
                View
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
    
    {showModal && (
      <MovieDetails onClose={handleCloseModal} id={id}/>
    )}
    </>
  )
}