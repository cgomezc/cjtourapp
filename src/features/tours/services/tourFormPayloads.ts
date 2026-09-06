import { languageTabDefinitions } from '../constants'
import type { Tour, TourTranslationInput, UpdateTourPayload } from '../types'

export interface TourFormValues {
  slug: string
  destinationId: string
  subtitle: string
  description: string
  durationHours: string
  durationDays: string
  startTime: string
  endTime: string
  availableDays: number[]
  minParticipants: string
  maxParticipants: string
  currentAvailability: string
  minAge: string
  isActive: boolean
  isFeatured: boolean
  tourCode: string
  routeMapUrl: string
  featuredImageUrl: string
  galleryImageUrls: string
  translations: Record<string, TourTranslationInput>
}

export function toDateTimeLocalValue(iso: string): string {
  const date = new Date(iso)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const pad = (value: number) => value.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function fromDateTimeLocalValue(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toISOString()
}

export function tourToFormValues(tour: Tour): TourFormValues {
  const translations: Record<string, TourTranslationInput> = {}

  for (const { code } of languageTabDefinitions) {
    const existing = tour.translations?.find((translation) => translation.languageCode === code)

    translations[code] = {
      id: existing?.id,
      languageCode: code,
      title: existing?.title ?? '',
      subtitle: existing?.subtitle ?? '',
      description: existing?.description ?? '',
      detailedItinerary: existing?.detailedItinerary ?? '',
    }
  }

  return {
    slug: tour.slug ?? '',
    destinationId: tour.destinationId?.toString() ?? tour.destination?.id?.toString() ?? '',
    subtitle: tour.subtitle ?? '',
    description: tour.description ?? '',
    durationHours: tour.durationHours?.toString() ?? '0',
    durationDays: tour.durationDays?.toString() ?? '0',
    startTime: toDateTimeLocalValue(tour.startTime),
    endTime: toDateTimeLocalValue(tour.endTime),
    availableDays: tour.availableDays ?? [],
    minParticipants: tour.minParticipants?.toString() ?? '0',
    maxParticipants: tour.maxParticipants?.toString() ?? '0',
    currentAvailability: tour.currentAvailability?.toString() ?? '0',
    minAge: tour.minAge?.toString() ?? '0',
    isActive: tour.isActive ?? true,
    isFeatured: tour.isFeatured ?? false,
    tourCode: tour.tourCode ?? '',
    routeMapUrl: tour.routeMapUrl ?? '',
    featuredImageUrl: tour.featuredImageUrl ?? '',
    galleryImageUrls: (tour.galleryImageUrls ?? []).join('\n'),
    translations,
  }
}

export function formValuesToUpdatePayload(values: TourFormValues): UpdateTourPayload {
  const destinationId = Number(values.destinationId)

  return {
    slug: values.slug,
    ...(values.destinationId && Number.isInteger(destinationId) && destinationId > 0
      ? { destinationId }
      : {}),
    subtitle: values.subtitle,
    description: values.description,
    durationHours: Number(values.durationHours) || 0,
    durationDays: Number(values.durationDays) || 0,
    startTime: fromDateTimeLocalValue(values.startTime),
    endTime: fromDateTimeLocalValue(values.endTime),
    availableDays: values.availableDays,
    minParticipants: Number(values.minParticipants) || 0,
    maxParticipants: Number(values.maxParticipants) || 0,
    currentAvailability: Number(values.currentAvailability) || 0,
    minAge: Number(values.minAge) || 0,
    isActive: values.isActive,
    isFeatured: values.isFeatured,
    tourCode: values.tourCode,
    routeMapUrl: values.routeMapUrl,
    featuredImageUrl: values.featuredImageUrl,
    galleryImageUrls: values.galleryImageUrls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0),
    translations: languageTabDefinitions.map(({ code }) => values.translations[code]),
  }
}
