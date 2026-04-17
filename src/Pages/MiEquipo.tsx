import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { getTeamsApi, TeamResponse } from '../api/teamService';
import { getPlayersApi, PlayerResponse } from '../api/playerService';

interface Jugador {
  id: string;
  nombre: string;
  esTu?: boolean;
}

type EstadoEquipo = 'loading' | 'error' | 'sin_equipo' | 'con_equipo';

const JugadorCard = ({ jugador }: { jugador: Jugador }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '110px',
        backgroundColor: 'rgba(0,0,0,0.35)', cursor: 'pointer',
        border: `1px solid ${hovered ? '#FFBF00' : 'rgba(255,255,255,0.1)'}`,
        transition: 'all 0.22s ease',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: hovered ? '0 0 20px rgba(255,191,0,0.35)' : 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{ fontSize: '36px', marginBottom: '8px' }}>⚽</div>
      <span style={{
        color: hovered ? '#FFBF00' : '#ffffff',
        fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
        fontSize: '10px', letterSpacing: '0.6px',
        textAlign: 'center', padding: '0 4px',
        transition: 'color 0.22s',
      }}>
        {jugador.nombre.toUpperCase()}
      </span>
    </div>
  );
};

const TuCard = ({ jugador }: { jugador: Jugador }) => (
  <div style={{
    width: '155px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden',
    position: 'relative', backgroundColor: 'rgba(255,191,0,0.1)',
    border: '2px solid #FFBF00',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    gap: '12px', minHeight: '210px', padding: '16px',
  }}>
    <div style={{ fontSize: '56px' }}>👤</div>
    <span style={{
      color: '#FFBF00', fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
      fontSize: '12px', textAlign: 'center', letterSpacing: '1px',
    }}>
      {jugador.nombre.toUpperCase()}
    </span>
    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>TÚ</span>
  </div>
);

const LoadingState = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid rgba(255,255,255,0.2)', borderTop: '3px solid #FFBF00',
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
      borderRadius: '16px', padding: '40px 32px', border: '1px solid rgba(255,80,80,0.3)',
    }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚠️</div>
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

const SinEquipoState = ({ onCrear }: { onCrear: () => void }) => (
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
      <button onClick={onCrear} style={{
        backgroundColor: '#FFBF00', color: '#000', border: 'none',
        borderRadius: '25px', padding: '12px 32px', fontSize: '14px',
        fontWeight: 700, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif",
      }}>Crear mi equipo</button>
    </div>
  </div>
);

const MiEquipo = () => {
  const navigate = useNavigate();
  const [estado, setEstado] = useState<EstadoEquipo>('loading');
  const [myTeam, setMyTeam] = useState<TeamResponse | null>(null);
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [tuJugador, setTuJugador] = useState<Jugador>({ id: 'yo', nombre: 'TÚ' });
  const [mercadoPlayers, setMercadoPlayers] = useState<PlayerResponse[]>([]);

  const cargar = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) { navigate('/login'); return; }
    setEstado('loading');

    Promise.all([getTeamsApi(), getPlayersApi()])
      .then(([teams, players]) => {
        const team = teams.find(t => t.players.includes(userId));
        const me = players.find(p => p.id === userId);
        if (me) setTuJugador({ id: me.id, nombre: me.fullname, esTu: true });

        const disponibles = players.filter(p => p.disponible && !p.haveTeam && p.id !== userId);
        setMercadoPlayers(disponibles.slice(0, 5));

        if (!team) { setEstado('sin_equipo'); return; }

        setMyTeam(team);
        const teamPlayers: Jugador[] = players
          .filter(p => team.players.includes(p.id) && p.id !== userId)
          .map(p => ({ id: p.id, nombre: p.fullname }));
        setJugadores(teamPlayers);
        setEstado('con_equipo');
      })
      .catch(() => setEstado('error'));
  };

  useEffect(() => { cargar(); }, []);

  const card: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.13)',
    padding: '14px 16px',
  };

  const btnAmarillo: React.CSSProperties = {
    backgroundColor: '#FFBF00', borderRadius: '25px', padding: '9px 0',
    textAlign: 'center' as const, fontFamily: "'Montserrat', sans-serif",
    fontWeight: 800, fontSize: '14px', color: '#000', cursor: 'pointer',
    border: 'none', width: '100%', display: 'block',
  };

  if (estado === 'loading')    return <DashboardLayout><LoadingState /></DashboardLayout>;
  if (estado === 'error')      return <DashboardLayout><ErrorState onRetry={cargar} /></DashboardLayout>;
  if (estado === 'sin_equipo') return <DashboardLayout><SinEquipoState onCrear={() => navigate('/equipo/crear')} /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', fontFamily: "'Inter', sans-serif" }}>

        {/* Fila superior: Mercado + Escudo */}
        <div className="dash-top-row" style={{ gap: '14px' }}>

          {/* Mercado */}
          <div style={{ ...card, flex: 1, alignSelf: 'flex-start' }}>
            <button style={{ ...btnAmarillo, marginBottom: '10px' }} onClick={() => navigate('/mercado')}>
              Mercado de jugadores
            </button>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Jugador', 'Posición'].map(h => (
                    <th key={h} style={{
                      color: 'rgba(255,255,255,0.5)', textAlign: 'left',
                      padding: '4px 8px', fontWeight: 600,
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mercadoPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={2} style={{ color: 'rgba(255,255,255,0.4)', padding: '10px 8px', fontSize: '12px' }}>
                      Sin jugadores disponibles
                    </td>
                  </tr>
                ) : mercadoPlayers.map((p) => (
                  <tr key={p.id}>
                    <td style={{ color: '#fff', padding: '6px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px' }}>{p.fullname}</td>
                    <td style={{ color: 'rgba(255,255,255,0.6)', padding: '6px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px' }}>{p.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Escudo */}
          <div style={{ ...card, width: '200px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ ...btnAmarillo, cursor: 'default' }}>{myTeam?.teamName ?? 'Mi Equipo'}</div>
            <div style={{
              width: '90px', height: '90px', backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px dashed rgba(255,255,255,0.2)',
            }}>
              <svg width="50" height="50" viewBox="0 0 56 56" fill="none">
                <path d="M28 4L6 14v16c0 12 9.5 22 22 26 12.5-4 22-14 22-26V14L28 4z" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="rgba(255,255,255,0.05)"/>
                <circle cx="28" cy="28" r="8" stroke="#FFBF00" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Jugadores del equipo */}
        <div style={{ ...card, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{
              backgroundColor: '#FFBF00', borderRadius: '25px', padding: '9px 24px',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '14px', color: '#000',
            }}>
              Jugadores de tu equipo
            </div>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              {jugadores.length + 1}/{myTeam ? 12 : 0} jugadores
            </span>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <div className="grid-players" style={{ flex: 1, alignContent: 'start' }}>
              {jugadores.map(j => <JugadorCard key={j.id} jugador={j} />)}
            </div>
            <TuCard jugador={tuJugador} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
            <button onClick={() => navigate('/equipo/pizarra')} style={{
              backgroundColor: '#FFBF00', color: '#000', border: 'none',
              borderRadius: '25px', padding: '11px 40px', fontSize: '14px',
              fontWeight: 700, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif",
            }}>
              Pizarra de tu equipo
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MiEquipo;
