import { useCallback, useEffect, useState } from 'react'
import { getTours } from '../services/tourService'
import type { Tour } from '../types'

interface UseToursResult {
  tours: Tour[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Loads the tour catalog and exposes loading/error state plus a refetch helper.
 */
export function useTours(): UseToursResult {
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTours = useCallback(() => {
    setIsLoading(true)
    setError(null)

    getTours()
      .then(setTours)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Error al cargar los tours')
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    fetchTours()
  }, [fetchTours])

  return { tours, isLoading, error, refetch: fetchTours }
}
