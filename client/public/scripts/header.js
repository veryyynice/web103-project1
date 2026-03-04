const header = document.querySelector('header')

const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'

const headerLeft = document.createElement('div')
headerLeft.className = 'header-left'

const logo = document.createElement('img')
logo.src = '/logo.svg'
logo.alt = 'Budget Destinations logo'

const title = document.createElement('h1')
title.textContent = 'Budget Destinations'

headerLeft.appendChild(logo)
headerLeft.appendChild(title)

const headerRight = document.createElement('div')
headerRight.className = 'header-right'

const homeButton = document.createElement('button')
homeButton.textContent = 'Home'
homeButton.addEventListener('click', () => {
  window.location = '/'
})

headerRight.appendChild(homeButton)

headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)
header.appendChild(headerContainer)
