const dateTimeFormatter = new Intl.DateTimeFormat('es', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

/**
 * Formats an ISO date string into a locale-aware, human readable date/time.
 * Returns an em dash when the value cannot be parsed.
 */
export function formatDateTime(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return dateTimeFormatter.format(date)
}
