import { memo } from 'react'

interface ErrorMessageProps {
  error: string | null
}

const ErrorMessage = memo(({ error }: ErrorMessageProps) => {
  if (!error) return null

  return (
    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
      <p className="text-red-300 text-sm font-medium">{error}</p>
    </div>
  )
})

ErrorMessage.displayName = 'ErrorMessage'

export { ErrorMessage }
