import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import pool from '../db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM destinations ORDER BY id')
  res.status(200).json(rows)
})

router.get('/:destinationId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/destination.html'))
})

export default router
