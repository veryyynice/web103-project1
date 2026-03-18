export async function getDestinations() {
  const res = await fetch('/destinations')
  return res.json()
}

export async function getDestinationById(id) {
  const res = await fetch('/destinations')
  const data = await res.json()
  return data.find(d => d.id === parseInt(id))
}
