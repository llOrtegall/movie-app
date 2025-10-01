import { memo, type ChangeEvent, type FormEvent } from 'react'

interface SearchFormProps {
  search: string
  sort: boolean
  onSearchChange: (value: string) => void
  onSortChange: () => void
  onSubmit: (search: string) => void
}

const SearchForm = memo(({ 
  search, 
  sort, 
  onSearchChange, 
  onSortChange, 
  onSubmit 
}: SearchFormProps) => {
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    onSubmit(search)
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(ev.target.value)
  }

  return (
    <form 
      className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20" 
      onSubmit={handleSubmit}
    >
      <div className="flex-1 w-full sm:w-auto">
        <input
          type="text"
          name="query"
          placeholder="Avengers, John Wick, Matrix ..."
          className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 shadow-sm"
          value={search}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
        <label htmlFor="sort" className="text-sm font-medium text-white whitespace-nowrap">
          Sort by title
        </label>
        <input
          type="checkbox"
          name="sort"
          id="sort"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          onChange={onSortChange}
          checked={sort}
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </span>
      </button>
    </form>
  )
})

SearchForm.displayName = 'SearchForm'

export { SearchForm }
