import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';

// ─── Tipos ─────────────────────────────────────────────────────────────────────
interface Team {
  flag: string;
  name: string;
}

interface Match {
  date: string;
  team1: Team;
  team2: Team;
}

interface GroupTeam {
  pos: string;
  flag: string;
  name: string;
  pts: number;
}

// ─── Datos (Prueba) ─────────────────────────────────────────────────────────────
const round16Matches: Match[][] = [
  [
    { date: 'Domingo 30 Jun', team1: { flag: '🇪🇸', name: 'SPAIN' }, team2: { flag: '🇬🇪', name: 'GEORGIA' } },
    { date: 'Sábado 29 Jun', team1: { flag: '🇩🇪', name: 'GERMANY' }, team2: { flag: '🇩🇰', name: 'DENMARK' } },
  ],
  [
    { date: 'Lunes 1 Jul', team1: { flag: '🇫🇷', name: 'FRANCE' }, team2: { flag: '🇧🇪', name: 'BELGIUM' } },
    { date: 'Lunes 1 Jul', team1: { flag: '🇵🇹', name: 'PORTUGAL' }, team2: { flag: '🇸🇮', name: 'SLOVENIA' } },
  ],
];

const groupA: GroupTeam[] = [
  { pos: '1', flag: '🇩🇪', name: 'Real Madrid FC', pts: 25 },
  { pos: '2', flag: '🇨🇭', name: 'Barcelona SC', pts: 23 },
  { pos: '3', flag: '🇭🇺', name: 'Atlético United', pts: 21 },
  { pos: '4', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', name: 'Deportivo FC', pts: 18 },
];

// ─── Estilos Comunes (Montserrat) ──────────────────────────────────────────────
const TEXT_BASE = {
  fontFamily: "'Montserrat', sans-serif",
  color: '#ffffff',
};

// ─── Sub-componentes visuales ──────────────────────────────────────────────────
const MatchCard = ({ match }: { match: Match }) => (
  <div style={{ marginBottom: '6px' }}>
    <div style={{ ...TEXT_BASE, fontSize: '9px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
      {match.date}
    </div>
    {[match.team1, match.team2].map((team, i) => (
      <div
        key={i}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '8px',
          padding: '8px 12px',
          width: '200px',
          marginBottom: i === 0 ? '4px' : '0',
        }}
      >
        <span style={{ fontSize: '18px' }}>{team.flag}</span>
        <span style={{ ...TEXT_BASE, fontSize: '12px', flex: 1, fontWeight: 600 }}>{team.name}</span>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '4px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', ...TEXT_BASE, fontSize: '11px' }}>—</div>
      </div>
    ))}
  </div>
);

const TbcCard = ({ date }: { date?: string }) => (
  <div style={{ marginBottom: '6px' }}>
    <div style={{ ...TEXT_BASE, fontSize: '9px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>{date || 'TBC'}</div>
    {[1, 2].map((_, i) => (
      <div key={i} style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '8px 12px',
        width: '200px',
        marginBottom: i === 0 ? '4px' : '0',
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
        <span style={{ ...TEXT_BASE, color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 500 }}>TBC</span>
      </div>
    ))}
  </div>
);

// ─── Estilo de Botón Ovalado Amarillo (Réplica de la imagen) ───────────────────
const OVAL_BUTTON_STYLE: React.CSSProperties = {
  background: '#FFBF00', // El amarillo dorado
  borderRadius: '24px', // Ovalado
  border: 'none',
  padding: '12px 24px',
  cursor: 'pointer',
  ...TEXT_BASE,
  color: '#1a1a1a', // Texto oscuro para contraste
  fontWeight: 700,
  fontSize: '12px',
  textTransform: 'uppercase', // Mayúsculas
  letterSpacing: '1px',
  transition: 'transform 0.1s, opacity 0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// ─── Componente Principal ──────────────────────────────────────────────────────
const Torneo = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        fontFamily: "'Montserrat', sans-serif", // Aplicar a todo el contenedor
      }}>

        {/* Árbol de Torneo (Escalado más grande) */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '28px',
          display: 'flex',
          gap: '15px',
          alignItems: 'flex-start',
          flex: 1,
          overflowX: 'auto',
          backdropFilter: 'blur(4px)',
        }}>

          {/* Round of 16 */}
          <div>
            <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '12px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>ROUND OF 16</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {round16Matches.map((group, gi) => (
                <div key={gi} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {group.map((match, mi) => <MatchCard key={mi} match={match} />)}
                </div>
              ))}
            </div>
          </div>

          {/* Conectores Visuales */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', paddingTop: '50px' }}>
             <div style={{ height: '160px', border: '2px solid rgba(255,255,255,0.15)', borderLeft: 0, width: '24px', marginBottom: '90px' }} />
             <div style={{ height: '160px', border: '2px solid rgba(255,255,255,0.15)', borderLeft: 0, width: '24px' }} />
          </div>

          {/* Quarter-Finals */}
          <div style={{ paddingTop: '60px' }}>
            <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '12px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>QUARTER-FINALS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
              <TbcCard date="Viernes 5 Jul" />
              <TbcCard date="Viernes 5 Jul" />
            </div>
          </div>

          {/* Semi-Finals */}
          <div style={{ paddingTop: '160px', marginLeft: '30px' }}>
            <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '12px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>SEMI-FINALS</h4>
            <TbcCard date="Martes 9 Jul" />
          </div>

          {/* Tabla de Grupo (Réplica estética de la imagen 5) */}
          <div style={{ marginLeft: 'auto', minWidth: '220px' }}>
            <div style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '18px',
            }}>
              <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '14px', fontWeight: 700, textAlign: 'center', marginBottom: '16px', textTransform: 'uppercase' }}>TABLA DE POSICIONES A</h4>
              {groupA.map((team, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 0', borderBottom: i < groupA.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none'
                }}>
                  <span style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '11px', fontWeight: 600, width: '22px', textAlign: 'center' }}>{team.pos}</span>
                  <span style={{ ...TEXT_BASE, fontSize: '12px', flex: 1, fontWeight: 500 }}>{team.name}</span>
                  <span style={{ ...TEXT_BASE, color: '#FFBF00', fontWeight: 800, fontSize: '12px' }}>{team.pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botones de Acción (Rediseñados para parecerse a la imagen) */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', paddingBottom: '10px' }}>
          <button
            onClick={() => navigate('/nuevo-torneo')}
            style={OVAL_BUTTON_STYLE}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Inscribir Nuevo Torneo
          </button>

          <button
            onClick={() => navigate('/historial')}
            style={OVAL_BUTTON_STYLE}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Ver Historial
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Torneo;