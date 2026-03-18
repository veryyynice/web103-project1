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

const events = [
  // Mexico City (id: 1)
  { destination_id: 1, title: 'Nomad Coffee Meetup', description: 'Connect with fellow remote workers over great coffee in Roma Norte. Laptops welcome!', event_date: '2026-04-05 10:00', location_detail: 'Blend Station, Roma Norte', category: 'Networking' },
  { destination_id: 1, title: 'Street Art Walking Tour', description: 'Explore the vibrant murals of Coyoacán and Doctores with a local artist guide.', event_date: '2026-04-15 14:00', location_detail: 'Meeting point: Parque México', category: 'Culture' },
  { destination_id: 1, title: 'Spanish Language Exchange', description: 'Practice Spanish with locals who want to practice English. All levels welcome.', event_date: '2026-05-02 19:00', location_detail: 'El Péndulo Bookstore, Condesa', category: 'Social' },
  { destination_id: 1, title: 'Lucha Libre Night', description: 'Experience Mexico City\'s iconic wrestling spectacle at Arena México.', event_date: '2026-02-20 20:00', location_detail: 'Arena México, Centro Histórico', category: 'Entertainment' },

  // Lisbon (id: 2)
  { destination_id: 2, title: 'Surf Lesson at Cascais', description: 'Beginner-friendly surf lesson on one of Europe\'s best Atlantic beaches.', event_date: '2026-04-10 09:00', location_detail: 'Cascais Beach, 30 min from Lisbon', category: 'Outdoor' },
  { destination_id: 2, title: 'Tech Nomads Lisbon Meetup', description: 'Monthly gathering of remote workers, freelancers, and startup founders.', event_date: '2026-04-22 18:30', location_detail: 'Second Home Lisboa, Mercado da Ribeira', category: 'Networking' },
  { destination_id: 2, title: 'Fado Concert at Alfama', description: 'An intimate evening of traditional Portuguese fado music in a historic venue.', event_date: '2026-05-10 21:00', location_detail: 'A Baiuca, Alfama', category: 'Culture' },
  { destination_id: 2, title: 'Sintra Day Trip', description: 'Group day trip to the fairy-tale palaces of Sintra. Train ticket ~€5 round trip.', event_date: '2026-03-01 08:30', location_detail: 'Rossio Train Station, Lisbon', category: 'Outdoor' },

  // Bangkok (id: 3)
  { destination_id: 3, title: 'Muay Thai Beginner Class', description: 'Learn the basics of Thailand\'s national sport from a certified trainer.', event_date: '2026-04-08 17:00', location_detail: 'Fairtex Muay Thai, Silom', category: 'Fitness' },
  { destination_id: 3, title: 'Startup Pitch Night', description: 'Watch early-stage startups pitch to investors and network with the Bangkok tech scene.', event_date: '2026-04-18 19:00', location_detail: 'HUBBA-TO, Ekkamai', category: 'Networking' },
  { destination_id: 3, title: 'Night Market Street Food Tour', description: 'Guided tour through Bangkok\'s best night markets. Try 10+ dishes under $10.', event_date: '2026-04-28 18:00', location_detail: 'Talad Rot Fai Ratchada', category: 'Food' },
  { destination_id: 3, title: 'Temple Meditation Morning', description: 'Join monks for morning meditation at one of Bangkok\'s most peaceful temples.', event_date: '2026-03-10 07:00', location_detail: 'Wat Mahathat, Rattanakosin Island', category: 'Culture' },

  // Prague (id: 4)
  { destination_id: 4, title: 'Digital Nomad Conference', description: 'Full-day conference with talks on remote work, freelancing, and building online businesses.', event_date: '2026-04-12 09:00', location_detail: 'Node5, Smíchov', category: 'Networking' },
  { destination_id: 4, title: 'Czech Craft Beer Tasting', description: 'Sample 6 local craft beers with a knowledgeable guide through Prague\'s microbrewery scene.', event_date: '2026-04-25 18:00', location_detail: 'Pivovar Národní, Nové Město', category: 'Food' },
  { destination_id: 4, title: 'Castle & Old Town Walk', description: 'A morning walk through Prague Castle and Charles Bridge with a licensed guide.', event_date: '2026-05-05 10:00', location_detail: 'Meeting: Prague Castle main gate', category: 'Culture' },
  { destination_id: 4, title: 'Jazz Night at Reduta', description: 'Live jazz at Prague\'s oldest jazz club, famous for Bill Clinton\'s saxophone performance.', event_date: '2026-03-05 21:00', location_detail: 'Reduta Jazz Club, Nové Město', category: 'Entertainment' },

  // Medellín (id: 5)
  { destination_id: 5, title: 'Coffee Farm Tour', description: 'Day trip to a working coffee farm in the Antioquia hills. Includes tasting and farm tour.', event_date: '2026-04-06 09:00', location_detail: 'Hacienda Cafetera, 45 min from Medellín', category: 'Outdoor' },
  { destination_id: 5, title: 'Salsa Dance Class', description: 'Learn Colombian salsa from a professional dancer. All levels welcome, no partner needed.', event_date: '2026-04-17 19:00', location_detail: 'Tango Bar, El Poblado', category: 'Social' },
  { destination_id: 5, title: 'Tech & Startup Meetup', description: 'Monthly meetup for Medellín\'s growing tech and remote work community.', event_date: '2026-05-07 18:00', location_detail: 'Selina Medellín, El Poblado', category: 'Networking' },
  { destination_id: 5, title: 'Paragliding Adventure', description: 'Tandem paragliding over the Andes from San Félix. Stunning views, ~$60.', event_date: '2026-03-08 10:00', location_detail: 'San Félix, 30 min from Medellín', category: 'Outdoor' },
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

    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date TIMESTAMP NOT NULL,
        location_detail VARCHAR(255),
        category VARCHAR(100)
      )
    `)
    console.log('✅ Tables created (or already exist)')

    await client.query('DELETE FROM events')
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

    for (const e of events) {
      await client.query(
        `INSERT INTO events (destination_id, title, description, event_date, location_detail, category)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [e.destination_id, e.title, e.description, e.event_date, e.location_detail, e.category]
      )
    }
    console.log(`🌱 Seeded ${events.length} events`)
  } finally {
    client.release()
    await pool.end()
  }
}

seed().catch(err => { console.error(err); process.exit(1) })
