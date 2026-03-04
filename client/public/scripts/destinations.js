const renderDestinations = async () => {
  const response = await fetch('/destinations')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  const pageTitle = document.createElement('h2')
  pageTitle.className = 'page-title'
  pageTitle.textContent = '5 Budget Destinations for College Students'
  mainContent.appendChild(pageTitle)

  const pageSubtitle = document.createElement('p')
  pageSubtitle.className = 'page-subtitle'
  pageSubtitle.textContent = 'Short trips (1–2 weeks) under $65/day'
  mainContent.appendChild(pageSubtitle)

  if (data) {
    const grid = document.createElement('div')
    grid.className = 'cards-grid'

    data.map(destination => {
      const card = document.createElement('div')
      card.className = 'card'

      const topContainer = document.createElement('div')
      topContainer.className = 'top-container'
      topContainer.style.backgroundImage = `url('${destination.image}')`

      const bottomContainer = document.createElement('div')
      bottomContainer.className = 'bottom-container'

      const name = document.createElement('h3')
      name.textContent = `${destination.name}, ${destination.country}`

      const price = document.createElement('p')
      price.className = 'price'
      price.textContent = `${destination.pricePerDay}/day`

      const audience = document.createElement('p')
      audience.className = 'audience'
      audience.textContent = destination.audience

      const readMore = document.createElement('a')
      readMore.textContent = 'Read More >'
      readMore.href = `/destinations/${destination.id}`
      readMore.role = 'button'

      bottomContainer.appendChild(name)
      bottomContainer.appendChild(price)
      bottomContainer.appendChild(audience)
      bottomContainer.appendChild(readMore)

      card.appendChild(topContainer)
      card.appendChild(bottomContainer)
      grid.appendChild(card)
    })

    mainContent.appendChild(grid)
  } else {
    const noData = document.createElement('h2')
    noData.textContent = 'No destinations available 😞'
    mainContent.appendChild(noData)
  }
}

const requestedUrl = window.location.pathname.replace('/', '')

if (requestedUrl) {
  window.location.href = '/404.html'
} else {
  renderDestinations()
}
