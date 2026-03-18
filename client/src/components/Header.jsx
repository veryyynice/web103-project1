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
        <button className="home-btn" onClick={() => navigate('/')}>Home</button>
      </div>
    </header>
  )
}
