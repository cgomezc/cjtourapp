import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../../components/ui/Button'
import { Tabs } from '../../../components/ui/Tabs'
import { languageTabDefinitions, weekDayNames } from '../constants'
import type { Destination } from '../types'
import type { TourFormValues } from '../services/tourFormPayloads'

interface TourFormProps {
  mode: 'create' | 'edit'
  defaultValues: TourFormValues
  destinations: Destination[]
  isLoadingDestinations: boolean
  destinationsError: string | null
  isSubmitting: boolean
  submitError: string | null
  onCancel: () => void
  onSubmit: (values: TourFormValues) => void
}

interface FieldWrapperProps {
  label: string
  children: React.ReactNode
}

function FieldWrapper({ label, children }: FieldWrapperProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

const inputClassName =
  'block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'

export function TourForm({
  mode,
  defaultValues,
  destinations,
  isLoadingDestinations,
  destinationsError,
  isSubmitting,
  submitError,
  onCancel,
  onSubmit,
}: TourFormProps) {
  const [values, setValues] = useState<TourFormValues>(defaultValues)

  const updateGeneral = <K extends keyof Omit<TourFormValues, 'translations'>>(
    key: K,
    value: TourFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const updateTranslation = (
    code: string,
    key: 'title' | 'subtitle' | 'description' | 'detailedItinerary',
    value: string,
  ) => {
    setValues((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [code]: { ...prev.translations[code], [key]: value },
      },
    }))
  }

  const toggleAvailableDay = (day: number) => {
    setValues((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((item) => item !== day)
        : [...prev.availableDays, day].sort((a, b) => a - b),
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{submitError}</div>}

      <Tabs
        tabs={[
          {
            id: 'general',
            label: 'General',
            content: (
              <div className="grid gap-4 md:grid-cols-2">
                <FieldWrapper label="Slug">
                  <input
                    className={inputClassName}
                    value={values.slug}
                    onChange={(e) => updateGeneral('slug', e.target.value)}
                    disabled={mode === 'edit'}
                    required
                  />
                </FieldWrapper>
                <FieldWrapper label="Código">
                  <input
                    className={inputClassName}
                    value={values.tourCode}
                    onChange={(e) => updateGeneral('tourCode', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Destino">
                  <select
                    className={inputClassName}
                    value={values.destinationId}
                    onChange={(e) => updateGeneral('destinationId', e.target.value)}
                    disabled={isLoadingDestinations}
                  >
                    <option value="">
                      {isLoadingDestinations ? 'Cargando destinos…' : 'Selecciona un destino'}
                    </option>
                    {destinations.map((destination) => (
                      <option key={destination.id} value={destination.id}>
                        {destination.name}
                      </option>
                    ))}
                  </select>
                  {destinationsError && (
                    <p className="mt-1 text-sm text-red-700">{destinationsError}</p>
                  )}
                </FieldWrapper>
                <FieldWrapper label="Inicio">
                  <input
                    type="datetime-local"
                    className={inputClassName}
                    value={values.startTime}
                    onChange={(e) => updateGeneral('startTime', e.target.value)}
                    required
                  />
                </FieldWrapper>
                <FieldWrapper label="Fin">
                  <input
                    type="datetime-local"
                    className={inputClassName}
                    value={values.endTime}
                    onChange={(e) => updateGeneral('endTime', e.target.value)}
                    required
                  />
                </FieldWrapper>
                <FieldWrapper label="Duración (horas)">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={values.durationHours}
                    onChange={(e) => updateGeneral('durationHours', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Duración (días)">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={values.durationDays}
                    onChange={(e) => updateGeneral('durationDays', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Participantes mínimos">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={values.minParticipants}
                    onChange={(e) => updateGeneral('minParticipants', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Participantes máximos">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={values.maxParticipants}
                    onChange={(e) => updateGeneral('maxParticipants', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Disponibilidad actual">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={values.currentAvailability}
                    onChange={(e) => updateGeneral('currentAvailability', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Edad mínima">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={values.minAge}
                    onChange={(e) => updateGeneral('minAge', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Imagen destacada (URL)">
                  <input
                    className={inputClassName}
                    value={values.featuredImageUrl}
                    onChange={(e) => updateGeneral('featuredImageUrl', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Mapa de ruta (URL)">
                  <input
                    className={inputClassName}
                    value={values.routeMapUrl}
                    onChange={(e) => updateGeneral('routeMapUrl', e.target.value)}
                  />
                </FieldWrapper>

                <div className="md:col-span-2">
                  <FieldWrapper label="Subtítulo">
                    <input
                      className={inputClassName}
                      value={values.subtitle}
                      onChange={(e) => updateGeneral('subtitle', e.target.value)}
                    />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Descripción">
                    <textarea
                      className={inputClassName}
                      rows={4}
                      value={values.description}
                      onChange={(e) => updateGeneral('description', e.target.value)}
                    />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Galería de imágenes (una URL por línea)">
                    <textarea
                      className={inputClassName}
                      rows={3}
                      value={values.galleryImageUrls}
                      onChange={(e) => updateGeneral('galleryImageUrls', e.target.value)}
                    />
                  </FieldWrapper>
                </div>

                <div className="md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Días disponibles
                  </span>
                  <div className="mt-1 flex flex-wrap gap-3">
                    {Object.entries(weekDayNames).map(([day, name]) => (
                      <label key={day} className="flex items-center gap-1.5 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={values.availableDays.includes(Number(day))}
                          onChange={() => toggleAvailableDay(Number(day))}
                        />
                        {name}
                      </label>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-1.5 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={values.isActive}
                    onChange={(e) => updateGeneral('isActive', e.target.checked)}
                  />
                  Activo
                </label>
                <label className="flex items-center gap-1.5 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={values.isFeatured}
                    onChange={(e) => updateGeneral('isFeatured', e.target.checked)}
                  />
                  Destacado
                </label>
              </div>
            ),
          },
          ...languageTabDefinitions.map(({ code, label }) => ({
            id: code,
            label,
            content: (
              <div className="grid gap-4 md:grid-cols-2">
                <FieldWrapper label="Título">
                  <input
                    className={inputClassName}
                    value={values.translations[code]?.title ?? ''}
                    onChange={(e) => updateTranslation(code, 'title', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Subtítulo">
                  <input
                    className={inputClassName}
                    value={values.translations[code]?.subtitle ?? ''}
                    onChange={(e) => updateTranslation(code, 'subtitle', e.target.value)}
                  />
                </FieldWrapper>
                <div className="md:col-span-2">
                  <FieldWrapper label="Descripción">
                    <textarea
                      className={inputClassName}
                      rows={4}
                      value={values.translations[code]?.description ?? ''}
                      onChange={(e) => updateTranslation(code, 'description', e.target.value)}
                    />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Itinerario detallado">
                    <textarea
                      className={inputClassName}
                      rows={4}
                      value={values.translations[code]?.detailedItinerary ?? ''}
                      onChange={(e) => updateTranslation(code, 'detailedItinerary', e.target.value)}
                    />
                  </FieldWrapper>
                </div>
              </div>
            ),
          })),
        ]}
      />

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === 'create'
              ? 'Creando…'
              : 'Guardando…'
            : mode === 'create'
              ? 'Crear tour'
              : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  )
}
