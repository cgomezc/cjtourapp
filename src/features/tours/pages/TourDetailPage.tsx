import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import { formatDateTime } from '../../../lib/formatDate'
import { useTourDetail } from '../hooks/useTourDetail'

interface TourDetailPageProps {
  tourId: number
  onBack: () => void
}

const weekDayNames: Record<number, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
}

function formatText(value: string | null | undefined): string {
  if (!value) {
    return '—'
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : '—'
}

function formatNumber(value: number | null | undefined): string {
  return typeof value === 'number' ? value.toString() : '—'
}

function formatFlag(value: boolean | undefined): string {
  if (value === undefined) {
    return '—'
  }

  return value ? 'Sí' : 'No'
}

function formatAvailableDays(days: number[] | undefined): string {
  if (!days || days.length === 0) {
    return '—'
  }

  return days
    .map((day) => weekDayNames[day] ?? `Día ${day}`)
    .join(', ')
}

interface DetailFieldProps {
  label: string
  value: string
}

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
  )
}

export function TourDetailPage({ tourId, onBack }: TourDetailPageProps) {
  const { tour, isLoading, error, refetch } = useTourDetail(tourId)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Detalle del tour</h1>
          <p className="text-sm text-gray-500">Consulta la información completa del tour</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onBack}>
            Volver
          </Button>
          <Button onClick={refetch} disabled={isLoading}>
            Actualizar
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner label="Cargando detalle del tour…" />
        </div>
      )}

      {!isLoading && error && (
        <div className="space-y-4">
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>
          <Button variant="secondary" onClick={onBack}>
            Regresar al catálogo
          </Button>
        </div>
      )}

      {!isLoading && !error && tour && (
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{tour.name}</h2>
            <p className="text-sm text-gray-500">ID: {tour.id}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <DetailField label="Slug" value={tour.slug} />
            <DetailField label="Código" value={formatText(tour.tourCode)} />
            <DetailField label="Subtítulo" value={formatText(tour.subtitle)} />
            <DetailField label="Descripción" value={formatText(tour.description)} />
            <DetailField label="Inicio" value={formatDateTime(tour.startTime)} />
            <DetailField label="Fin" value={formatDateTime(tour.endTime)} />
            <DetailField label="Duración (horas)" value={tour.durationHours.toString()} />
            <DetailField label="Duración (días)" value={tour.durationDays.toString()} />
            <DetailField label="Días disponibles" value={formatAvailableDays(tour.availableDays)} />
            <DetailField
              label="Participantes"
              value={`${formatNumber(tour.minParticipants)} - ${formatNumber(tour.maxParticipants)}`}
            />
            <DetailField label="Edad mínima" value={formatNumber(tour.minAge)} />
            <DetailField label="Rating promedio" value={formatNumber(tour.averageRating)} />
            <DetailField label="Reseñas" value={formatNumber(tour.reviewCount)} />
            <DetailField label="Activo" value={formatFlag(tour.isActive)} />
            <DetailField label="Destacado" value={formatFlag(tour.isFeatured)} />
            <DetailField label="Imagen destacada" value={formatText(tour.featuredImageUrl)} />
            <DetailField
              label="Galería"
              value={
                tour.galleryImageUrls && tour.galleryImageUrls.length > 0
                  ? tour.galleryImageUrls.join(', ')
                  : '—'
              }
            />
         
          </div>
        </section>
      )}
    </main>
  )
}
