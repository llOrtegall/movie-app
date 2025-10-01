import { type MovieDetails } from "../types/moviesApiTypes"
import { getMovieDetails } from "../services/movies"
import { useEffect, useState } from "react"

export function MovieDetails({ onClose, id }: { onClose: () => void, id: string }) {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getMovieDetails(id)
      .then((movie) => setMovie(movie))
      .catch((error) => console.error('Error fetching movie details:', error))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <div className="relative rounded-2xl bg-white p-8">
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <div className="relative rounded-2xl bg-white p-8">
              <div className="text-center">
                <p className="text-red-600 text-lg">Error loading movie details</p>
                <button 
                  onClick={onClose}
                  className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-2xl">
            {/* Header with close button */}
            <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white/90 backdrop-blur-sm border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-3xl font-bold text-gray-900 truncate">{movie.Title}</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Poster Section */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="relative group">
                      <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
                        alt={movie.Title}
                        className="w-full rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-movie.jpg'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Ratings */}
                    {movie.Ratings && movie.Ratings.length > 0 && (
                      <div className="mt-6 space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">Ratings</h3>
                        {movie.Ratings.map((rating, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">{rating.Source}</span>
                            <span className="text-sm font-bold text-gray-900">{rating.Value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Info Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-600 font-medium">Year</p>
                      <p className="text-lg font-bold text-blue-900">{movie.Year}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-green-600 font-medium">Runtime</p>
                      <p className="text-lg font-bold text-green-900">{movie.Runtime}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-purple-600 font-medium">Rated</p>
                      <p className="text-lg font-bold text-purple-900">{movie.Rated}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-orange-600 font-medium">IMDb</p>
                      <p className="text-lg font-bold text-orange-900">{movie.imdbRating}/10</p>
                    </div>
                  </div>

                  {/* Plot */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Plot</h3>
                    <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Director</h4>
                        <p className="text-gray-700">{movie.Director}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Writer</h4>
                        <p className="text-gray-700">{movie.Writer}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Actors</h4>
                        <p className="text-gray-700">{movie.Actors}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Genre</h4>
                        <div className="flex flex-wrap gap-2">
                          {movie.Genre.split(', ').map((genre, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Released</h4>
                        <p className="text-gray-700">{movie.Released}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Language</h4>
                        <p className="text-gray-700">{movie.Language}</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Country:</span> <span className="text-gray-700">{movie.Country}</span></div>
                      <div><span className="font-medium">Box Office:</span> <span className="text-gray-700">{movie.BoxOffice}</span></div>
                      <div><span className="font-medium">Awards:</span> <span className="text-gray-700">{movie.Awards}</span></div>
                      <div><span className="font-medium">IMDb Votes:</span> <span className="text-gray-700">{movie.imdbVotes}</span></div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="flex justify-end pt-4">
                    <button 
                      onClick={onClose}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}