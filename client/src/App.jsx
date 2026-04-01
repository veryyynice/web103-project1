import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import LocationDetail from './pages/LocationDetail.jsx'
import CreateTrip from './pages/CreateTrip.jsx'
import TripsList from './pages/TripsList.jsx'
import TripDetail from './pages/TripDetail.jsx'
import EditTrip from './pages/EditTrip.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations/:id" element={<LocationDetail />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/trips" element={<TripsList />} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/trips/:id/edit" element={<EditTrip />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
