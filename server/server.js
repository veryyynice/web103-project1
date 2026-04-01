import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import destinationsRouter from './routes/destinations.js'
import eventsRouter from './routes/events.js'
import tripsRouter from './routes/trips.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/destinations', destinationsRouter)
app.use('/events', eventsRouter)
app.use('/api/trips', tripsRouter)

// Catch-all: serve React app for client-side routing
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
