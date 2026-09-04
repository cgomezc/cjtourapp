import { useCallback, useEffect, useState } from 'react'
import { getTourById } from '../services/tourService'
import type { Tour } from '../types'

interface UseTourDetailResult {
  tour: Tour | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Loads one tour by id and exposes loading/error state plus a refetch helper.
 */
export function useTourDetail(tourId: number): UseTourDetailResult {
  const [tour, setTour] = useState<Tour | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTour = useCallback(() => {
    setIsLoading(true)
    setError(null)

    getTourById(tourId)
      .then(setTour)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Error al cargar el tour')
      })
      .finally(() => setIsLoading(false))
  }, [tourId])

  useEffect(() => {
    fetchTour()
  }, [fetchTour])

  return { tour, isLoading, error, refetch: fetchTour }
}
