import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTripById, updateTrip } from '../services/tripsAPI.js'
import { OPTIONS, calculateTotal } from '../utilities/calcPrice.js'
import { getValidationError } from '../utilities/validate.js'

const LABELS = {
  accommodation: 'Accommodation',
  food: 'Food',
  transportation: 'Transportation',
  utilities: 'Utilities & Services',
}

export default function EditTrip() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [selections, setSelections] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTripById(id).then(trip => {
      setName(trip.name)
      setSelections({
        accommodation: trip.accommodation,
        food: trip.food,
        transportation: trip.transportation,
        utilities: trip.utilities,
      })
    })
  }, [id])

  function select(category, value) {
    setSelections(prev => ({ ...prev, [category]: value }))
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationError = getValidationError(selections)
    if (validationError) { setError(validationError); return }
    if (!name.trim()) { setError('Please give your trip a name.'); return }

    const total_daily_cost = calculateTotal(selections)
    await updateTrip(id, { name: name.trim(), ...selections, total_daily_cost })
    navigate(`/trips/${id}`)
  }

  if (!selections) return <p>Loading...</p>

  const total = calculateTotal(selections)

  return (
    <div className="create-trip">
      <button className="back-btn" onClick={() => navigate(`/trips/${id}`)}>← Back</button>
      <h2 className="page-title">Edit Trip</h2>

      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label>Trip name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        {Object.entries(LABELS).map(([category, label]) => (
          <div key={category} className="form-group">
            <label>{label}</label>
            <div className="option-grid">
              {OPTIONS[category].map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-btn ${selections[category] === option.value ? 'selected' : ''}`}
                  onClick={() => select(category, option.value)}
                >
                  <span className="option-emoji">{option.emoji}</span>
                  <span className="option-label">{option.label}</span>
                  <span className="option-cost">${option.cost}/day</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="total-bar">
          Total: <strong>${total}/day</strong>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="submit-btn">Save Changes</button>
      </form>
    </div>
  )
}
