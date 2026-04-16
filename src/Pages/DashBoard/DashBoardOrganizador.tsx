import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import { getTeamsApi, type TeamResponse } from '../../api/teamService';
import { getTournamentsApi, type TournamentResponse } from '../../api/tournamentService';

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

const accesos = [
  { label: 'Crear Torneo',      icon: <IconCrearTorneo />,      path: '/create-tournament' },
  { label: 'Configurar Reglas', icon: <IconConfigurarReglas />, path: '/create-tournament' },
  { label: 'Iniciar Jornada',   icon: <IconIniciarJornada />,   path: '/dashboard/org' },
  { label: 'Finalizar Torneo',  icon: <IconFinalizarTorneo />,  path: '/dashboard/org' },
];

const COLORS = ['#e74c3c','#27ae60','#e67e22','#8e44ad','#2980b9','#16a085','#c0392b','#1abc9c'];

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
};

const estadoColor: Record<string, string> = {
  ACTIVO: '#2ecc71',
  PENDIENTE: '#f39c12',
  FINALIZADO: '#e74c3c',
};

const DashboardOrganizador = () => {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<TeamResponse[]>([]);
  const [torneos, setTorneos] = useState<TournamentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTeamsApi(), getTournamentsApi()])
      .then(([teams, tournaments]) => {
        setEquipos(teams);
        setTorneos(tournaments);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', fontFamily: "'Inter', sans-serif" }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#ffffff', fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.3px' }}>
              Panel del Organizador
            </h1>
            <span style={{ backgroundColor: '#FFBF00', color: '#000', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {equipos.length} equipos
            </span>
            {torneos.length > 0 && (
              <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {torneos.length} {torneos.length === 1 ? 'torneo' : 'torneos'}
              </span>
            )}
          </div>
          <div style={{ backgroundColor: '#FFBF00', borderRadius: '10px', padding: '9px 24px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '14px', color: '#000', cursor: 'pointer' }}
            onClick={() => navigate('/player-profile')}>
            Perfil
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div style={card}>
          <p style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
            Accesos Rápidos
          </p>
          <div style={{ display: 'flex', gap: '14px' }}>
            {accesos.map((item) => (
              <div key={item.label} onClick={() => navigate(item.path)} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,191,0,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}>
                {item.icon}
                <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 500, textAlign: 'center', lineHeight: '1.3' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Torneos */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
              Torneos
            </p>
            <button onClick={() => navigate('/create-tournament')} style={{ backgroundColor: '#FFBF00', color: '#000', border: 'none', borderRadius: '20px', padding: '6px 16px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              + Nuevo
            </button>
          </div>
          {loading ? (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>Cargando...</p>
          ) : torneos.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>No hay ningún torneo creado aún.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
              {[...torneos].reverse().map((t) => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px 16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FFBF00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🏆</div>
                    <div>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>{t.name}</p>
                      <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif" }}>
                        {formatDate(t.startDate)} → {formatDate(t.endDate)}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif" }}>{t.maxTeams}</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '9px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Máx. equipos</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif" }}>${t.registrationFee.toLocaleString('es-CO')}</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '9px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cuota</p>
                    </div>
                    <span style={{ backgroundColor: estadoColor[t.currentState] ?? '#888', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {t.currentState ?? 'PENDIENTE'}
                    </span>
                    <button onClick={() => navigate(`/torneo/${t.id}`)} style={{ backgroundColor: '#FFBF00', color: '#000', border: 'none', borderRadius: '20px', padding: '6px 16px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>
                      Ver →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Equipos Inscritos */}
        <div style={{ ...card, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
            Equipos Inscritos
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: colWidths, padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {['Escudo', 'Nombre del Equipo', 'Capitán', 'Jugadores', 'Acción'].map((col) => (
              <span key={col} style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col}</span>
            ))}
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>Cargando equipos...</p>
            ) : equipos.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>No hay equipos inscritos aún.</p>
            ) : (
              equipos.map((equipo, i) => {
                const siglas = equipo.teamName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                const color = COLORS[i % COLORS.length];
                return (
                  <div key={equipo.id} style={{ display: 'grid', gridTemplateColumns: colWidths, padding: '11px 10px', alignItems: 'center', backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent', borderRadius: '8px', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,191,0,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent')}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                      {siglas}
                    </div>
                    <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>{equipo.teamName}</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{equipo.captainName || '—'}</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{equipo.players.length}</span>
                    <button onClick={() => navigate(`/equipo/${equipo.id}`)} style={{ backgroundColor: '#FFBF00', color: '#000', border: 'none', borderRadius: '20px', padding: '6px 16px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>
                      Ver Detalles
                    </button>
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

export default DashboardOrganizador;
