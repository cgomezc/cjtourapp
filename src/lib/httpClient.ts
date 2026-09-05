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

/**
 * Sends a PUT request with a JSON body. Handles APIs that respond
 * with an empty body (e.g. 204 No Content) by returning undefined.
 */
export async function httpPut<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`)
  }

  const text = await response.text()
  return (text.length > 0 ? JSON.parse(text) : undefined) as T
}
