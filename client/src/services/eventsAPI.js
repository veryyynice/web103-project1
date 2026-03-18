export async function getEventsByDestination(destinationId) {
  const res = await fetch(`/events?destination_id=${destinationId}`)
  return res.json()
}

export async function getAllEvents() {
  const res = await fetch('/events')
  return res.json()
}
