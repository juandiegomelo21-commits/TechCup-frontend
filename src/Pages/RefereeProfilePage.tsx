import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';

const RefereeProfilePage = () => {
  const navigate = useNavigate();

  const referee = {
    name: 'María González',
    role: 'Referee',
    fullName: 'María González',
    nationalId: '0967654321',
    email: 'maria.gonzalez@referee-association.org',
    licenseNumber: 'REF-2024-0496',
    yearsOfExperience: '8 years',
    status: 'Certified',
    matchesOfficiated: 0,
    averageRating: 5.0,
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />
      <img src={campoFutbol} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22, zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,60,35,0.35)', zIndex: 2 }} />

      {/* SIDEBAR */}
      <div style={{ position: 'relative', zIndex: 10, width: '170px', minWidth: '170px', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        <img src={logo} alt="TechUp Fútbol" style={{ width: '85px', margin: '0 auto 28px auto', display: 'block' }} />
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 10px' }}>
          {[
            { label: 'Panel Principal', icon: '▦', active: true },
            { label: 'Mi Equipo', icon: '👥' },
            { label: 'Pagos', icon: '💳' },
            { label: 'Mercado', icon: '🛒' },
            { label: 'Historial', icon: '📋' },
          ].map((item) => (
            <button key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', border: 'none', background: item.active ? 'rgba(255,255,255,0.18)' : 'transparent', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '12px', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[{ label: 'Preguntas Frecuentes', icon: '❓' }, { label: 'Aprender', icon: '📖' }, { label: 'Cerrar Sesión', icon: '🚪' }].map((item) => (
            <button key={item.label} onClick={item.label === 'Cerrar Sesión' ? () => navigate('/login') : undefined} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '12px', cursor: 'pointer', textAlign: 'left', width: '100%', opacity: 0.85 }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 30px 20px 10px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '480px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', overflow: 'hidden' }}>

          {/* Header amarillo */}
          <div style={{ backgroundColor: '#F5C518', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                👤
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>
                  {referee.name}
                </p>
                <span style={{ backgroundColor: '#4FC3F7', color: '#0D47A1', borderRadius: '20px', padding: '2px 10px', fontSize: '10px', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  {referee.role}
                </span>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontFamily: "'Inter', sans-serif", cursor: 'pointer', color: '#1a1a1a', fontWeight: 500 }}>
              ✏️ Editar Perfil
            </button>
          </div>

          {/* Cuerpo */}
          <div style={{ padding: '16px 18px' }}>

            {/* Información Personal */}
            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
              👤 Información Personal
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>FULL NAME</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{referee.fullName}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>NATIONAL ID</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>🪪 {referee.nationalId}</p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMAIL ADDRESS</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>✉️ {referee.email}</p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#eee', margin: '0 0 14px 0' }} />

            {/* Referee Credentials */}
            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
              🏅 Referee Credentials
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>LICENSE NUMBER</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>🪪 {referee.licenseNumber}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>YEARS OF EXPERIENCE</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>🕐 {referee.yearsOfExperience}</p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, padding: '10px 8px', backgroundColor: '#4CAF50', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#fff' }}>{referee.status}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>Status</span>
              </div>
              <div style={{ flex: 1, padding: '10px 8px', backgroundColor: '#F5C518', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#1a1a1a' }}>{referee.matchesOfficiated}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#555' }}>Matches Officiated</span>
              </div>
              <div style={{ flex: 1, padding: '10px 8px', backgroundColor: '#4FC3F7', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#0D47A1' }}>{referee.averageRating}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#0D47A1' }}>Average Rating</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeProfilePage;