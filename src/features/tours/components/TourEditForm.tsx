import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../../components/ui/Button'
import { Tabs } from '../../../components/ui/Tabs'
import { languageTabDefinitions, weekDayNames } from '../constants'
import type { Tour, TourTranslationInput, UpdateTourPayload } from '../types'

interface TourEditFormProps {
  tour: Tour
  isSaving: boolean
  saveError: string | null
  onCancel: () => void
  onSubmit: (payload: UpdateTourPayload) => void
}

interface GeneralFormState {
  slug: string
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
}

type TranslationsFormState = Record<string, TourTranslationInput>

function toDateTimeLocalValue(iso: string): string {
  const date = new Date(iso)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const pad = (value: number) => value.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function fromDateTimeLocalValue(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toISOString()
}

function buildInitialGeneralState(tour: Tour): GeneralFormState {
  return {
    slug: tour.slug ?? '',
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
  }
}

function buildInitialTranslationsState(tour: Tour): TranslationsFormState {
  const state: TranslationsFormState = {}

  for (const { code } of languageTabDefinitions) {
    const existing = tour.translations?.find((translation) => translation.languageCode === code)

    state[code] = {
      id: existing?.id,
      languageCode: code,
      title: existing?.title ?? '',
      subtitle: existing?.subtitle ?? '',
      description: existing?.description ?? '',
      detailedItinerary: existing?.detailedItinerary ?? '',
    }
  }

  return state
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

export function TourEditForm({ tour, isSaving, saveError, onCancel, onSubmit }: TourEditFormProps) {
  const [general, setGeneral] = useState<GeneralFormState>(() => buildInitialGeneralState(tour))
  const [translations, setTranslations] = useState<TranslationsFormState>(() =>
    buildInitialTranslationsState(tour),
  )

  const updateGeneral = <K extends keyof GeneralFormState>(key: K, value: GeneralFormState[K]) => {
    setGeneral((prev) => ({ ...prev, [key]: value }))
  }

  const updateTranslation = (
    code: string,
    key: keyof Omit<TourTranslationInput, 'id' | 'languageCode'>,
    value: string,
  ) => {
    setTranslations((prev) => ({
      ...prev,
      [code]: { ...prev[code], [key]: value },
    }))
  }

  const toggleAvailableDay = (day: number) => {
    setGeneral((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((item) => item !== day)
        : [...prev.availableDays, day].sort((a, b) => a - b),
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload: UpdateTourPayload = {
      slug: general.slug,
      subtitle: general.subtitle,
      description: general.description,
      durationHours: Number(general.durationHours) || 0,
      durationDays: Number(general.durationDays) || 0,
      startTime: fromDateTimeLocalValue(general.startTime),
      endTime: fromDateTimeLocalValue(general.endTime),
      availableDays: general.availableDays,
      minParticipants: Number(general.minParticipants) || 0,
      maxParticipants: Number(general.maxParticipants) || 0,
      currentAvailability: Number(general.currentAvailability) || 0,
      minAge: Number(general.minAge) || 0,
      isActive: general.isActive,
      isFeatured: general.isFeatured,
      tourCode: general.tourCode,
      routeMapUrl: general.routeMapUrl,
      featuredImageUrl: general.featuredImageUrl,
      galleryImageUrls: general.galleryImageUrls
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url.length > 0),
      translations: languageTabDefinitions.map(({ code }) => translations[code]),
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saveError && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{saveError}</div>}

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
                    value={general.slug}
                    onChange={(e) => updateGeneral('slug', e.target.value)}
                    required
                  />
                </FieldWrapper>
                <FieldWrapper label="Código">
                  <input
                    className={inputClassName}
                    value={general.tourCode}
                    onChange={(e) => updateGeneral('tourCode', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Inicio">
                  <input
                    type="datetime-local"
                    className={inputClassName}
                    value={general.startTime}
                    onChange={(e) => updateGeneral('startTime', e.target.value)}
                    required
                  />
                </FieldWrapper>
                <FieldWrapper label="Fin">
                  <input
                    type="datetime-local"
                    className={inputClassName}
                    value={general.endTime}
                    onChange={(e) => updateGeneral('endTime', e.target.value)}
                    required
                  />
                </FieldWrapper>
                <FieldWrapper label="Duración (horas)">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={general.durationHours}
                    onChange={(e) => updateGeneral('durationHours', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Duración (días)">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={general.durationDays}
                    onChange={(e) => updateGeneral('durationDays', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Participantes mínimos">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={general.minParticipants}
                    onChange={(e) => updateGeneral('minParticipants', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Participantes máximos">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={general.maxParticipants}
                    onChange={(e) => updateGeneral('maxParticipants', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Disponibilidad actual">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={general.currentAvailability}
                    onChange={(e) => updateGeneral('currentAvailability', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Edad mínima">
                  <input
                    type="number"
                    min={0}
                    className={inputClassName}
                    value={general.minAge}
                    onChange={(e) => updateGeneral('minAge', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Imagen destacada (URL)">
                  <input
                    className={inputClassName}
                    value={general.featuredImageUrl}
                    onChange={(e) => updateGeneral('featuredImageUrl', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Mapa de ruta (URL)">
                  <input
                    className={inputClassName}
                    value={general.routeMapUrl}
                    onChange={(e) => updateGeneral('routeMapUrl', e.target.value)}
                  />
                </FieldWrapper>

                <div className="md:col-span-2">
                  <FieldWrapper label="Subtítulo">
                    <input
                      className={inputClassName}
                      value={general.subtitle}
                      onChange={(e) => updateGeneral('subtitle', e.target.value)}
                    />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Descripción">
                    <textarea
                      className={inputClassName}
                      rows={4}
                      value={general.description}
                      onChange={(e) => updateGeneral('description', e.target.value)}
                    />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Galería de imágenes (una URL por línea)">
                    <textarea
                      className={inputClassName}
                      rows={3}
                      value={general.galleryImageUrls}
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
                          checked={general.availableDays.includes(Number(day))}
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
                    checked={general.isActive}
                    onChange={(e) => updateGeneral('isActive', e.target.checked)}
                  />
                  Activo
                </label>
                <label className="flex items-center gap-1.5 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={general.isFeatured}
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
                    value={translations[code]?.title ?? ''}
                    onChange={(e) => updateTranslation(code, 'title', e.target.value)}
                  />
                </FieldWrapper>
                <FieldWrapper label="Subtítulo">
                  <input
                    className={inputClassName}
                    value={translations[code]?.subtitle ?? ''}
                    onChange={(e) => updateTranslation(code, 'subtitle', e.target.value)}
                  />
                </FieldWrapper>
                <div className="md:col-span-2">
                  <FieldWrapper label="Descripción">
                    <textarea
                      className={inputClassName}
                      rows={4}
                      value={translations[code]?.description ?? ''}
                      onChange={(e) => updateTranslation(code, 'description', e.target.value)}
                    />
                  </FieldWrapper>
                </div>
                <div className="md:col-span-2">
                  <FieldWrapper label="Itinerario detallado">
                    <textarea
                      className={inputClassName}
                      rows={4}
                      value={translations[code]?.detailedItinerary ?? ''}
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
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSaving}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando…' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  )
}
