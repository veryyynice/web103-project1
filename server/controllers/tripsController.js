import pool from '../db.js'

export async function getAllTrips(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM custom_trips ORDER BY created_at DESC')
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getTripById(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM custom_trips WHERE id = $1', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Trip not found' })
    res.status(200).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createTrip(req, res) {
  try {
    const { name, accommodation, food, transportation, utilities, total_daily_cost } = req.body
    const { rows } = await pool.query(
      `INSERT INTO custom_trips (name, accommodation, food, transportation, utilities, total_daily_cost)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, accommodation, food, transportation, utilities, total_daily_cost]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateTrip(req, res) {
  try {
    const { name, accommodation, food, transportation, utilities, total_daily_cost } = req.body
    const { rows } = await pool.query(
      `UPDATE custom_trips
       SET name = $1, accommodation = $2, food = $3, transportation = $4, utilities = $5, total_daily_cost = $6
       WHERE id = $7 RETURNING *`,
      [name, accommodation, food, transportation, utilities, total_daily_cost, req.params.id]
    )
    if (rows.length === 0) return res.status(404).json({ error: 'Trip not found' })
    res.status(200).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function deleteTrip(req, res) {
  try {
    const { rows } = await pool.query('DELETE FROM custom_trips WHERE id = $1 RETURNING *', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Trip not found' })
    res.status(200).json({ message: 'Trip deleted', trip: rows[0] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
