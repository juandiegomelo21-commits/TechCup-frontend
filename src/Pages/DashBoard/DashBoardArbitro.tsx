import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import silbato from '../../assets/silbato.png';
import tarjetaAmarilla from '../../assets/tarjetaAmarilla.png';
import tarjetaRoja from '../../assets/tarjetaRoja.png';
import { getRefereeByIdApi, type AssignedMatch } from '../../api/refereeService';

const DashboardArbitro = () => {
  const navigate = useNavigate();
  const [partidos, setPartidos] = useState<AssignedMatch[]>([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId') ?? '';
    if (!userId) { setLoading(false); return; }
    getRefereeByIdApi(userId)
      .then(ref => {
        setNombre(ref.fullname);
        setPartidos(ref.assignedMatches ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hoy = new Date().toDateString();
  const partidosHoy = partidos.filter(p => new Date(p.dateTime).toDateString() === hoy);
  const proximoPartido = partidosHoy[0];

  const formatFecha = (dt: string) => {
    const d = new Date(dt);
    return { fecha: d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }), hora: d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) };
  };

  const card: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.13)',
    padding: '14px 18px',
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', fontFamily: "'Inter', sans-serif" }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
            {nombre ? `Hola, ${nombre.split(' ')[0]}` : 'Panel del Árbitro'}
          </h1>
          <span style={{ backgroundColor: '#FFBF00', color: '#000', fontSize: '10px', fontWeight: 700, padding: '3px 12px', borderRadius: '20px' }}>
            {partidos.length} partido{partidos.length !== 1 ? 's' : ''} asignado{partidos.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Estadísticas + Perfil */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ ...card, flex: 1 }}>
            <div style={{ backgroundColor: '#FFBF00', borderRadius: '8px', padding: '7px 0', textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '13px', color: '#000', marginBottom: '12px' }}>
              Tus Estadísticas
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { img: silbato, valor: partidos.length, label: 'Partidos Asignados', sub: null },
                { img: tarjetaAmarilla, valor: 0, label: 'Tarjetas Amarillas', sub: null },
                { img: tarjetaRoja, valor: 0, label: 'Tarjetas Rojas', sub: null },
              ].map((stat) => (
                <div key={stat.label} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px 8px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={stat.img} alt={stat.label} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#fff', fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>{stat.valor}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: '1.2' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...card, width: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '14px 12px' }}>
            <div style={{ backgroundColor: '#FFBF00', borderRadius: '8px', padding: '7px 0', textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '13px', color: '#000', width: '100%', cursor: 'pointer' }} onClick={() => navigate('/player-profile')}>
              Perfil
            </div>
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="35" r="24" fill="#555" />
              <ellipse cx="50" cy="82" rx="34" ry="22" fill="#555" />
            </svg>
          </div>
        </div>

        {/* Stats rápidas */}
        <div style={{ ...card, display: 'flex', padding: '12px 24px' }}>
          <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ display: 'block', fontSize: '22px', fontWeight: 800, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif" }}>{partidosHoy.length}</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Partidos hoy</span>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '22px', fontWeight: 800, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif" }}>
              {proximoPartido ? formatFecha(proximoPartido.dateTime).hora : '—'}
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Siguiente silbatazo</span>
          </div>
        </div>

        {/* Partidos Asignados */}
        <div style={{ ...card, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
            Mis Partidos Asignados
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 100px', padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '4px' }}>
            {['Partido', 'Fecha / Hora', 'Cancha'].map(col => (
              <span key={col} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col}</span>
            ))}
          </div>

          <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px', fontSize: '13px' }}>Cargando partidos...</p>
            ) : partidos.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px', fontSize: '13px' }}>No tienes partidos asignados aún.</p>
            ) : (
              partidos.map((partido, i) => {
                const { fecha, hora } = formatFecha(partido.dateTime);
                return (
                  <div key={partido.matchId} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 100px', padding: '14px 12px', alignItems: 'center', backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>
                      {partido.localTeamName} <span style={{ color: '#FFBF00', fontWeight: 700 }}>vs</span> {partido.visitorTeamName}
                    </span>
                    <div>
                      <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>{fecha}</span>
                      <span style={{ display: 'block', fontSize: '13px', color: '#fff', fontWeight: 600 }}>{hora}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>Cancha {partido.field}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardArbitro;
