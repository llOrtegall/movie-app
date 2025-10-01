import { useState, useCallback } from "react";
import { useSearch } from "./hooks/useSearch";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";
import { ErrorMessage } from "./components/ErrorMessage";
import { EmptyState } from "./components/EmptyState";

function App() {
  const [sort, setSort] = useState(false);
  const { error, search, setSearch } = useSearch();
  const { movies, getMovies } = useMovies({ search, sort });

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearch(newSearch);
  }, [setSearch]);

  const handleSortChange = useCallback(() => {
    setSort(prev => !prev);
  }, []);

  const handleSubmit = useCallback((searchTerm: string) => {
    getMovies(searchTerm);
  }, [getMovies]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <Header />
          
          <SearchForm
            search={search}
            sort={sort}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onSubmit={handleSubmit}
          />

          <ErrorMessage error={error} />
        </header>

        <main className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Search Results</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <section className="min-h-[400px]">
            {movies && movies.length > 0 ? (
              <Movies movies={movies} />
            ) : (
              <EmptyState />
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
