import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OPTIONS, calculateTotal } from '../utilities/calcPrice.js'
import { getValidationError } from '../utilities/validate.js'
import { createTrip } from '../services/tripsAPI.js'

const DEFAULTS = {
  accommodation: 'hostel',
  food: 'street_food',
  transportation: 'walking',
  utilities: 'none',
}

const LABELS = {
  accommodation: 'Accommodation',
  food: 'Food',
  transportation: 'Transportation',
  utilities: 'Utilities & Services',
}

export default function CreateTrip() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [selections, setSelections] = useState(DEFAULTS)
  const [error, setError] = useState(null)

  function select(category, value) {
    setSelections(prev => ({ ...prev, [category]: value }))
    setError(null)
  }

  function buildVisual() {
    const a = OPTIONS.accommodation.find(o => o.value === selections.accommodation)
    const f = OPTIONS.food.find(o => o.value === selections.food)
    const t = OPTIONS.transportation.find(o => o.value === selections.transportation)
    const u = OPTIONS.utilities.find(o => o.value === selections.utilities)
    return `${a.emoji} ${f.emoji} ${t.emoji} ${u.emoji}`
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationError = getValidationError(selections)
    if (validationError) { setError(validationError); return }
    if (!name.trim()) { setError('Please give your trip a name.'); return }

    const total_daily_cost = calculateTotal(selections)
    await createTrip({ name: name.trim(), ...selections, total_daily_cost })
    navigate('/trips')
  }

  const total = calculateTotal(selections)

  return (
    <div className="create-trip">
      <h2 className="page-title">Build Your Nomad Trip</h2>

      <div className="trip-visual">{buildVisual()}</div>

      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label>Trip name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Chiang Mai budget run"
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

        <button type="submit" className="submit-btn">Save Trip</button>
      </form>
    </div>
  )
}
