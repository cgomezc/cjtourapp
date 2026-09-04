const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

/**
 * Minimal fetch wrapper shared by all feature services.
 * Centralizes base URL resolution and error handling.
 */
export async function httpGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}
