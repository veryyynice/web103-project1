export async function getAllTrips() {
  const res = await fetch('/api/trips')
  return res.json()
}

export async function getTripById(id) {
  const res = await fetch(`/api/trips/${id}`)
  return res.json()
}

export async function createTrip(trip) {
  const res = await fetch('/api/trips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip)
  })
  return res.json()
}

export async function updateTrip(id, trip) {
  const res = await fetch(`/api/trips/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip)
  })
  return res.json()
}

export async function deleteTrip(id) {
  const res = await fetch(`/api/trips/${id}`, { method: 'DELETE' })
  return res.json()
}
