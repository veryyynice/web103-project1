import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDestinationById } from '../services/destinationsAPI.js'
import { getEventsByDestination } from '../services/eventsAPI.js'

function getCountdown(eventDate) {
  const now = new Date()
  const event = new Date(eventDate)
  const diff = event - now

  if (diff < 0) {
    const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24))
    return { label: `${days}d ago`, past: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 0) return { label: `in ${days}d ${hours}h`, past: false }
  if (hours > 0) return { label: `in ${hours}h`, past: false }
  return { label: 'starting soon', past: false }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export default function LocationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [destination, setDestination] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    getDestinationById(id).then(setDestination)
    getEventsByDestination(id).then(setEvents)
  }, [id])

  if (!destination) return <p>Loading...</p>

  return (
    <>
      <button className="back-btn" onClick={() => navigate('/')}>← Back to cities</button>

      <div className="destination-layout">
        <div className="image-container">
          <img src={destination.image} alt={`${destination.name} photo`} />
        </div>
        <div className="destination-details">
          <h2>{destination.name}, {destination.country}</h2>
          <p><span className="badge">{destination.audience}</span></p>
          <p>💰 Budget: {destination.price_per_day}/day</p>
          <p>📅 Ideal trip: {destination.trip_length}</p>
          <p>✨ Best for: {destination.best_for}</p>
          <p>{destination.description}</p>
        </div>
      </div>

      <section className="events-section">
        <h3>Events in {destination.name}</h3>
        {events.length === 0 ? (
          <p>No events found for this location.</p>
        ) : (
          <div className="events-grid">
            {events.map(event => {
              const { label, past } = getCountdown(event.event_date)
              return (
                <div key={event.id} className={`event-card ${past ? 'event-past' : ''}`}>
                  <div className="event-header">
                    <span className="event-category badge">{event.category}</span>
                    <span className={`event-countdown ${past ? 'countdown-past' : 'countdown-future'}`}>
                      {label}
                    </span>
                  </div>
                  <h4 className={past ? 'past-title' : ''}>{event.title}</h4>
                  <p className="event-date">{formatDate(event.event_date)}</p>
                  <p className="event-venue">📍 {event.location_detail}</p>
                  <p className="event-description">{event.description}</p>
                  {past && <p className="past-label">This event has passed</p>}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
