import { httpGet } from '../../../lib/httpClient'
import type { Tour } from '../types'

const TOURS_ENDPOINT = '/api/tours'

export function getTours(): Promise<Tour[]> {
  return httpGet<Tour[]>(TOURS_ENDPOINT)
}
