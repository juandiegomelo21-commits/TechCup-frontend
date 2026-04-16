import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import silbato from '../../assets/silbato.png';
import tarjetaAmarilla from '../../assets/tarjetaAmarilla.png';
import tarjetaRoja from '../../assets/tarjetaRoja.png';

type AccionPartido = 'Iniciar Acta' | 'Cargar Resultado';

interface Partido {
  id: string;
  local: string;
  visitante: string;
  fecha: string;
  hora: string;
  cancha: string;
  accion: AccionPartido;
}

const partidosMock: Partido[] = [
  { id: '1', local: 'Real Madrid FC',    visitante: 'Barcelona FC',     fecha: 'Lunes 7 Abril',  hora: '14:00', cancha: 'Cancha 1', accion: 'Iniciar Acta'     },
  { id: '2', local: 'Manchester United', visitante: 'Liverpool FC',      fecha: 'Lunes 7 Abril',  hora: '16:30', cancha: 'Cancha 2', accion: 'Cargar Resultado' },
  { id: '3', local: 'Bayern Munich',     visitante: 'Borussia Dortmund', fecha: 'Martes 8 Abril', hora: '18:00', cancha: 'Cancha 3', accion: 'Iniciar Acta'     },
];

const estadisticas = [
  { img: silbato,         valor: 28, label: 'Partidos Pitados',   sub: null         },
  { img: tarjetaAmarilla, valor: 75, label: 'Tarjetas Amarillas', sub: 'Prom. 2.6'  },
  { img: tarjetaRoja,     valor: 5,  label: 'Tarjetas Rojas',     sub: 'Prom. 0.18' },
];

const DashboardArbitro = () => {
  const navigate = useNavigate();

  const card: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.13)',
    padding: '14px 18px',
  };

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: '100%',
        fontFamily: "'Inter', sans-serif",
      }}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: 800,
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Panel del Árbitro
          </h1>
          <span style={{
            backgroundColor: '#FFBF00',
            color: '#000',
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 12px',
            borderRadius: '20px',
          }}>
            Jornada 5 · Activa
          </span>
        </div>

        {/* ── Fila: Estadísticas + Perfil ────────────────────────────── */}
        <div style={{ display: 'flex', gap: '12px' }}>

          {/* Estadísticas */}
          <div style={{ ...card, flex: 1 }}>
            <div style={{
              backgroundColor: '#FFBF00',
              borderRadius: '8px',
              padding: '7px 0',
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: '13px',
              color: '#000',
              marginBottom: '12px',
            }}>
              Tus Estadísticas
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {estadisticas.map((stat) => (
                <div key={stat.label} style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.25)',
                  borderRadius: '10px',
                  padding: '12px 8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <img src={stat.img} alt={stat.label} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#fff', fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>
                    {stat.valor}
                  </span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: '1.2' }}>
                    {stat.label}
                  </span>
                  {stat.sub && (
                    <span style={{ fontSize: '9px', color: '#FFBF00', fontWeight: 600 }}>({stat.sub})</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Perfil */}
          <div style={{
            ...card,
            width: '160px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 12px',
          }}>
            <div style={{
              backgroundColor: '#FFBF00',
              borderRadius: '8px',
              padding: '7px 0',
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: '13px',
              color: '#000',
              width: '100%',
              cursor: 'pointer',
            }} onClick={() => navigate('/perfil')}>
              Perfil
            </div>
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="35" r="24" fill="#555" />
              <ellipse cx="50" cy="82" rx="34" ry="22" fill="#555" />
            </svg>
          </div>
        </div>

        {/* ── Stats rápidas ──────────────────────────────────────────── */}
        <div style={{ ...card, display: 'flex', padding: '12px 24px' }}>
          <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ display: 'block', fontSize: '22px', fontWeight: 800, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif" }}>3</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Partidos hoy</span>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '22px', fontWeight: 800, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif" }}>14:00</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Siguiente silbatazo</span>
          </div>
        </div>

        {/* ── Partidos Asignados — ocupa el resto ────────────────────── */}
        <div style={{ ...card, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <p style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Mis Partidos Asignados
          </p>

          {/* Cabecera tabla */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 100px 140px',
            padding: '6px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '4px',
          }}>
            {['Partido', 'Fecha / Hora', 'Cancha', 'Acción'].map(col => (
              <span key={col} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {col}
              </span>
            ))}
          </div>

          {/* Filas */}
          <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {partidosMock.map((partido, i) => (
              <div
                key={partido.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 100px 140px',
                  padding: '14px 12px',
                  alignItems: 'center',
                  backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderRadius: '8px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,191,0,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent')}
              >
                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>
                  {partido.local}{' '}
                  <span style={{ color: '#FFBF00', fontWeight: 700 }}>vs</span>{' '}
                  {partido.visitante}
                </span>

                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>{partido.fecha}</span>
                  <span style={{ display: 'block', fontSize: '13px', color: '#fff', fontWeight: 600 }}>{partido.hora}</span>
                </div>

                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{partido.cancha}</span>

                <button
                  onClick={() => navigate(`/partido/${partido.id}`)}
                  style={{
                    backgroundColor: partido.accion === 'Iniciar Acta' ? '#FFBF00' : '#e67e22',
                    color: '#000',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '7px 16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: 'nowrap',
                    width: 'fit-content',
                  }}
                >
                  {partido.accion}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardArbitro;
