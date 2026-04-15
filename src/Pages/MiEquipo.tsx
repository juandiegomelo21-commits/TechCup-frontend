import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { getPlayerByIdApi } from '../api/playerService';
import { getTeamsApi, type TeamResponse } from '../api/teamService';

type EstadoEquipo = 'loading' | 'error' | 'sin_equipo' | 'con_equipo';

const COLORS = ['#e74c3c','#27ae60','#e67e22','#8e44ad','#2980b9','#16a085','#c0392b','#1abc9c'];

// ── Avatar por iniciales ──────────────────────────────────────────────────────

const Avatar = ({ nombre, size = 52, index = 0 }: { nombre: string; size?: number; index?: number }) => {
  const initials = nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const color = COLORS[index % COLORS.length];
  return (
    <div style={{
      width: `${size}px`, height: `${size}px`, borderRadius: '50%',
      backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: `${size * 0.28}px`,
      color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

// ── JugadorCard ───────────────────────────────────────────────────────────────

const JugadorCard = ({ nombre, index }: { nombre: string; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '100px',
        backgroundColor: 'rgba(0,0,0,0.35)', cursor: 'pointer',
        border: `1px solid ${hovered ? '#FFBF00' : 'rgba(255,255,255,0.1)'}`,
        transition: 'all 0.22s ease',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: hovered ? '0 0 20px rgba(255,191,0,0.35)' : 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '8px', padding: '12px',
      }}
    >
      <Avatar nombre={nombre} size={44} index={index} />
      <span style={{
        color: hovered ? '#FFBF00' : '#ffffff',
        fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
        fontSize: '10px', letterSpacing: '0.5px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.22s',
      }}>
        {nombre.toUpperCase()}
      </span>
    </div>
  );
};

// ── TuCard ────────────────────────────────────────────────────────────────────

const TuCard = ({ nombre, index }: { nombre: string; index: number }) => (
  <div style={{
    width: '140px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden',
    position: 'relative', backgroundColor: 'rgba(0,0,0,0.3)',
    border: '2px solid #FFBF00',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', gap: '10px', minHeight: '180px', padding: '16px',
  }}>
    <Avatar nombre={nombre} size={68} index={index} />
    <span style={{
      color: '#FFBF00',
      fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
      fontSize: '11px', padding: '4px', textAlign: 'center',
      letterSpacing: '1px',
    }}>
      {nombre.toUpperCase()}
    </span>
    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>TÚ</span>
  </div>
);

// ── Estados visuales ──────────────────────────────────────────────────────────

const LoadingState = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid rgba(255,255,255,0.2)',
        borderTop: '3px solid #FFBF00',
        animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
      }} />
      <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: 0 }}>
        Cargando equipo...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  </div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div style={{
      textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: '16px', padding: '40px 32px',
      border: '1px solid rgba(255,80,80,0.3)',
    }}>
      <p style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '16px', margin: '0 0 8px' }}>
        Error al cargar el equipo
      </p>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", fontSize: '13px', margin: '0 0 20px' }}>
        No se pudo conectar con el servidor.
      </p>
      <button onClick={onRetry} style={{
        backgroundColor: '#FFBF00', color: '#000', border: 'none',
        borderRadius: '20px', padding: '9px 24px', fontSize: '13px',
        fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
      }}>Reintentar</button>
    </div>
  </div>
);

const SinEquipoState = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div style={{
      textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: '16px', padding: '48px 40px',
      border: '1px solid rgba(255,255,255,0.13)', maxWidth: '380px',
    }}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
        <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
        <circle cx="32" cy="32" r="10" stroke="#FFBF00" strokeWidth="2"/>
        <path d="M32 2v10M32 52v10M2 32h10M52 32h10" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <p style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '18px', margin: '0 0 8px' }}>
        Aún no tienes equipo
      </p>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", fontSize: '13px', margin: '0 0 24px', lineHeight: '1.5' }}>
        Crea tu equipo, agrega jugadores y participa en el torneo.
      </p>
    </div>
  </div>
);

// ── Pantalla principal ────────────────────────────────────────────────────────

const MiEquipo = () => {
  const navigate = useNavigate();
  const [estado, setEstado] = useState<EstadoEquipo>('loading');
  const [myTeam, setMyTeam] = useState<TeamResponse | null>(null);
  const [myName, setMyName] = useState('');

  const loadData = () => {
    const userId = localStorage.getItem('userId') ?? '';
    if (!userId) { setEstado('sin_equipo'); return; }

    setEstado('loading');
    Promise.all([getPlayerByIdApi(userId), getTeamsApi()])
      .then(([player, teams]) => {
        setMyName(player.fullname);
        if (!player.haveTeam) { setEstado('sin_equipo'); return; }
        const team = teams.find(t => t.captainName === player.fullname) ?? teams[0] ?? null;
        if (!team) { setEstado('sin_equipo'); return; }
        setMyTeam(team);
        setEstado('con_equipo');
      })
      .catch(() => setEstado('error'));
  };

  useEffect(() => { loadData(); }, []);

  const card: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.13)',
    padding: '14px 16px',
  };

  const btnAmarillo: React.CSSProperties = {
    backgroundColor: '#FFBF00',
    borderRadius: '25px',
    padding: '9px 0',
    textAlign: 'center' as const,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 800,
    fontSize: '14px',
    color: '#000',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    display: 'block',
  };

  if (estado === 'loading')    return <DashboardLayout><LoadingState /></DashboardLayout>;
  if (estado === 'error')      return <DashboardLayout><ErrorState onRetry={loadData} /></DashboardLayout>;
  if (estado === 'sin_equipo') return <DashboardLayout><SinEquipoState /></DashboardLayout>;

  const players = myTeam?.players ?? [];
  // players es string[] — pueden ser nombres o IDs; usamos como nombres para mostrar
  const otherPlayers = players.filter(p => p !== myName);

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', fontFamily: "'Inter', sans-serif" }}>

        {/* ── Fila superior: Mercado + Escudo ─────────────────────────────── */}
        <div style={{ display: 'flex', gap: '14px' }}>

          {/* Info equipo */}
          <div style={{ ...card, flex: 1, alignSelf: 'flex-start' }}>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif" }}>
                {myTeam?.teamName}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Inter', sans-serif" }}>Capitán</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#fff', fontFamily: "'Inter', sans-serif" }}>{myTeam?.captainName}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Inter', sans-serif" }}>Jugadores</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#FFBF00', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>{players.length} / 20</p>
              </div>
            </div>
          </div>

          {/* Escudo */}
          <div style={{ ...card, width: '160px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '80px', height: '80px', backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px dashed rgba(255,255,255,0.2)',
            }}>
              {myTeam?.shieldUrl ? (
                <img src={myTeam.shieldUrl} alt="Escudo" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
              ) : (
                <svg width="44" height="44" viewBox="0 0 56 56" fill="none">
                  <path d="M28 4L6 14v16c0 12 9.5 22 22 26 12.5-4 22-14 22-26V14L28 4z" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="rgba(255,255,255,0.05)"/>
                  <circle cx="28" cy="28" r="8" stroke="#FFBF00" strokeWidth="1.5" fill="none"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
              Escudo del equipo
            </span>
          </div>
        </div>

        {/* ── Jugadores del equipo ──────────────────────────────────────────── */}
        <div style={{ ...card, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{
              backgroundColor: '#FFBF00', borderRadius: '25px', padding: '9px 24px',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '14px', color: '#000',
            }}>
              Jugadores de tu equipo
            </div>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>
              {players.length}/20 jugadores
            </span>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{
              flex: 1, display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px', alignContent: 'start',
            }}>
              {otherPlayers.map((nombre, i) => (
                <JugadorCard key={nombre + i} nombre={nombre} index={i} />
              ))}
              {players.length === 0 && (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif", fontSize: '13px', gridColumn: '1/-1' }}>
                  No hay jugadores en el equipo aún.
                </p>
              )}
            </div>
            {myName && <TuCard nombre={myName} index={players.length} />}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
            <button onClick={() => navigate('/equipo/pizarra')} style={btnAmarillo as React.CSSProperties}>
              Pizarra de tu equipo
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MiEquipo;
