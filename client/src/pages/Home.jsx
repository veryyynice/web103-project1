import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDestinations } from '../services/destinationsAPI.js'

export default function Home() {
  const [destinations, setDestinations] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getDestinations().then(setDestinations)
  }, [])

  return (
    <>
      <h2 className="page-title">Nomad Hub</h2>
      <p className="page-subtitle">Click a city to explore local events for digital nomads</p>

      <div className="cards-grid">
        {destinations.map(destination => (
          <div
            key={destination.id}
            className="card"
            onClick={() => navigate(`/destinations/${destination.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="top-container"
              style={{ backgroundImage: `url('${destination.image}')` }}
            />
            <div className="bottom-container">
              <h3>{destination.name}, {destination.country}</h3>
              <p className="price">{destination.price_per_day}/day</p>
              <p className="audience">{destination.audience}</p>
              <span role="button" className="read-more-btn">Explore Events &rsaquo;</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
