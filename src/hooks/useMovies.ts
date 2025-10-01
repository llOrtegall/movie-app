import { searchMovies, type MappMovies } from "../services/movies"
import { useRef, useState, useMemo, useCallback, useEffect } from "react"
import debounce from "just-debounce-it"

interface UseMoviesParams {
  search: string
  sort: boolean
  debounceMs?: number
}

export function useMovies({ search, sort, debounceMs = 800 }: UseMoviesParams) {
  const [resMovies, setResMovies] = useState<MappMovies>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const previousSearch = useRef(search)

  // Función interna para buscar películas
  const searchMoviesInternal = useCallback(async (searchTerm: string) => {
    if (searchTerm === previousSearch.current) return
    if (!searchTerm.trim()) {
      setResMovies([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = searchTerm
      const movies = await searchMovies(searchTerm)
      setResMovies(movies)
    } catch (error) {
      setError(error as string)
      setResMovies([])
    } finally {
      setLoading(false)
    }
  }, [])

  const debouncedSearch = useMemo(() =>
    debounce((searchTerm: string) =>
      searchMoviesInternal(searchTerm), debounceMs),
    [searchMoviesInternal, debounceMs]
  )

  const getMovies = useCallback((searchTerm: string) => {
    searchMoviesInternal(searchTerm)
  }, [searchMoviesInternal])

  useEffect(() => {
    debouncedSearch(search)
  }, [search, debouncedSearch])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...resMovies].sort((a, b) => a.title.localeCompare(b.title))
      : resMovies
  }, [sort, resMovies])

  return {
    movies: sortedMovies,
    getMovies,
    loading,
    error
  }
}
