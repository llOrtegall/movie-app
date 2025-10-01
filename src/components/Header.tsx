import { memo } from 'react'

const Header = memo(() => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
        Movie Search
      </h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Discover your favorite movies and series from our extensive database
      </p>
    </div>
  )
})

Header.displayName = 'Header'

export { Header }
