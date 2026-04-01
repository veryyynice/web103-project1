import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/logo.svg" alt="Nomad Hub logo" className="header-logo" />
          <span className="header-title">Nomad Hub</span>
        </div>
        <nav className="header-nav">
          <button className="home-btn" onClick={() => navigate('/')}>Destinations</button>
          <button className="home-btn" onClick={() => navigate('/trips')}>My Trips</button>
          <button className="home-btn" onClick={() => navigate('/trips/new')}>+ Build Trip</button>
        </nav>
      </div>
    </header>
  )
}
