import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';
import { getPlayerByIdApi, type PlayerResponse } from '../api/playerService';

const posicionDisplay: Record<string, string> = {
  GoalKeeper:   'Portero',
  Defender:     'Defensa',
  Midfielder:   'Mediocampista',
  Winger:       'Extremo',
  Forward:      'Delantero',
};

const tipoDisplay: Record<string, string> = {
  ESTUDIANTE: 'Estudiante',
  GRADUADO:   'Graduado',
  EXTERNO:    'Externo',
  FAMILIAR:   'Familiar',
};

const roleColors: Record<string, { bg: string; text: string }> = {
  Estudiante: { bg: '#CE93D8', text: '#4A148C' },
  Graduado:   { bg: '#80CBC4', text: '#004D40' },
  Externo:    { bg: '#FFCC80', text: '#E65100' },
  Familiar:   { bg: '#90CAF9', text: '#0D47A1' },
  Jugador:    { bg: '#4FC3F7', text: '#0D47A1' },
};

const PlayerProfilePage = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<PlayerResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId') ?? '';
    if (!userId) { setLoading(false); return; }
    getPlayerByIdApi(userId)
      .then(setPlayer)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const rol = localStorage.getItem('rol') ?? '';
  const dashboardPath =
    rol === 'ORGANIZADOR' ? '/dashboard/org' :
    rol === 'ARBITRO'     ? '/dashboard/arbitro' :
    rol === 'CAPITAN'     ? '/dashboard/capitan' :
    '/dashboard';

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />

      <img
        src={campoFutbol}
        alt="Cancha"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', opacity: 0.22, zIndex: 1,
        }}
      />

      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 60, 35, 0.35)', zIndex: 2 }} />

      {/* SIDEBAR */}
      <div style={{ position: 'relative', zIndex: 10, width: '180px', minWidth: '180px', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        <img src={logo} alt="TechCup" style={{ width: '90px', margin: '0 auto 28px auto', display: 'block' }} />

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 12px' }}>
          {[
            { label: 'Panel Principal', path: dashboardPath },
            { label: 'Buscar Jugadores', path: '/player-search' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px',
                borderRadius: '8px', border: 'none', background: 'transparent',
                color: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: '12px',
                cursor: 'pointer', textAlign: 'left', width: '100%',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px',
              borderRadius: '8px', border: 'none', background: 'transparent',
              color: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: '12px',
              cursor: 'pointer', textAlign: 'left', width: '100%', opacity: 0.85,
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 30px 20px 10px' }}>
        {loading ? (
          <div style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
            Cargando perfil...
          </div>
        ) : !player ? (
          <div style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: '14px', textAlign: 'center' }}>
            <p>No se pudo cargar el perfil.</p>
            <button onClick={() => navigate(dashboardPath)} style={{ marginTop: '12px', backgroundColor: '#FFBF00', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', fontWeight: 700 }}>
              Volver al panel
            </button>
          </div>
        ) : (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '480px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', overflow: 'hidden' }}>

            {/* Header amarillo */}
            <div style={{ backgroundColor: '#F5C518', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {player.photoUrl ? (
                  <img src={player.photoUrl} alt={player.fullname} style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                    <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="35" r="24" fill="#555"/>
                      <ellipse cx="50" cy="82" rx="34" ry="22" fill="#555"/>
                    </svg>
                  </div>
                )}
                <div>
                  <p style={{ margin: '0 0 5px 0', fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>
                    {player.fullname}
                  </p>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {(['Jugador', tipoDisplay[player.playerType ?? ''] ?? player.playerType].filter(Boolean) as string[]).map((role) => (
                      <span
                        key={role}
                        style={{
                          backgroundColor: roleColors[role]?.bg ?? '#ddd',
                          color: roleColors[role]?.text ?? '#333',
                          borderRadius: '20px', padding: '2px 10px',
                          fontSize: '10px', fontFamily: "'Inter', sans-serif", fontWeight: 600,
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cuerpo */}
            <div style={{ padding: '16px 18px' }}>
              <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555' }}>
                Información Personal
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>NOMBRE COMPLETO</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{player.fullname}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>EDAD</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{player.age} años</p>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>CORREO ELECTRÓNICO</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>✉️ {player.email}</p>
              </div>

              <div style={{ height: '1px', backgroundColor: '#eee', margin: '0 0 14px 0' }} />

              <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555' }}>
                Perfil Deportivo
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>POSICIÓN PREFERIDA</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>
                    📍 {posicionDisplay[player.position] ?? player.position}
                  </p>
                </div>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>DORSAL</p>
                  <div style={{ width: '32px', height: '32px', backgroundColor: '#F5C518', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 800, color: '#1a1a1a' }}>
                    {player.dorsalNumber}
                  </div>
                </div>
              </div>

              {player.isCaptain && (
                <div style={{ marginBottom: '14px' }}>
                  <span style={{ backgroundColor: '#FFBF00', color: '#000', padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>
                    Capitán
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ flex: 1, padding: '10px 8px', backgroundColor: player.disponible ? '#4CAF50' : '#9E9E9E', color: '#ffffff', border: 'none', borderRadius: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  {player.disponible ? 'Disponible' : 'No disponible'}
                  <span style={{ fontSize: '9px', fontWeight: 400, opacity: 0.85 }}>Para equipos</span>
                </button>
                <button style={{ flex: 1, padding: '10px 8px', backgroundColor: '#F5C518', color: '#1a1a1a', border: 'none', borderRadius: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  {player.haveTeam ? 'Con equipo' : 'Sin equipo'}
                  <span style={{ fontSize: '9px', fontWeight: 400 }}>Estado de equipo</span>
                </button>
                <button style={{ flex: 1, padding: '10px 8px', backgroundColor: '#4FC3F7', color: '#0D47A1', border: 'none', borderRadius: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  {player.gender === 'MALE' || player.gender === 'M' ? 'Masculino' : player.gender === 'FEMALE' || player.gender === 'F' ? 'Femenino' : player.gender}
                  <span style={{ fontSize: '9px', fontWeight: 400 }}>Género</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerProfilePage;
