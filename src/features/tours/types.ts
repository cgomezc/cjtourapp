/**
 * Tour model as returned by the API.
 */
export interface Tour {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  slug: string
  subtitle: string
  description: string
  durationHours: number
  durationDays: number
  startTime: string
  endTime: string
}
