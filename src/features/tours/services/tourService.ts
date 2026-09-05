import { httpGet, httpPut } from '../../../lib/httpClient'
import { mockTours } from '../mocks/tours.mock'
import type { Tour, UpdateTourPayload } from '../types'

const TOURS_ENDPOINT = '/api/tours'
const DEFAULT_LANGUAGE = 'en-US'


// Toggle this flag (or set VITE_USE_MOCK_DATA=false) once the real API is ready.
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'
const MOCK_DELAY_MS = 400

function getMockTours(): Promise<Tour[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTours), MOCK_DELAY_MS)
  })
}

function getMockTourById(tourId: number): Promise<Tour> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tour = mockTours.find((item) => item.id === tourId)

      if (!tour) {
        reject(new Error(`No se encontró el tour con id ${tourId}`))
        return
      }

      resolve(tour)
    }, MOCK_DELAY_MS)
  })
}

export function getTours(language: string = DEFAULT_LANGUAGE): Promise<Tour[]> {
  if (USE_MOCK_DATA) {
    return getMockTours()
  }

  const params = new URLSearchParams({ language })
  return httpGet<Tour[]>(`${TOURS_ENDPOINT}?${params.toString()}`)
}

export function getTourById(
  tourId: number,
  language: string = DEFAULT_LANGUAGE,
): Promise<Tour> {
  if (USE_MOCK_DATA) {
    return getMockTourById(tourId)
  }

  const params = new URLSearchParams({ language })
  return httpGet<Tour>(`${TOURS_ENDPOINT}/${tourId}?${params.toString()}`)
}

function getMockUpdateTour(tourId: number, payload: UpdateTourPayload): Promise<Tour> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTours.findIndex((item) => item.id === tourId)

      if (index === -1) {
        reject(new Error(`No se encontró el tour con id ${tourId}`))
        return
      }

      const existing = mockTours[index]
      const updated: Tour = {
        ...existing,
        ...payload,
        updatedAt: new Date().toISOString(),
        translations: payload.translations.map((translation, translationIndex) => ({
          id: translation.id ?? existing.translations?.[translationIndex]?.id ?? 0,
          tourId,
          languageCode: translation.languageCode,
          title: translation.title,
          subtitle: translation.subtitle,
          description: translation.description,
          detailedItinerary: translation.detailedItinerary,
        })),
      }

      mockTours[index] = updated
      resolve(updated)
    }, MOCK_DELAY_MS)
  })
}

export function updateTour(tourId: number, payload: UpdateTourPayload): Promise<Tour> {
  if (USE_MOCK_DATA) {
    return getMockUpdateTour(tourId, payload)
  }

  return httpPut<Tour>(`${TOURS_ENDPOINT}/${tourId}`, payload)
}
