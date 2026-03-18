import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import LocationDetail from './pages/LocationDetail.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations/:id" element={<LocationDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
