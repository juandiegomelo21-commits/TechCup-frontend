import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';

const PlayerProfilePage = () => {
  const navigate = useNavigate();

  // Datos de ejemplo
  const player = {
    name: 'Carlos Rodríguez',
    roles: ['Player', 'Student'],
    fullName: 'Carlos Andres Rodríguez Gaitan',
    nationalId: '1010538475',
    email: 'carlos.rodriguez@university.edu.co',
    preferredPosition: 'Volante (Midfielder)',
    jerseyNumber: 10,
    accountType: 'Student',
    available: true,
    matchesPlayed: 0,
    goalsScored: 0,
  };

  const roleColors = {
    Player: { bg: '#4FC3F7', text: '#0D47A1' },
    Student: { bg: '#CE93D8', text: '#4A148C' },
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Fondo verde */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />

      {/* Imagen de fondo */}
      <img
        src={campoFutbol}
        alt="Jugador"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.22,
          zIndex: 1,
        }}
      />

      {/* Overlay oscuro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 60, 35, 0.35)',
          zIndex: 2,
        }}
      />

      {/* ── SIDEBAR ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '180px',
          minWidth: '180px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 0 20px 0',
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="TechUp Fútbol"
          style={{
            width: '90px',
            margin: '0 auto 28px auto',
            display: 'block',
          }}
        />

        {/* Nav principal */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 12px' }}>
          {[
            { label: 'Panel Principal', active: true },
            { label: 'Mi Equipo'},
            { label: 'Pagos' },
            { label: 'Mercado'},
            { label: 'Historial'},
          ].map((item) => (
            <button
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                borderRadius: '8px',
                border: 'none',
                background: item.active ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span style={{ fontSize: '13px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Nav inferior */}
        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { label: 'Preguntas Frecuentes'},
            { label: 'Aprender'},
            { label: 'Cerrar Sesión'},
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.label === 'Cerrar Sesión' ? () => navigate('/login') : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                opacity: 0.85,
              }}
            >
              <span style={{ fontSize: '13px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 30px 20px 10px',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            overflow: 'hidden',
          }}
        >
          {/* Header amarillo */}
          <div
            style={{
              backgroundColor: '#F5C518',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Avatar placeholder */}
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                👤
              </div>
              <div>
                <p
                  style={{
                    margin: '0 0 5px 0',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#1a1a1a',
                  }}
                >
                  {player.name}
                </p>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {player.roles.map((role) => (
                    <span
                      key={role}
                      style={{
                        backgroundColor: roleColors[role]?.bg || '#ddd',
                        color: roleColors[role]?.text || '#333',
                        borderRadius: '20px',
                        padding: '2px 10px',
                        fontSize: '10px',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '11px',
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                color: '#1a1a1a',
                fontWeight: 500,
              }}
            >
                Editar Perfil
            </button>
          </div>

          {/* Cuerpo */}
          <div style={{ padding: '16px 18px' }}>

            {/* Información Personal */}
            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
              Información Personal
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>FULL NAME</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{player.fullName}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>NATIONAL ID</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {player.nationalId}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMAIL ADDRESS</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '4px' }}>
                {player.email}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: '#eee', margin: '0 0 14px 0' }} />

            {/* Perfil Deportivo */}
            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
               Perfil Deportivo
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>PREFERRED POSITION</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '4px' }}>
                   {player.preferredPosition}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>JERSEY NUMBER</p>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F5C518',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#1a1a1a',
                  }}
                >
                  {player.jerseyNumber}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACCOUNT TYPE</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{player.accountType}</p>
            </div>

            {/* Botones de stats */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{
                  flex: 1,
                  padding: '10px 8px',
                  backgroundColor: '#4CAF50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                Disponible
                <span style={{ fontSize: '9px', fontWeight: 400, opacity: 0.85 }}>Disponible para Equipos</span>
              </button>

              <button
                style={{
                  flex: 1,
                  padding: '10px 8px',
                  backgroundColor: '#F5C518',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                {player.matchesPlayed}
                <span style={{ fontSize: '9px', fontWeight: 400 }}>Matches Played</span>
              </button>

              <button
                style={{
                  flex: 1,
                  padding: '10px 8px',
                  backgroundColor: '#4FC3F7',
                  color: '#0D47A1',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                {player.goalsScored}
                <span style={{ fontSize: '9px', fontWeight: 400 }}>Goals Scored</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfilePage;