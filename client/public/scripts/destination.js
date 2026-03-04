const renderDestination = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop())

  const response = await fetch('/destinations')
  const data = await response.json()

  const destinationContent = document.getElementById('destination-content')

  let destination

  if (data) {
    destination = data.find(d => d.id === requestedID)
  }

  if (destination) {
    document.getElementById('image').src = destination.image
    document.getElementById('image').alt = `${destination.name} photo`

    document.getElementById('name').textContent = `${destination.name}, ${destination.country}`

    const audienceEl = document.getElementById('audience')
    audienceEl.innerHTML = `<span class="badge">${destination.audience}</span>`

    document.getElementById('pricePerDay').textContent = `💰 Budget: ${destination.pricePerDay}/day`
    document.getElementById('tripLength').textContent = `📅 Ideal trip: ${destination.tripLength}`
    document.getElementById('bestFor').textContent = `✨ Best for: ${destination.bestFor}`
    document.getElementById('description').textContent = destination.description
    document.getElementById('submittedBy').textContent = `Submitted by: ${destination.submittedBy}`
    document.getElementById('submittedOn').textContent = `Date: ${destination.submittedOn}`

    document.title = `${destination.name} — Budget Destinations`
  } else {
    const noData = document.createElement('h2')
    noData.textContent = 'Destination not found 😞'
    destinationContent.appendChild(noData)
  }
}

renderDestination()
