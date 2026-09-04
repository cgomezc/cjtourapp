import { Button } from '../../../components/ui/Button'
import { formatDateTime } from '../../../lib/formatDate'
import type { Tour } from '../types'

interface TourTableRowProps {
  tour: Tour
  onEdit: (tour: Tour) => void
}

export function TourTableRow({ tour, onEdit }: TourTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{tour.name}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{tour.slug}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{tour.subtitle}</td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {formatDateTime(tour.startTime)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {formatDateTime(tour.endTime)}
      </td>
      <td className="px-4 py-3 text-right text-sm">
        <Button variant="secondary" onClick={() => onEdit(tour)}>
          Editar
        </Button>
      </td>
    </tr>
  )
}
