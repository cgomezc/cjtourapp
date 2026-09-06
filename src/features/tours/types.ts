/**
 * Localized copy for a tour (title, subtitle, description, itinerary) in a given language.
 */
export interface TourTranslation {
  id: number
  tourId: number
  languageCode: string
  title: string
  subtitle: string | null
  description: string
  detailedItinerary: string | null
}

/**
 * Tour model as returned by the API.
 */
export interface Tour {
  id: number
  name: string
  destinationId?: number | null
  destination?: Destination | null
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
  translations?: TourTranslation[]
}

/**
 * Destination returned by GET /api/destinations.
 */
export interface Destination {
  id: number
  name: string
  slug: string
  description: string
  country: string
  city: string
  featuredImageUrl: string | null
  featured: boolean
  isActive: boolean
}

/**
 * Translation payload sent to the API when updating a tour.
 * `id` is omitted for translations that don't exist yet.
 */
export interface TourTranslationInput {
  id?: number
  languageCode: string
  title: string
  subtitle: string
  description: string
  detailedItinerary: string
}

/**
 * Request body for PUT /api/tours/{id}.
 */
export interface UpdateTourPayload {
  slug: string
  destinationId?: number
  subtitle: string
  description: string
  durationHours: number
  durationDays: number
  startTime: string
  endTime: string
  availableDays: number[]
  minParticipants: number
  maxParticipants: number
  currentAvailability: number
  minAge: number
  isActive: boolean
  isFeatured: boolean
  tourCode: string
  routeMapUrl: string
  featuredImageUrl: string
  galleryImageUrls: string[]
  translations: TourTranslationInput[]
}
