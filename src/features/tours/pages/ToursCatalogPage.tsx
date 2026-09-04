import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import { TourTable } from '../components/TourTable'
import { useTours } from '../hooks/useTours'
import type { Tour } from '../types'

export function ToursCatalogPage() {
  const { tours, isLoading, error, refetch } = useTours()
  const navigate = useNavigate()

  const handleEdit = (tour: Tour) => {
    navigate(`/tours/${tour.id}`)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Catálogo de tours</h1>
          <p className="text-sm text-gray-500">Gestiona los tours disponibles</p>
        </div>
        <Button onClick={refetch} disabled={isLoading}>
          Actualizar
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner label="Cargando tours…" />
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      {!isLoading && !error && tours.length === 0 && (
        <div className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
          No hay tours registrados.
        </div>
      )}

      {!isLoading && !error && tours.length > 0 && (
        <TourTable tours={tours} onEdit={handleEdit} />
      )}
    </main>
  )
}
