import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import { getPlayersApi, PlayerResponse } from '../../api/playerService';
import { getTeamsApi } from '../../api/teamService';

const positionLabel: Record<string, string> = {
  GoalKeeper: 'Portero',
  Defender: 'Defensa',
  Midfielder: 'Mediocampista',
  Winger: 'Extremo',
};

const thStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '11px',
  color: 'rgba(255,255,255,0.6)',
  fontWeight: 'normal',
  padding: '6px 8px',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
  color: 'rgba(255,255,255,0.85)',
  padding: '8px',
  textAlign: 'left',
};

const DashboardCapitan = () => {
  const navigate = useNavigate();
  const [availablePlayers, setAvailablePlayers] = useState<PlayerResponse[]>([]);
  const [currentPlayers, setCurrentPlayers] = useState(0);
  const maxPlayers = 20;

  useEffect(() => {
    const userId = localStorage.getItem('userId') ?? '';
    getPlayersApi()
      .then(data => setAvailablePlayers(data.filter(p => p.disponible && !p.haveTeam && p.id !== userId)))
      .catch(() => setAvailablePlayers([]));
    if (userId) {
      getTeamsApi()
        .then(teams => {
          const myTeam = teams.find(t => t.players.includes(userId));
          if (myTeam) setCurrentPlayers(myTeam.players.length);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        overflow: 'hidden',
      }}>

        {/* Fila superior */}
        <div className="dash-top-row">

          {/* Resumen del Equipo */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <div style={{
              backgroundColor: '#FFBF00',
              padding: '8px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#000',
              display: 'inline-block',
              borderRadius: '0 0 8px 0',
            }}>
              Resumen del Equipo
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

              {/* Jugadores inscritos */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Icono escudo */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #FFBF00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" stroke="#FFBF00" strokeWidth="1.8"/>
                  </svg>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                      Jugadores Inscritos
                    </span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '16px', color: '#FFBF00' }}>
                      {currentPlayers} / {maxPlayers}
                    </span>
                  </div>
                  {/* Barra progreso */}
                  <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', height: '6px' }}>
                    <div style={{
                      width: `${(currentPlayers / maxPlayers) * 100}%`,
                      backgroundColor: '#FFBF00',
                      borderRadius: '4px',
                      height: '6px',
                    }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', display: 'block' }}>
                    {maxPlayers - currentPlayers} espacios disponibles
                  </span>
                </div>
              </div>

              {/* Badge Capitán */}
              <div>
                <span style={{
                  backgroundColor: '#FFBF00',
                  color: '#000',
                  padding: '4px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 'bold',
                }}>
                  Capitán
                </span>
              </div>
            </div>
          </div>

          {/* Perfil + Estadísticas */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '150px',
          }}>
            {/* Perfil */}
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.25)',
              borderRadius: '12px',
              overflow: 'hidden',
              flex: 1,
            }}>
              <button
                onClick={() => navigate('/player-profile')}
                style={{
                  backgroundColor: '#FFBF00',
                  border: 'none',
                  width: '100%',
                  padding: '8px 16px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 'bold',
                  fontSize: '13px',
                  color: '#000',
                  cursor: 'pointer',
                }}
              >
                Perfil
              </button>
              <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
                <svg width="60" height="70" viewBox="0 0 100 110" fill="none">
                  <circle cx="50" cy="35" r="28" fill="#888"/>
                  <ellipse cx="50" cy="95" rx="40" ry="22" fill="#888"/>
                </svg>
              </div>
            </div>

            {/* Tus Estadísticas */}
            <button
              onClick={() => navigate('/estadisticas')}
              style={{
                backgroundColor: '#FFBF00',
                border: 'none',
                width: '100%',
                padding: '10px 16px',
                borderRadius: '8px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 'bold',
                fontSize: '13px',
                color: '#000',
                cursor: 'pointer',
              }}
            >
              Tus Estadísticas
            </button>
          </div>
        </div>

        {/* Fila inferior */}
        <div className="grid-2col" style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>

          {/* Buscar Jugadores */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              backgroundColor: '#FFBF00',
              padding: '8px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#000',
            }}>
              Buscar Jugadores Disponibles
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', position: 'sticky', top: 0, backgroundColor: 'rgba(0,40,20,0.95)' }}>
                    <th style={thStyle}>Nombre</th>
                    <th style={thStyle}>Posición</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Edad</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {availablePlayers.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ ...tdStyle, textAlign: 'center', opacity: 0.5, padding: '20px' }}>
                        No hay jugadores disponibles
                      </td>
                    </tr>
                  ) : availablePlayers.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <td style={tdStyle}>{p.fullname}</td>
                      <td style={tdStyle}>{positionLabel[p.position] ?? p.position}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>{p.age}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <button style={{
                          backgroundColor: '#FFBF00', border: 'none', borderRadius: '6px',
                          padding: '4px 12px', fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 'bold', fontSize: '11px', color: '#000', cursor: 'pointer',
                        }}>
                          Invitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invitaciones Enviadas */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              backgroundColor: '#FFBF00',
              padding: '8px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#000',
            }}>
              Invitaciones Enviadas
            </div>

            <div style={{ overflowY: 'auto', flex: 1, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                Sin invitaciones enviadas aún
              </p>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCapitan;