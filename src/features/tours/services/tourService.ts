import { httpGet } from '../../../lib/httpClient'
import { mockTours } from '../mocks/tours.mock'
import type { Tour } from '../types'

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

export function getTours(language: string = DEFAULT_LANGUAGE): Promise<Tour[]> {
  if (USE_MOCK_DATA) {
    return getMockTours()
  }

  const params = new URLSearchParams({ language })
  return httpGet<Tour[]>(`${TOURS_ENDPOINT}?${params.toString()}`)
}
