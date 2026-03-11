import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host: process.env.PG_HOST || 'dpg-d6ognetm5p6s73damiq0-a.oregon-postgres.render.com',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'web103_vyht_user',
  password: process.env.PG_PASSWORD || '2zElhtoEVEg7ZuSqsHxWVDfbldPUmJP8',
  database: process.env.PG_DATABASE || 'web103_vyht',
  ssl: { rejectUnauthorized: false },
})

export default pool
