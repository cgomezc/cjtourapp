import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import { TourForm } from '../components/TourForm'
import { useDestinations } from '../hooks/useDestinations'
import { useTourDetail } from '../hooks/useTourDetail'
import { toUpdatePayload, tourToFormValues } from '../services/tourFormPayloads'
import type { TourFormValues } from '../services/tourFormPayloads'

export function EditTourPage() {
  const { tourId: tourIdParam } = useParams<{ tourId: string }>()
  const navigate = useNavigate()
  const tourId = Number(tourIdParam)
  const onBack = () => navigate('/tours')

  const { tour, isLoading, error, saveTour, isSaving, saveError } = useTourDetail(tourId)
  const {
    destinations,
    isLoading: isLoadingDestinations,
    error: destinationsError,
  } = useDestinations()
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Recomputed only when the loaded tour changes, so the form isn't reset
  // on every unrelated re-render (e.g. while `isSaving` toggles).
  const defaultValues = useMemo(() => (tour ? tourToFormValues(tour) : null), [tour])

  if (!tourIdParam || Number.isNaN(tourId)) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-4">
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">Tour no válido.</div>
          <Button variant="secondary" onClick={onBack}>
            Regresar al catálogo
          </Button>
        </div>
      </main>
    )
  }

  const handleSubmit = (formValues: TourFormValues) => {
    if (!tour) {
      return
    }

    setSaveSuccess(false)
    const payload = toUpdatePayload(formValues, tour)
    saveTour(payload)
      .then(() => {
        setSaveSuccess(true)
        setTimeout(() => onBack(), 1500)
      })
      .catch(() => {
        // saveError is already surfaced
      })
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Editar tour</h1>
          <p className="text-sm text-gray-500">Actualiza la información del tour</p>
        </div>
        <Button variant="secondary" onClick={onBack}>
          Volver
        </Button>
      </div>

      {saveSuccess && (
        <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
          Tour actualizado correctamente. Redirigiendo…
        </div>
      )}

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

      {!isLoading && !error && tour && defaultValues && (
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{tour.name}</h2>
            <p className="text-sm text-gray-500">ID: {tour.id}</p>
          </div>

          <TourForm
            mode="edit"
            defaultValues={defaultValues}
            destinations={destinations}
            isLoadingDestinations={isLoadingDestinations}
            destinationsError={destinationsError}
            isSubmitting={isSaving}
            submitError={saveError}
            onCancel={onBack}
            onSubmit={handleSubmit}
          />
        </section>
      )}
    </main>
  )
}
