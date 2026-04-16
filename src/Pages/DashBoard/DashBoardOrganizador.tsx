import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import { getTeamsApi, type TeamResponse } from '../../api/teamService';
import {
  getTournamentsApi,
  activateTournamentApi,
  startProgressTournamentApi,
  finishTournamentApi,
  type TournamentResponse,
} from '../../api/tournamentService';

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



const COLORS = ['#e74c3c','#27ae60','#e67e22','#8e44ad','#2980b9','#16a085','#c0392b','#1abc9c'];

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
};

const estadoColor: Record<string, string> = {
  DRAFT:       '#888',
  ACTIVE:      '#2ecc71',
  IN_PROGRESS: '#f39c12',
  COMPLETED:   '#e74c3c',
  DELETED:     '#555',
};

const estadoLabel: Record<string, string> = {
  DRAFT:       'Borrador',
  ACTIVE:      'Activo',
  IN_PROGRESS: 'En Curso',
  COMPLETED:   'Finalizado',
  DELETED:     'Eliminado',
};

// Dado el estado actual, devuelve la siguiente acción disponible
const getAccionEstado = (state: string) => {
  switch (state) {
    case 'DRAFT':       return { label: 'Activar Torneo',   desc: 'Pasa de Borrador a Activo',          next: 'ACTIVE'      };
    case 'ACTIVE':      return { label: 'Iniciar Jornada',  desc: 'Pasa de Activo a En Curso',          next: 'IN_PROGRESS' };
    case 'IN_PROGRESS': return { label: 'Finalizar Torneo', desc: 'Pasa de En Curso a Completado',      next: 'COMPLETED'   };
    default:            return null;
  }
};

const DashboardOrganizador = () => {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<TeamResponse[]>([]);
  const [torneos, setTorneos] = useState<TournamentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [accionLoading, setAccionLoading] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [torneoSeleccionado, setTorneoSeleccionado] = useState<TournamentResponse | null>(null);

  const cargarDatos = () => {
    Promise.all([getTeamsApi(), getTournamentsApi()])
      .then(([teams, tournaments]) => {
        setEquipos(teams);
        setTorneos(tournaments);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargarDatos(); }, []);

  // Torneos elegibles (no completados ni eliminados)
  const torneosElegibles = torneos.filter(
    t => t.currentState !== 'COMPLETED' && t.currentState !== 'DELETED'
  );

  const torneoActivo = torneoSeleccionado ?? (torneosElegibles.length === 1 ? torneosElegibles[0] : null);
  const accion = torneoActivo ? getAccionEstado(torneoActivo.currentState) : null;

  const handleAvanzarEstado = async () => {
    if (!torneoActivo || !accion) return;
    setAccionLoading(true);
    try {
      if (accion.next === 'ACTIVE')      await activateTournamentApi(torneoActivo.id);
      if (accion.next === 'IN_PROGRESS') await startProgressTournamentApi(torneoActivo.id);
      if (accion.next === 'COMPLETED')   await finishTournamentApi(torneoActivo.id);
      setTorneoSeleccionado(null);
      cargarDatos();
    } catch (e) {
      console.error('Error al cambiar estado del torneo', e);
    } finally {
      setAccionLoading(false);
    }
  };

  const handleClickBotonEstado = () => {
    if (accionLoading) return;
    if (torneoActivo && accion) {
      handleAvanzarEstado();
    } else if (torneosElegibles.length > 1) {
      setSelectorOpen(p => !p);
    }
  };


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
        <div style={{ ...card, position: 'relative', zIndex: 10 }}>
          <p style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
            Accesos Rápidos
          </p>
          <div style={{ display: 'flex', gap: '14px' }}>

            {/* Crear Torneo — siempre disponible */}
            {[
              { label: 'Crear Torneo', icon: <IconCrearTorneo />, onClick: () => navigate('/create-tournament') },
              { label: 'Configurar Reglas', icon: <IconConfigurarReglas />, onClick: () => navigate('/create-tournament') },
            ].map(item => (
              <div key={item.label} onClick={item.onClick}
                style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,191,0,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}>
                {item.icon}
                <span style={{ fontSize: '12px', color: '#fff', fontWeight: 500, textAlign: 'center' }}>{item.label}</span>
              </div>
            ))}

            {/* Acción de estado — dinámica, con selector si hay varios torneos */}
            {(() => {
              const color = torneoActivo ? (estadoColor[torneoActivo.currentState] ?? '#888') : '#888';
              const hayElegibles = torneosElegibles.length > 0;
              return (
                <div style={{ flex: 1, position: 'relative' }}>
                  <div
                    onClick={hayElegibles ? handleClickBotonEstado : undefined}
                    style={{
                      borderRadius: '12px', padding: '20px 10px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                      cursor: hayElegibles && !accionLoading ? 'pointer' : 'not-allowed',
                      border: `1px solid ${hayElegibles ? color : 'rgba(255,255,255,0.08)'}`,
                      backgroundColor: hayElegibles ? `${color}22` : 'rgba(255,255,255,0.04)',
                      opacity: hayElegibles ? 1 : 0.45,
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { if (hayElegibles) e.currentTarget.style.backgroundColor = `${color}44`; }}
                    onMouseLeave={e => { if (hayElegibles) e.currentTarget.style.backgroundColor = `${color}22`; }}
                  >
                    <IconIniciarJornada />
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '12px', color: hayElegibles ? color : '#fff', fontWeight: 700, display: 'block' }}>
                        {accionLoading ? 'Procesando...' : (accion?.label ?? (torneosElegibles.length > 1 ? 'Gestionar Torneo ▾' : 'Iniciar Jornada'))}
                      </span>
                      {torneoActivo && accion && (
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', display: 'block', marginTop: '3px' }}>
                          {torneoActivo.name}
                        </span>
                      )}
                      {torneosElegibles.length > 1 && !torneoSeleccionado && (
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', display: 'block', marginTop: '3px' }}>
                          {torneosElegibles.length} torneos disponibles
                        </span>
                      )}
                      {!hayElegibles && (
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', display: 'block', marginTop: '3px' }}>
                          Sin torneo activo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dropdown selector de torneo */}
                  {selectorOpen && (
                    <div style={{ position: 'absolute', top: '105%', left: 0, right: 0, backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 100, overflow: 'hidden' }}>
                      <p style={{ margin: 0, padding: '8px 12px', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        Seleccionar torneo
                      </p>
                      {torneosElegibles.map(t => {
                        const c = estadoColor[t.currentState] ?? '#888';
                        const acc = getAccionEstado(t.currentState);
                        return (
                          <div key={t.id} onClick={() => { setTorneoSeleccionado(t); setSelectorOpen(false); }}
                            style={{ padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                            <div>
                              <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#fff' }}>{t.name}</p>
                              {acc && <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{acc.label}</p>}
                            </div>
                            <span style={{ backgroundColor: c, color: '#fff', fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                              {estadoLabel[t.currentState] ?? t.currentState}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}


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
                      {estadoLabel[t.currentState] ?? t.currentState}
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
