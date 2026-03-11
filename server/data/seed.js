import pool from '../db.js'

const destinations = [
  {
    id: 1,
    name: "Mexico City",
    country: "Mexico",
    price_per_day: "$40",
    trip_length: "1–2 weeks",
    audience: "Foodies & Culture Lovers",
    image: "https://images.unsplash.com/photo-1518659526054-190340b32735?w=800&q=80",
    description: "Mexico City is one of the most vibrant and affordable capitals in the world. Explore world-class museums, gorge on incredible street tacos for under $2, and wander through colorful neighborhoods like Coyoacán and Roma Norte. Hostels run around $15/night and the metro costs less than $0.30 a ride.",
    best_for: "Art, street food, history, nightlife",
    submitted_by: "BackpackerBella",
    submitted_on: "2024-09-12"
  },
  {
    id: 2,
    name: "Lisbon",
    country: "Portugal",
    price_per_day: "$60",
    trip_length: "1 week",
    audience: "History Buffs & Beach Lovers",
    image: "https://images.goway.com/production/styles/hero_s1_2xl/s3/hero/iStock-1137863101.jpg.webp?VersionId=TNqde4tjrqdi_HRPUjK4M.ozf0__Ik67&h=08f4e768&itok=_3r2F97l",
    description: "Lisbon is the cheapest capital in Western Europe and one of its most beautiful. Ride vintage trams up steep hills, eat a pastel de nata for €1.20, and day-trip to the palaces of Sintra. Budget-friendly hostels are plentiful and the city is super walkable.",
    best_for: "Architecture, beaches, European charm on a budget",
    submitted_by: "EuroTripper99",
    submitted_on: "2024-10-03"
  },
  {
    id: 3,
    name: "Bangkok",
    country: "Thailand",
    price_per_day: "$35",
    trip_length: "1–2 weeks",
    audience: "Adventurers & Street Food Fans",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    description: "Bangkok is a sensory overload in the best possible way — glittering temples, neon-lit night markets, and some of the world's best street food for under $2 a plate. The city is a major hub, so flights are often cheap, and dorm beds in Khao San Road cost as little as $8/night.",
    best_for: "Street food, temples, nightlife, island hopping base",
    submitted_by: "NomadNick",
    submitted_on: "2024-08-21"
  },
  {
    id: 4,
    name: "Prague",
    country: "Czech Republic",
    price_per_day: "$55",
    trip_length: "1 week",
    audience: "History & Nightlife Seekers",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
    description: "Prague looks like a fairy tale and costs a fraction of what you'd pay in Paris or London. Walk across the Charles Bridge, visit a medieval castle, and enjoy Czech pilsner for $1.50 at a local pub. Centrally located in Europe, it's perfect as a base for exploring nearby countries too.",
    best_for: "Architecture, nightlife, central European travel hub",
    submitted_by: "CenturyHopper",
    submitted_on: "2024-11-05"
  },
  {
    id: 5,
    name: "Medellín",
    country: "Colombia",
    price_per_day: "$45",
    trip_length: "1–2 weeks",
    audience: "Explorers & Digital Nomads",
    image: "https://lp-cms-production.imgix.net/2022-03/Columbia%20Medellin%20Juan%20Alberto%20Casado%20GettyImages-1270346925%20RFE.jpg?auto=format,compress&q=72&fit=crop&ar=1:1",
    description: "Once infamous, Medellín has transformed into one of Latin America's hippest cities. Enjoy 'eternal spring' weather year-round, ride the free cable cars for panoramic views, and explore the booming café and street art scenes. Airbnbs are cheap and the food scene is incredible.",
    best_for: "Coffee culture, street art, warm weather, outdoor activities",
    submitted_by: "SolJourneys",
    submitted_on: "2024-12-01"
  }
]

async function seed() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS destinations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        price_per_day VARCHAR(50),
        trip_length VARCHAR(100),
        audience VARCHAR(255),
        image TEXT,
        description TEXT,
        best_for TEXT,
        submitted_by VARCHAR(255),
        submitted_on DATE
      )
    `)
    console.log('✅ Table created (or already exists)')

    await client.query('DELETE FROM destinations')
    console.log('🗑️  Cleared existing rows')

    for (const d of destinations) {
      await client.query(
        `INSERT INTO destinations (id, name, country, price_per_day, trip_length, audience, image, description, best_for, submitted_by, submitted_on)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [d.id, d.name, d.country, d.price_per_day, d.trip_length, d.audience, d.image, d.description, d.best_for, d.submitted_by, d.submitted_on]
      )
    }
    console.log(`🌱 Seeded ${destinations.length} destinations`)
  } finally {
    client.release()
    await pool.end()
  }
}

seed().catch(err => { console.error(err); process.exit(1) })
