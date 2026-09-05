import { useCallback, useEffect, useState } from 'react'
import { getTourById, updateTour } from '../services/tourService'
import type { Tour, UpdateTourPayload } from '../types'

interface UseTourDetailResult {
  tour: Tour | null
  isLoading: boolean
  error: string | null
  refetch: () => void
  saveTour: (payload: UpdateTourPayload) => Promise<Tour>
  isSaving: boolean
  saveError: string | null
}

/**
 * Loads one tour by id and exposes loading/error state plus a refetch helper.
 * Also exposes a `saveTour` mutation used to persist edits via PUT /api/tours/{id}.
 */
export function useTourDetail(tourId: number): UseTourDetailResult {
  const [tour, setTour] = useState<Tour | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

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

  const saveTour = useCallback(
    (payload: UpdateTourPayload) => {
      setIsSaving(true)
      setSaveError(null)

      return updateTour(tourId, payload)
        .then((updatedTour) => {
          setTour(updatedTour)
          return updatedTour
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Error al guardar el tour'
          setSaveError(message)
          throw err
        })
        .finally(() => setIsSaving(false))
    },
    [tourId],
  )

  return { tour, isLoading, error, refetch: fetchTour, saveTour, isSaving, saveError }
}
