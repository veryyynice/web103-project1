import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllTrips, deleteTrip } from '../services/tripsAPI.js'
import { OPTIONS } from '../utilities/calcPrice.js'

function getEmojis(trip) {
  const a = OPTIONS.accommodation.find(o => o.value === trip.accommodation)?.emoji ?? '?'
  const f = OPTIONS.food.find(o => o.value === trip.food)?.emoji ?? '?'
  const t = OPTIONS.transportation.find(o => o.value === trip.transportation)?.emoji ?? '?'
  const u = OPTIONS.utilities.find(o => o.value === trip.utilities)?.emoji ?? '?'
  return `${a} ${f} ${t} ${u}`
}

export default function TripsList() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])

  useEffect(() => {
    getAllTrips().then(setTrips)
  }, [])

  async function handleDelete(id) {
    await deleteTrip(id)
    setTrips(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="trips-list">
      <div className="list-header">
        <h2 className="page-title">Saved Trips</h2>
        <button className="submit-btn" onClick={() => navigate('/trips/new')}>+ New Trip</button>
      </div>

      {trips.length === 0 ? (
        <p className="empty-msg">No trips saved yet. <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/trips/new')}>Build one!</span></p>
      ) : (
        <div className="cards-grid">
          {trips.map(trip => (
            <div key={trip.id} className="card trip-card">
              <div className="trip-visual small">{getEmojis(trip)}</div>
              <div className="bottom-container">
                <h3>{trip.name}</h3>
                <p className="price">${trip.total_daily_cost}/day</p>
                <div className="card-actions">
                  <button className="home-btn" onClick={() => navigate(`/trips/${trip.id}`)}>View</button>
                  <button className="home-btn" onClick={() => navigate(`/trips/${trip.id}/edit`)}>Edit</button>
                  <button className="home-btn danger" onClick={() => handleDelete(trip.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
