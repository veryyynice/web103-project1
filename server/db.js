import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host: process.env.PG_HOST || 'dpg-d76cff2dbo4c73bhi450-a.virginia-postgres.render.com',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'web103',
  password: process.env.PG_PASSWORD || 'ckrEJ8xkqyGlmR57steFmzMtLaWH4ufc',
  database: process.env.PG_DATABASE || 'web103_xs2w',
  ssl: { rejectUnauthorized: false },
})

export default pool
