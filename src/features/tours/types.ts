/**
 * Tour model as returned by the API.
 */
export interface Tour {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  slug: string
  subtitle: string | null
  description: string
  durationHours: number
  durationDays: number
  startTime: string
  endTime: string
  availableDays?: number[]
  minParticipants?: number
  maxParticipants?: number
  currentAvailability?: number | null
  minAge?: number
  averageRating?: number | null
  reviewCount?: number | null
  isActive?: boolean
  isFeatured?: boolean
  tourCode?: string
  routeMapUrl?: string | null
  featuredImageUrl?: string | null
  galleryImageUrls?: string[]
}
