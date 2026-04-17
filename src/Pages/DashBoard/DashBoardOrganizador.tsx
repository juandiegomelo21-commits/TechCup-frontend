import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import { getTeamsApi, TeamResponse } from '../../api/teamService';
import { getTournamentsApi, TournamentResponse } from '../../api/tournamentService';


const IconCrearTorneo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#FFBF00" />
    <path d="M12 7v10M7 12h10" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconConfigurarReglas = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#FFBF00" />
    <circle cx="12" cy="12" r="3" fill="#000" />
    <path
      d="M12 5v2M12 17v2M5 12H7M17 12h2M7.05 7.05l1.41 1.41M15.54 15.54l1.41 1.41M7.05 16.95l1.41-1.41M15.54 8.46l1.41-1.41"
      stroke="#000" strokeWidth="1.6" strokeLinecap="round"
    />
  </svg>
);

const IconIniciarJornada = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#FFBF00" />
    <path d="M10 8l6 4-6 4V8z" fill="#000" />
  </svg>
);

const IconFinalizarTorneo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#FFBF00" />
    <path d="M7.5 12l3 3 5-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TEAM_COLORS = ['#e74c3c', '#27ae60', '#e67e22', '#8e44ad', '#2980b9', '#16a085', '#c0392b', '#1abc9c'];

const accesos = [
  { label: 'Crear Torneo',      icon: <IconCrearTorneo />,      path: '/torneo/crear' },
  { label: 'Configurar Reglas', icon: <IconConfigurarReglas />, path: '/torneo/reglas' },
  { label: 'Iniciar Jornada',   icon: <IconIniciarJornada />,   path: '/torneo/jornada' },
  { label: 'Finalizar Torneo',  icon: <IconFinalizarTorneo />,  path: '/torneo/finalizar' },
];

// ── Dashboard Organizador ───────────────────────────────────────────────────

const DashboardOrganizador = () => {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<TeamResponse[]>([]);
  const [torneo, setTorneo] = useState<TournamentResponse | null>(null);

  useEffect(() => {
    getTeamsApi().then(setEquipos).catch(() => setEquipos([]));
    getTournamentsApi()
      .then(data => setTorneo(data.find(t => t.currentState === 'ACTIVE' || t.currentState === 'IN_PROGRESS') ?? data[0] ?? null))
      .catch(() => setTorneo(null));
  }, []);

  const card: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.13)',
    padding: '20px 24px',
  };

  const colWidths = '56px 1fr 160px 100px 120px';

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: '100%',
        fontFamily: "'Inter', sans-serif",
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <h1 style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '-0.3px',
            }}>
              {torneo?.name ?? 'Sin torneo activo'}
            </h1>
            <span style={{
              backgroundColor: '#FFBF00',
              color: '#000',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '20px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              {torneo?.currentState ?? '—'}
            </span>
          </div>

          <div
            style={{
              backgroundColor: '#FFBF00',
              borderRadius: '10px',
              padding: '9px 24px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              color: '#000',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/perfil')}
          >
            Perfil
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div style={card}>
          <p style={{
            margin: '0 0 16px 0',
            fontSize: '15px',
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Accesos Rápidos
          </p>
          <div className="grid-stats" style={{ padding: 0 }}>
            {accesos.map((item) => (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '20px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,191,0,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
              >
                {item.icon}
                <span style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  fontWeight: 500,
                  textAlign: 'center',
                  lineHeight: '1.3',
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Equipos Inscritos */}
        <div style={{ ...card, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <p style={{
            margin: '0 0 16px 0',
            fontSize: '15px',
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Equipos Inscritos
          </p>

          <div className="scroll-x" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Cabecera tabla */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: colWidths,
            padding: '8px 10px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            minWidth: '500px',
          }}>
            {['Escudo', 'Nombre del Equipo', 'Capitán', 'Jugadores', 'Acción'].map((col) => (
              <span key={col} style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {col}
              </span>
            ))}
          </div>

          {/* Filas */}
          <div style={{ overflowY: 'auto', flex: 1, minWidth: '500px' }}>
            {equipos.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif", fontSize: '13px', textAlign: 'center', padding: '24px' }}>
                No hay equipos inscritos aún
              </p>
            ) : equipos.map((equipo, i) => {
              const siglas = equipo.teamName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
              const color = TEAM_COLORS[i % TEAM_COLORS.length];
              return (
                <div
                  key={equipo.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: colWidths,
                    padding: '11px 10px',
                    alignItems: 'center',
                    backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent',
                    borderRadius: '8px',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,191,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent')}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', backgroundColor: color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '11px', color: '#fff', fontFamily: "'Montserrat', sans-serif",
                  }}>
                    {siglas}
                  </div>

                  <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>
                    {equipo.teamName}
                  </span>

                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                    {equipo.captainName}
                  </span>

                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                    {equipo.players.length}
                  </span>

                  <button
                    onClick={() => navigate(`/equipo/${equipo.id}`)}
                    style={{
                      backgroundColor: '#FFBF00', color: '#000', border: 'none',
                      borderRadius: '20px', padding: '6px 16px', fontSize: '11px',
                      fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
                    }}
                  >
                    Ver Detalles
                  </button>
                </div>
              );
            })}
          </div>
          </div>{/* scroll-x */}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardOrganizador;
