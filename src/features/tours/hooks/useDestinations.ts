import { useCallback, useEffect, useState } from 'react'
import { getDestinations } from '../services/destinationService'
import type { Destination } from '../types'

interface UseDestinationsResult {
  destinations: Destination[]
  isLoading: boolean
  error: string | null
}

export function useDestinations(): UseDestinationsResult {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDestinations = useCallback(() => {
    setIsLoading(true)
    setError(null)

    getDestinations()
      .then(setDestinations)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Error al cargar los destinos')
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    fetchDestinations()
  }, [fetchDestinations])

  return { destinations, isLoading, error }
}
