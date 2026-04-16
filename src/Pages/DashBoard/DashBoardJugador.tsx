import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import balon from '../../assets/balon.png';
import zapato from '../../assets/zapato.png';
import tarjetaAmarilla from '../../assets/tarjetaAmarilla.png';
import tarjetaRoja from '../../assets/tarjetaRoja.png';

const mockStandings = [
  { position: 1, team: 'Real Madrid FC',  played: 10, won: 8, drawn: 1, lost: 1, gf: 24, gc: 8,  gd: 16,  points: 25 },
  { position: 2, team: 'Barcelona SC',    played: 10, won: 7, drawn: 2, lost: 1, gf: 21, gc: 10, gd: 11,  points: 23 },
  { position: 3, team: 'Atlético United', played: 10, won: 6, drawn: 3, lost: 1, gf: 18, gc: 9,  gd: 9,   points: 21 },
  { position: 4, team: 'Deportivo FC',    played: 10, won: 5, drawn: 3, lost: 2, gf: 15, gc: 12, gd: 3,   points: 18 },
  { position: 5, team: 'Juventus FC',     played: 10, won: 4, drawn: 2, lost: 4, gf: 12, gc: 14, gd: -2,  points: 14 },
  { position: 6, team: 'Milan AC',        played: 10, won: 3, drawn: 3, lost: 4, gf: 10, gc: 16, gd: -6,  points: 12 },
];

const mockStats = {
  goals: 12, maxGoals: 20,
  matches: 10, maxMatches: 12,
  yellowCards: 2,
  redCards: 0,
};

const positionColors: Record<number, string> = {
  1: '#FFBF00',
  2: '#aaaaaa',
  3: '#cd7f32',
};

const thStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '11px',
  color: 'rgba(255,255,255,0.6)',
  fontWeight: 'normal',
  padding: '6px 8px',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
  color: 'rgba(255,255,255,0.85)',
  padding: '8px',
  textAlign: 'center',
};

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  max?: number;
  iconSize?: number;
}

const StatCard = ({ label, value, icon, max, iconSize = 48 }: StatCardProps) => (
  <div style={{
    backgroundColor: 'rgba(0,80,40,0.5)',
    border: '1px solid rgba(255,191,0,0.3)',
    borderRadius: '10px',
    padding: '10px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  }}>
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: '11px',
      color: 'rgba(255,255,255,0.8)',
      textAlign: 'center',
      minHeight: '28px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {label}
    </span>
    <img src={icon} alt={label} style={{ width: `${iconSize}px`, height: `${iconSize}px`, objectFit: 'contain' }} />
    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '26px', color: '#fff' }}>
      {value}
    </span>
    {max !== undefined && (
      <>
        <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', height: '4px' }}>
          <div style={{ width: `${(value / max) * 100}%`, backgroundColor: '#FFBF00', borderRadius: '4px', height: '4px' }} />
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>
          {value}/{max}
        </span>
      </>
    )}
  </div>
);

// ── Modal confirmación capitán ────────────────────────────────────────────────

interface ModalCapitanProps {
  onConfirmar: () => void;
  onCancelar: () => void;
}

const ModalCapitan = ({ onConfirmar, onCancelar }: ModalCapitanProps) => (
  <>
    {/* Overlay */}
    <div
      onClick={onCancelar}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 998,
      }}
    />

    {/* Modal */}
    <div style={{
      position: 'fixed',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999,
      backgroundColor: 'rgba(0,50,28,0.97)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,191,0,0.4)',
      borderRadius: '20px',
      padding: '32px 36px',
      width: '340px',
      boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      animation: 'fadeIn 0.2s ease',
    }}>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translate(-50%,-48%); } to { opacity:1; transform:translate(-50%,-50%); } }`}</style>

      {/* Icono */}
      <div style={{
        width: '60px', height: '60px', borderRadius: '50%',
        backgroundColor: 'rgba(255,191,0,0.15)',
        border: '2px solid rgba(255,191,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7l9 5 9-5-9-5z" stroke="#FFBF00" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M3 12l9 5 9-5" stroke="#FFBF00" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M3 17l9 5 9-5" stroke="#FFBF00" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Título */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          margin: '0 0 6px',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800, fontSize: '17px', color: '#fff',
        }}>
          ¿Estás seguro?
        </p>
        <p style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px', color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.5,
        }}>
          Al convertirte en capitán tendrás la responsabilidad de gestionar el equipo y tomar decisiones en el torneo.
        </p>
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
        <button
          onClick={onCancelar}
          style={{
            flex: 1, padding: '11px 0',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '25px', fontSize: '13px',
            cursor: 'pointer',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.7)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
        >
          No, volver
        </button>
        <button
          onClick={onConfirmar}
          style={{
            flex: 1, padding: '11px 0',
            border: 'none', borderRadius: '25px',
            fontSize: '13px', cursor: 'pointer',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            background: '#FFBF00',
            color: '#000',
            boxShadow: '0 4px 14px rgba(255,191,0,0.35)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e6ac00'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFBF00'; }}
        >
          Sí, ser capitán
        </button>
      </div>
    </div>
  </>
);

// ── Pantalla ──────────────────────────────────────────────────────────────────

const DashboardJugador = () => {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleConfirmarCapitan = () => {
    setMostrarModal(false);
    navigate('/dashboard/capitan');
  };

  return (
    <DashboardLayout>
      {/* Modal */}
      {mostrarModal && (
        <ModalCapitan
          onConfirmar={handleConfirmarCapitan}
          onCancelar={() => setMostrarModal(false)}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', overflow: 'hidden' }}>

        {/* ── Fila superior ─────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>

          {/* Estadísticas */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{
              backgroundColor: '#FFBF00', padding: '8px 16px',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#000',
            }}>
              Estadísticas del Jugador — Torneo Actual
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '10px' }}>
              <StatCard label="Goles Anotados"     value={mockStats.goals}       icon={balon}          max={mockStats.maxGoals}   iconSize={44} />
              <StatCard label="Partidos Jugados"   value={mockStats.matches}     icon={zapato}         max={mockStats.maxMatches} iconSize={50} />
              <StatCard label="Tarjetas Amarillas" value={mockStats.yellowCards} icon={tarjetaAmarilla}                            iconSize={40} />
              <StatCard label="Tarjetas Rojas"     value={mockStats.redCards}    icon={tarjetaRoja}                                iconSize={40} />
            </div>
          </div>

          {/* Perfil */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px',
            overflow: 'hidden', minWidth: '140px',
            display: 'flex', flexDirection: 'column',
          }}>
            <button
              onClick={() => navigate('/perfil')}
              style={{
                backgroundColor: '#FFBF00', border: 'none', width: '100%',
                padding: '8px 16px', fontFamily: "'Montserrat', sans-serif",
                fontWeight: 'bold', fontSize: '13px', color: '#000', cursor: 'pointer',
              }}
            >
              Perfil
            </button>

            <div style={{ padding: '12px', display: 'flex', justifyContent: 'center', flex: 1 }}>
              <svg width="70" height="80" viewBox="0 0 100 110" fill="none">
                <circle cx="50" cy="35" r="28" fill="#888"/>
                <ellipse cx="50" cy="95" rx="40" ry="22" fill="#888"/>
              </svg>
            </div>

            {/* Botón capitán */}
            <div style={{ padding: '0 10px 12px' }}>
              <button
                onClick={() => setMostrarModal(true)}
                style={{
                  backgroundColor: '#FFBF00', border: 'none',
                  borderRadius: '20px', padding: '7px 10px',
                  width: '100%',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800, fontSize: '10px', color: '#000',
                  cursor: 'pointer', letterSpacing: '0.2px',
                  lineHeight: 1.3, textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(255,191,0,0.35)',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e6ac00'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFBF00'; }}
              >
                Convertirse en Capitán
              </button>
            </div>
          </div>
        </div>

        {/* ── Tabla de Posiciones ───────────────────────────────────────── */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px',
          overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        }}>
          <div style={{
            backgroundColor: '#FFBF00', padding: '8px 16px',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#000',
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 2h12v6a6 6 0 01-12 0V2z" stroke="#000" strokeWidth="1.8"/>
              <path d="M12 14v4m-4 2h8" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Tabla de Posiciones
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  position: 'sticky', top: 0,
                  backgroundColor: 'rgba(0,40,20,0.95)',
                }}>
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
                {mockStandings.map((s) => (
                  <tr
                    key={s.position}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: s.position <= 3 ? 'rgba(255,191,0,0.05)' : 'transparent',
                    }}
                  >
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        backgroundColor: positionColors[s.position] || 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto', fontSize: '11px', fontWeight: 'bold',
                        color: s.position <= 3 ? '#000' : '#fff',
                      }}>
                        {s.position}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'left', fontWeight: s.position <= 3 ? 'bold' : 'normal', color: '#fff' }}>
                      {s.team}
                    </td>
                    <td style={tdStyle}>{s.played}</td>
                    <td style={tdStyle}>{s.won}</td>
                    <td style={tdStyle}>{s.drawn}</td>
                    <td style={tdStyle}>{s.lost}</td>
                    <td style={tdStyle}>{s.gf}</td>
                    <td style={tdStyle}>{s.gc}</td>
                    <td style={{ ...tdStyle, color: s.gd > 0 ? '#4CAF50' : s.gd < 0 ? '#ff4444' : '#fff' }}>
                      {s.gd > 0 ? `+${s.gd}` : s.gd}
                    </td>
                    <td style={{ ...tdStyle, color: '#FFBF00', fontWeight: 'bold' }}>{s.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardJugador;