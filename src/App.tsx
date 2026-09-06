import { Navigate, Route, Routes } from 'react-router-dom'
import { CreateTourPage } from './features/tours/pages/CreateTourPage'
import { EditTourPage } from './features/tours/pages/EditTourPage'
import { TourDetailPage } from './features/tours/pages/TourDetailPage'
import { ToursCatalogPage } from './features/tours/pages/ToursCatalogPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tours" replace />} />
      <Route path="/tours" element={<ToursCatalogPage />} />
      <Route path="/tours/new" element={<CreateTourPage />} />
      <Route path="/tours/:tourId" element={<TourDetailPage />} />
      <Route path="/tours/:tourId/edit" element={<EditTourPage />} />
      <Route path="*" element={<Navigate to="/tours" replace />} />
    </Routes>
  )
}

export default App
