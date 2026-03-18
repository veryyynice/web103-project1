import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { destination_id } = req.query
  if (destination_id) {
    const { rows } = await pool.query(
      'SELECT * FROM events WHERE destination_id = $1 ORDER BY event_date',
      [destination_id]
    )
    res.status(200).json(rows)
  } else {
    const { rows } = await pool.query('SELECT * FROM events ORDER BY event_date')
    res.status(200).json(rows)
  }
})

export default router
