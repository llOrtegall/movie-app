import { memo } from 'react'

const EmptyState = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-center space-y-4">
        <svg className="w-24 h-24 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v12h12V6H6zm3 3a1 1 0 112 0v6a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V9z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-300">No movies found</h3>
        <p className="text-gray-400 max-w-md">
          Try searching for your favorite movies or series using the search bar above
        </p>
      </div>
    </div>
  )
})

EmptyState.displayName = 'EmptyState'

export { EmptyState }
