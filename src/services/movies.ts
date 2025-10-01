import type { Movie, MovieResponse, MovieDetails } from "../types/moviesApiTypes"

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

export type MappMovies = Awaited<ReturnType<typeof searchMovies>>

export async function searchMovies(search: string) {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`)
    const data: MovieResponse = await response.json()

    return data.Search?.map((m: Movie) => ({
      id: m.imdbID,
      title: m.Title,
      year: m.Year,
      image: m.Poster
    }))
    
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar películas")
  }
}

export async function getMovieDetails(id: string) {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}`)
    const data: MovieDetails = await response.json()

    return data
    
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar películas")
  }
}