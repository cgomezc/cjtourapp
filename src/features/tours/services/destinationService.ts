import { httpGet } from '../../../lib/httpClient'
import type { Destination } from '../types'

const DESTINATIONS_ENDPOINT = '/api/destinations'
const DEFAULT_LANGUAGE = 'en-US'

export function getDestinations(language: string = DEFAULT_LANGUAGE): Promise<Destination[]> {
  const params = new URLSearchParams({ language })
  return httpGet<Destination[]>(`${DESTINATIONS_ENDPOINT}?${params.toString()}`)
}
