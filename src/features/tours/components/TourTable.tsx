import { TourTableRow } from './TourTableRow'
import type { Tour } from '../types'

interface TourTableProps {
  tours: Tour[]
  onEdit: (tour: Tour) => void
}

const columns = ['Nombre', 'Slug', 'Subtítulo', 'Inicio', 'Fin', 'Acciones']

export function TourTable({ tours, onEdit }: TourTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 ${
                  column === 'Acciones' ? 'text-right' : ''
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tours.map((tour) => (
            <TourTableRow key={tour.id} tour={tour} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
