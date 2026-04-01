import pool from '../db.js'

async function reset() {
  await pool.query(`
    DROP TABLE IF EXISTS custom_trips;

    CREATE TABLE custom_trips (
      id                SERIAL PRIMARY KEY,
      name              VARCHAR(255) NOT NULL,
      accommodation     VARCHAR(50)  NOT NULL,
      food              VARCHAR(50)  NOT NULL,
      transportation    VARCHAR(50)  NOT NULL,
      utilities         VARCHAR(50)  NOT NULL,
      total_daily_cost  DECIMAL(10,2) NOT NULL,
      created_at        TIMESTAMP DEFAULT NOW()
    );
  `)
  console.log('✅ custom_trips table reset')
  await pool.end()
}

reset().catch(err => { console.error(err); process.exit(1) })
