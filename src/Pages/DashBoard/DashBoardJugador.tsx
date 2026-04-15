import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import balon from '../../assets/balon.png';
import zapato from '../../assets/zapato.png';
import tarjetaAmarilla from '../../assets/tarjetaAmarilla.png';
import tarjetaRoja from '../../assets/tarjetaRoja.png';
import { getTournamentsApi } from '../../api/tournamentService';
import { getStandingsApi, type TeamStanding } from '../../api/standingsService';

const positionColors: Record<number, string> = { 1: '#FFBF00', 2: '#aaaaaa', 3: '#cd7f32' };

const thStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 'normal', padding: '6px 8px', textAlign: 'center', whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.85)', padding: '8px', textAlign: 'center' };

interface StatCardProps { label: string; value: number; icon: string; max?: number; iconSize?: number; }

const StatCard = ({ label, value, icon, max, iconSize = 48 }: StatCardProps) => (
  <div style={{ backgroundColor: 'rgba(0,80,40,0.5)', border: '1px solid rgba(255,191,0,0.3)', borderRadius: '10px', padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.8)', textAlign: 'center', minHeight: '28px', display: 'flex', alignItems: 'center' }}>{label}</span>
    <img src={icon} alt={label} style={{ width: `${iconSize}px`, height: `${iconSize}px`, objectFit: 'contain' }} />
    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '26px', color: '#fff' }}>{value}</span>
    {max !== undefined && (
      <>
        <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', height: '4px' }}>
          <div style={{ width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: '#FFBF00', borderRadius: '4px', height: '4px' }} />
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>{value}/{max}</span>
      </>
    )}
  </div>
);

const DashboardJugador = () => {
  const navigate = useNavigate();
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [tournamentName, setTournamentName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTournamentsApi()
      .then(async (torneos) => {
        if (torneos.length === 0) { setLoading(false); return; }
        const ultimo = torneos[torneos.length - 1];
        setTournamentName(ultimo.name);
        try {
          const data = await getStandingsApi(ultimo.id);
          setStandings(data.standings ?? []);
        } catch { setStandings([]); }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', overflow: 'hidden' }}>

        {/* Fila superior */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#FFBF00', padding: '8px 16px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#000' }}>
              Estadísticas del Jugador — {tournamentName || 'Torneo Actual'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '10px' }}>
              <StatCard label="Goles Anotados" value={0} icon={balon} iconSize={44} />
              <StatCard label="Partidos Jugados" value={0} icon={zapato} iconSize={50} />
              <StatCard label="Tarjetas Amarillas" value={0} icon={tarjetaAmarilla} iconSize={40} />
              <StatCard label="Tarjetas Rojas" value={0} icon={tarjetaRoja} iconSize={40} />
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px', overflow: 'hidden', minWidth: '140px' }}>
            <button onClick={() => navigate('/player-profile')} style={{ backgroundColor: '#FFBF00', border: 'none', width: '100%', padding: '8px 16px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#000', cursor: 'pointer' }}>
              Perfil
            </button>
            <div style={{ padding: '12px', display: 'flex', justifyContent: 'center' }}>
              <svg width="70" height="80" viewBox="0 0 100 110" fill="none">
                <circle cx="50" cy="35" r="28" fill="#888"/>
                <ellipse cx="50" cy="95" rx="40" ry="22" fill="#888"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Tabla de Posiciones */}
        <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ backgroundColor: '#FFBF00', padding: '8px 16px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#000', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 2h12v6a6 6 0 01-12 0V2z" stroke="#000" strokeWidth="1.8"/>
              <path d="M12 14v4m-4 2h8" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Tabla de Posiciones {tournamentName && `— ${tournamentName}`}
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>Cargando standings...</p>
            ) : standings.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>No hay datos de posiciones aún.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', position: 'sticky', top: 0, backgroundColor: 'rgba(0,40,20,0.95)' }}>
                    <th style={{ ...thStyle, width: '36px' }}>#</th>
                    <th style={{ ...thStyle, textAlign: 'left', minWidth: '130px' }}>Equipo</th>
                    <th style={thStyle} title="Partidos Jugados">PJ</th>
                    <th style={thStyle} title="Partidos Ganados">PG</th>
                    <th style={thStyle} title="Partidos Empatados">PE</th>
                    <th style={thStyle} title="Partidos Perdidos">PP</th>
                    <th style={thStyle} title="Goles a Favor">GF</th>
                    <th style={thStyle} title="Goles en Contra">GC</th>
                    <th style={thStyle} title="Diferencia de Gol">DG</th>
                    <th style={{ ...thStyle, color: '#FFBF00' }} title="Puntos">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s) => (
                    <tr key={s.teamId} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: s.position <= 3 ? 'rgba(255,191,0,0.05)' : 'transparent' }}>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: positionColors[s.position] || 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '11px', fontWeight: 'bold', color: s.position <= 3 ? '#000' : '#fff' }}>
                          {s.position}
                        </div>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'left', fontWeight: s.position <= 3 ? 'bold' : 'normal', color: '#fff' }}>{s.teamName}</td>
                      <td style={tdStyle}>{s.matchesPlayed}</td>
                      <td style={tdStyle}>{s.matchesWon}</td>
                      <td style={tdStyle}>{s.matchesDrawn}</td>
                      <td style={tdStyle}>{s.matchesLost}</td>
                      <td style={tdStyle}>{s.goalsFor}</td>
                      <td style={tdStyle}>{s.goalsAgainst}</td>
                      <td style={{ ...tdStyle, color: s.goalsDifference > 0 ? '#4CAF50' : s.goalsDifference < 0 ? '#ff4444' : '#fff' }}>
                        {s.goalsDifference > 0 ? `+${s.goalsDifference}` : s.goalsDifference}
                      </td>
                      <td style={{ ...tdStyle, color: '#FFBF00', fontWeight: 'bold' }}>{s.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardJugador;
