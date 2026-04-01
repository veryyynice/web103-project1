import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTripById, deleteTrip } from '../services/tripsAPI.js'
import { OPTIONS } from '../utilities/calcPrice.js'

const LABELS = {
  accommodation: 'Accommodation',
  food: 'Food',
  transportation: 'Transportation',
  utilities: 'Utilities & Services',
}

export default function TripDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)

  useEffect(() => {
    getTripById(id).then(setTrip)
  }, [id])

  async function handleDelete() {
    await deleteTrip(id)
    navigate('/trips')
  }

  if (!trip) return <p>Loading...</p>

  return (
    <div className="trip-detail">
      <button className="back-btn" onClick={() => navigate('/trips')}>← Back to trips</button>

      <h2 className="page-title">{trip.name}</h2>

      <div className="trip-visual large">
        {['accommodation', 'food', 'transportation', 'utilities'].map(cat => {
          const opt = OPTIONS[cat].find(o => o.value === trip[cat])
          return opt ? opt.emoji : '?'
        }).join(' ')}
      </div>

      <div className="detail-grid">
        {['accommodation', 'food', 'transportation', 'utilities'].map(cat => {
          const opt = OPTIONS[cat].find(o => o.value === trip[cat])
          if (!opt) return null
          return (
            <div key={cat} className="detail-row">
              <span className="detail-label">{LABELS[cat]}</span>
              <span className="detail-value">{opt.emoji} {opt.label}</span>
              <span className="detail-cost">${opt.cost}/day</span>
            </div>
          )
        })}
        <div className="detail-row total">
          <span className="detail-label">Total</span>
          <span />
          <span className="detail-cost"><strong>${trip.total_daily_cost}/day</strong></span>
        </div>
      </div>

      <div className="detail-actions">
        <button className="submit-btn" onClick={() => navigate(`/trips/${id}/edit`)}>Edit Trip</button>
        <button className="home-btn danger" onClick={handleDelete}>Delete Trip</button>
      </div>
    </div>
  )
}
