import { Controller, useForm } from 'react-hook-form'
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
  const { register, control, handleSubmit } = useForm<TourFormValues>({
    // `values` (rather than only `defaultValues`) keeps the form in sync when
    // the tour arrives asynchronously (e.g. EditTourPage loading a tour by id).
    values: defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    disabled={mode === 'edit'}
                    required
                    {...register('slug')}
                  />
                </FieldWrapper>
                <FieldWrapper label="Código">
                  <input className={inputClassName} {...register('tourCode')} />
                </FieldWrapper>
                <FieldWrapper label="Destino">
                  <select
                    className={inputClassName}
                    disabled={isLoadingDestinations}
                    {...register('destinationId')}
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
                    required
                    {...register('startTime')}
                  />
                </FieldWrapper>
                <FieldWrapper label="Fin">
                  <input
                    type="datetime-local"
                    className={inputClassName}
                    required
                    {...register('endTime')}
                  />
                </FieldWrapper>
                <FieldWrapper label="Duración (horas)">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    {...register('durationHours')}
                  />
                </FieldWrapper>
                <FieldWrapper label="Duración (días)">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    {...register('durationDays')}
                  />
                </FieldWrapper>
                <FieldWrapper label="Participantes mínimos">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    {...register('minParticipants')}
                  />
                </FieldWrapper>
                <FieldWrapper label="Participantes máximos">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    {...register('maxParticipants')}
                  />
                </FieldWrapper>
                <FieldWrapper label="Disponibilidad actual">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    {...register('currentAvailability')}
                  />
                </FieldWrapper>
                <FieldWrapper label="Edad mínima">
                  <input type="number" min={0} className={inputClassName} {...register('minAge')} />
                </FieldWrapper>
                <FieldWrapper label="Imagen destacada (URL)">
                  <input className={inputClassName} {...register('featuredImageUrl')} />
                </FieldWrapper>
                <FieldWrapper label="Mapa de ruta (URL)">
                  <input className={inputClassName} {...register('routeMapUrl')} />
                </FieldWrapper>

                <div className="md:col-span-2">
                  <FieldWrapper label="Subtítulo">
                    <input className={inputClassName} {...register('subtitle')} />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Descripción">
                    <textarea className={inputClassName} rows={4} {...register('description')} />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Galería de imágenes (una URL por línea)">
                    <textarea
                      className={inputClassName}
                      rows={3}
                      {...register('galleryImageUrls')}
                    />
                  </FieldWrapper>
                </div>

                <div className="md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Días disponibles
                  </span>
                  <Controller
                    control={control}
                    name="availableDays"
                    render={({ field }) => (
                      <div className="mt-1 flex flex-wrap gap-3">
                        {Object.entries(weekDayNames).map(([day, name]) => {
                          const dayNumber = Number(day)
                          const checked = field.value.includes(dayNumber)

                          return (
                            <label
                              key={day}
                              className="flex items-center gap-1.5 text-sm text-gray-700"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  field.onChange(
                                    checked
                                      ? field.value.filter((item) => item !== dayNumber)
                                      : [...field.value, dayNumber].sort((a, b) => a - b),
                                  )
                                }}
                              />
                              {name}
                            </label>
                          )
                        })}
                      </div>
                    )}
                  />
                </div>

                <label className="flex items-center gap-1.5 text-sm text-gray-700">
                  <input type="checkbox" {...register('isActive')} />
                  Activo
                </label>
                <label className="flex items-center gap-1.5 text-sm text-gray-700">
                  <input type="checkbox" {...register('isFeatured')} />
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
                  <input className={inputClassName} {...register(`translations.${code}.title`)} />
                </FieldWrapper>
                <FieldWrapper label="Subtítulo">
                  <input
                    className={inputClassName}
                    {...register(`translations.${code}.subtitle`)}
                  />
                </FieldWrapper>
                <div className="md:col-span-2">
                  <FieldWrapper label="Descripción">
                    <textarea
                      className={inputClassName}
                      rows={4}
                      {...register(`translations.${code}.description`)}
                    />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Itinerario detallado">
                    <textarea
                      className={inputClassName}
                      rows={4}
                      {...register(`translations.${code}.detailedItinerary`)}
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
