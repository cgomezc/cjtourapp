import type { Tour } from '../types'

/**
 * Mock tours used while the real API is not yet wired up.
 * Remove once `tourService` consumes the live endpoint.
 */
export const mockTours: Tour[] = [
  {
    id: 1,
    name: 'City Sightseeing Tour',
    createdAt: '2026-01-10T08:00:00.000Z',
    updatedAt: '2026-02-01T12:30:00.000Z',
    slug: 'city-sightseeing-tour',
    subtitle: 'Descubre lo mejor de la ciudad en un día',
    description:
      'Recorrido guiado por los principales puntos turísticos de la ciudad, incluyendo el centro histórico y museos destacados.',
    durationHours: 6,
    durationDays: 1,
    startTime: '2026-03-15T09:00:00.000Z',
    endTime: '2026-03-15T15:00:00.000Z',
  },
  {
    id: 2,
    name: 'Mountain Adventure Trek',
    createdAt: '2026-01-12T09:15:00.000Z',
    updatedAt: '2026-02-03T10:00:00.000Z',
    slug: 'mountain-adventure-trek',
    subtitle: 'Aventura de senderismo para niveles intermedios',
    description:
      'Trekking de dos días con acampada incluida, ideal para quienes buscan contacto con la naturaleza y paisajes de montaña.',
    durationHours: 48,
    durationDays: 2,
    startTime: '2026-04-02T07:00:00.000Z',
    endTime: '2026-04-03T18:00:00.000Z',
  },
  {
    id: 3,
    name: 'Coastal Sunset Cruise',
    createdAt: '2026-01-20T14:45:00.000Z',
    updatedAt: '2026-01-25T16:20:00.000Z',
    slug: 'coastal-sunset-cruise',
    subtitle: 'Navega por la costa mientras disfrutas del atardecer',
    description:
      'Paseo en barco por la costa con degustación de bebidas locales y música en vivo durante el atardecer.',
    durationHours: 3,
    durationDays: 1,
    startTime: '2026-05-10T17:00:00.000Z',
    endTime: '2026-05-10T20:00:00.000Z',
  },
  {
    id: 4,
    name: 'Historic Old Town Walk',
    createdAt: '2026-02-01T11:00:00.000Z',
    updatedAt: '2026-02-05T09:40:00.000Z',
    slug: 'historic-old-town-walk',
    subtitle: 'Camina por las calles con más historia de la ciudad',
    description:
      'Un recorrido a pie por el casco antiguo, con paradas en iglesias coloniales, plazas y mercados tradicionales.',
    durationHours: 4,
    durationDays: 1,
    startTime: '2026-03-22T10:00:00.000Z',
    endTime: '2026-03-22T14:00:00.000Z',
  },
  {
    id: 5,
    name: 'Wine Valley Experience',
    createdAt: '2026-02-08T13:30:00.000Z',
    updatedAt: '2026-02-10T15:00:00.000Z',
    slug: 'wine-valley-experience',
    subtitle: 'Cata de vinos en los mejores viñedos de la región',
    description:
      'Visita a tres viñedos con cata guiada, almuerzo incluido y transporte desde el centro de la ciudad.',
    durationHours: 8,
    durationDays: 1,
    startTime: '2026-06-05T09:00:00.000Z',
    endTime: '2026-06-05T17:00:00.000Z',
  },
]
