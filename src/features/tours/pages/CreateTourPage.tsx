import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { TourForm } from '../components/TourEditForm'
import { useDestinations } from '../hooks/useDestinations'
import { createTour } from '../services/tourService'
import { formValuesToUpdatePayload } from '../services/tourFormPayloads'
import type { TourFormValues } from '../services/tourFormPayloads'

function getDefaultFormValues(): TourFormValues {
  const now = new Date()
  const endTime = new Date(now)
  endTime.setHours(endTime.getHours() + 1)

  return {
    slug: '',
    destinationId: '',
    subtitle: '',
    description: '',
    durationHours: '8',
    durationDays: '1',
    startTime: now.toISOString().slice(0, 16),
    endTime: endTime.toISOString().slice(0, 16),
    availableDays: [],
    minParticipants: '1',
    maxParticipants: '10',
    currentAvailability: '10',
    minAge: '0',
    isActive: true,
    isFeatured: false,
    tourCode: '',
    routeMapUrl: '',
    featuredImageUrl: '',
    galleryImageUrls: '',
    translations: {
      'en-US': {
        languageCode: 'en-US',
        title: '',
        subtitle: '',
        description: '',
        detailedItinerary: '',
      },
      'es-ES': {
        languageCode: 'es-ES',
        title: '',
        subtitle: '',
        description: '',
        detailedItinerary: '',
      },
    },
  }
}

export function CreateTourPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const {
    destinations,
    isLoading: isLoadingDestinations,
    error: destinationsError,
  } = useDestinations()

  const handleSubmit = (formValues: TourFormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSuccessMessage(null)

    const payload = formValuesToUpdatePayload(formValues)

    createTour(payload)
      .then((tour) => {
        setSuccessMessage('Tour creado correctamente. Redirigiendo…')
        setTimeout(() => navigate(`/tours/${tour.id}`), 1500)
      })
      .catch((err: unknown) => {
        const errorMessage = err instanceof Error ? err.message : 'Error al crear el tour'
        setSubmitError(errorMessage)
        setIsSubmitting(false)
      })
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Crear tour</h1>
          <p className="text-sm text-gray-500">Ingresa la información del nuevo tour</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/tours')}>
          Volver
        </Button>
      </div>

      {successMessage && (
        <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <TourForm
          mode="create"
          defaultValues={getDefaultFormValues()}
          destinations={destinations}
          isLoadingDestinations={isLoadingDestinations}
          destinationsError={destinationsError}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onCancel={() => navigate('/tours')}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  )
}
