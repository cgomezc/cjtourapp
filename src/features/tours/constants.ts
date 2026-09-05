/**
 * Language tabs shown on the tour detail/edit page.
 * Shared between the read-only view and the edit form so both stay in sync.
 */
export const languageTabDefinitions: Array<{ code: string; label: string }> = [
  { code: 'en-US', label: 'Inglés (en-US)' },
  { code: 'es-MX', label: 'Español (es-MX)' },
]

/**
 * Weekday labels used to render `availableDays` (0 = Sunday ... 6 = Saturday).
 */
export const weekDayNames: Record<number, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
}
