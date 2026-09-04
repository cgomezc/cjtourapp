import { useState } from 'react'
import { TourDetailPage } from './features/tours/pages/TourDetailPage'
import { ToursCatalogPage } from './features/tours/pages/ToursCatalogPage'

function App() {
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null)

  if (selectedTourId !== null) {
    return (
      <TourDetailPage
        tourId={selectedTourId}
        onBack={() => setSelectedTourId(null)}
      />
    )
  }

  return <ToursCatalogPage onEditTour={setSelectedTourId} />
}

export default App
