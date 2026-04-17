import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import silbato from '../../assets/silbato.png';
import tarjetaAmarilla from '../../assets/tarjetaAmarilla.png';
import tarjetaRoja from '../../assets/tarjetaRoja.png';
import { getRefereeByIdApi } from '../../api/refereeService';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegistroActa {
  id: number;
  jugador: string;
  tipo: string;
}

interface Partido {
  id: string;
  local: string;
  visitante: string;
  fecha: string;
  hora: string;
  cancha: string;
  estado: 'Pendiente' | 'Guardada';
  golesLocal: number | string;
  golesVisitante: number | string;
  registros: RegistroActa[];
}

const formatDateTime = (dt: string) => {
  try {
    const d = new Date(dt);
    const fecha = d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' });
    const hora = d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { fecha: fecha.charAt(0).toUpperCase() + fecha.slice(1), hora };
  } catch {
    return { fecha: dt, hora: '' };
  }
};

const DashboardArbitro = () => {
  const navigate = useNavigate();

  const [partidos, setPartidos] = useState<Partido[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    getRefereeByIdApi(userId)
      .then(referee => {
        const mapped: Partido[] = (referee.assignedMatches ?? []).map(m => {
          const { fecha, hora } = formatDateTime(m.dateTime);
          return {
            id: m.matchId,
            local: m.localTeamName,
            visitante: m.visitorTeamName,
            fecha,
            hora,
            cancha: m.field,
            estado: 'Pendiente' as const,
            golesLocal: 0,
            golesVisitante: 0,
            registros: [{ id: Date.now(), jugador: '', tipo: 'Gol' }],
          };
        });
        setPartidos(mapped);
      })
      .catch(() => setPartidos([]));
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [partidoEditando, setPartidoEditando] = useState<Partido | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const card: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.13)',
    padding: '14px 18px',
  };

  const abrirActa = (partido: Partido) => {
    setPartidoEditando({ ...partido });
    setIsReadOnly(partido.estado === 'Guardada');
    setShowModal(true);
  };

  const agregarFila = () => {
    if (!partidoEditando) return;
    setPartidoEditando({
      ...partidoEditando,
      registros: [...partidoEditando.registros, { id: Date.now(), jugador: '', tipo: 'Gol' }]
    });
  };

  const guardarActa = () => {
    if (!partidoEditando) return;
    const nuevosPartidos = partidos.map(p =>
      p.id === partidoEditando.id ? { ...partidoEditando, estado: 'Guardada' as const } : p
    );
    setPartidos(nuevosPartidos);
    setShowModal(false);
  };

  const handleScoreChange = (field: 'golesLocal' | 'golesVisitante', value: string) => {
    if (!partidoEditando) return;
    const val = value === '' ? '' : parseInt(value);
    setPartidoEditando({ ...partidoEditando, [field]: val });
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', fontFamily: "'Montserrat', sans-serif" }}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>Panel del Árbitro</h1>
          <span style={{ backgroundColor: '#FFBF00', color: '#000', fontSize: '10px', fontWeight: 700, padding: '3px 12px', borderRadius: '20px' }}>Jornada 5 · Activa</span>
        </div>

        {/* ── Fila: Estadísticas + Perfil ────────────────────────────── */}
        <div className="dash-top-row" style={{ gap: '12px' }}>
          <div style={{ ...card, flex: 1 }}>
            <div style={{ backgroundColor: '#FFBF00', borderRadius: '8px', padding: '7px 0', textAlign: 'center', fontWeight: 800, fontSize: '13px', color: '#000', marginBottom: '12px' }}>Tus Estadísticas</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[ { img: silbato, val: partidos.length, lab: 'Partidos Asignados' }, { img: tarjetaAmarilla, val: 0, lab: 'Tarjetas Amarillas' }, { img: tarjetaRoja, val: 0, lab: 'Tarjetas Rojas' } ].map((stat, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px 8px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={stat.img} style={{ width: '36px', height: '36px', objectFit: 'contain' }} alt="" />
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.val}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>{stat.lab}</span>
                  {stat.sub && <span style={{ fontSize: '9px', color: '#FFBF00', fontWeight: 600 }}>({stat.sub})</span>}
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...card, width: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '14px 12px' }}>
            <div style={{ backgroundColor: '#FFBF00', borderRadius: '8px', padding: '7px 0', textAlign: 'center', fontWeight: 800, fontSize: '13px', color: '#000', width: '100%', cursor: 'pointer' }} onClick={() => navigate('/perfil')}>Perfil</div>
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="35" r="24" fill="#555" /><ellipse cx="50" cy="82" rx="34" ry="22" fill="#555" /></svg>
          </div>
        </div>

        {/* ── Stats rápidas ──────────────────────────────────────────── */}
        <div style={{ ...card, display: 'flex', padding: '12px 24px' }}>
          <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ display: 'block', fontSize: '22px', fontWeight: 800, color: '#FFBF00' }}>{partidos.length}</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Partidos asignados</span>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '22px', fontWeight: 800, color: '#FFBF00' }}>
              {partidos[0]?.hora ?? '—'}
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Próximo partido</span>
          </div>
        </div>

        {/* ── Agenda de Encuentros Asignados ─────────────────────────── */}
        <div style={{ ...card, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Agenda de Encuentros Asignados</p>
          <div className="scroll-x" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 120px 100px 140px', padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '4px', minWidth: '480px' }}>
            {['Equipos Participantes', 'Fecha / Hora', 'Ubicación', 'Acción'].map(col => (
              <span key={col} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{col}</span>
            ))}
          </div>
          <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '480px' }}>
            {partidos.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '13px', textAlign: 'center', padding: '24px 0' }}>
                No tienes partidos asignados
              </p>
            )}
            {partidos.map((partido, i) => (
              <div key={partido.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 120px 100px 140px', padding: '14px 12px', alignItems: 'center', backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>{partido.local} <span style={{ color: '#FFBF00', fontWeight: 700 }}>vs</span> {partido.visitante}</span>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>{partido.fecha}</span>
                  <span style={{ display: 'block', fontSize: '13px', color: '#fff', fontWeight: 600 }}>{partido.hora}</span>
                </div>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{partido.cancha}</span>
                <button
                  onClick={() => abrirActa(partido)}
                  style={{ backgroundColor: partido.estado === 'Guardada' ? '#2ecc71' : '#FFBF00', color: '#000', border: 'none', borderRadius: '20px', padding: '7px 16px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {partido.estado === 'Guardada' ? 'Acta Guardada' : 'Iniciar Acta'}
                </button>
              </div>
            ))}
          </div>
          </div>{/* scroll-x */}
        </div>

        {/* ── MODAL: Acta Digital ────────────────────────────────────── */}
        {showModal && partidoEditando && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ backgroundColor: '#0a1a0f', borderRadius: '16px', width: '100%', maxWidth: '480px', border: '1px solid #FFBF00', overflow: 'hidden' }}>

              <div style={{ backgroundColor: '#FFBF00', padding: '15px', color: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '14px' }}>ACTA DIGITAL {isReadOnly ? '(VISTA)' : ''}</span>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  {isReadOnly && (
                    <button onClick={() => setIsReadOnly(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </button>
                  )}
                  <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
                </div>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Marcador */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', backgroundColor: 'rgba(255,191,0,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,191,0,0.1)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '10px', color: '#FFBF00', margin: '0 0 5px 0' }}>{partidoEditando.local}</p>
                    <input
                      type="number"
                      disabled={isReadOnly}
                      value={partidoEditando.golesLocal}
                      onFocus={(e) => e.target.value === '0' && handleScoreChange('golesLocal', '')}
                      onChange={(e) => handleScoreChange('golesLocal', e.target.value)}
                      style={{ width: '50px', height: '40px', textAlign: 'center', backgroundColor: '#050f08', border: '1px solid #FFBF00', color: '#fff', fontSize: '20px', borderRadius: '8px' }}
                    />
                  </div>
                  <span style={{ fontSize: '20px', color: '#FFBF00', fontWeight: 800 }}>-</span>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '10px', color: '#FFBF00', margin: '0 0 5px 0' }}>{partidoEditando.visitante}</p>
                    <input
                      type="number"
                      disabled={isReadOnly}
                      value={partidoEditando.golesVisitante}
                      onFocus={(e) => e.target.value === '0' && handleScoreChange('golesVisitante', '')}
                      onChange={(e) => handleScoreChange('golesVisitante', e.target.value)}
                      style={{ width: '50px', height: '40px', textAlign: 'center', backgroundColor: '#050f08', border: '1px solid #FFBF00', color: '#fff', fontSize: '20px', borderRadius: '8px' }}
                    />
                  </div>
                </div>

                <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {partidoEditando.registros.map((reg, idx) => (
                    <div key={reg.id} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 40px', gap: '8px' }}>
                      <input
                        placeholder="Nombre del jugador"
                        disabled={isReadOnly}
                        value={reg.jugador}
                        onChange={(e) => {
                          const nuevos = [...partidoEditando.registros];
                          nuevos[idx].jugador = e.target.value;
                          setPartidoEditando({...partidoEditando, registros: nuevos});
                        }}
                        style={{ backgroundColor: '#050f08', border: '1px solid rgba(255,191,0,0.3)', padding: '10px', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <select
                        disabled={isReadOnly}
                        value={reg.tipo}
                        onChange={(e) => {
                          const nuevos = [...partidoEditando.registros];
                          nuevos[idx].tipo = e.target.value;
                          setPartidoEditando({...partidoEditando, registros: nuevos});
                        }}
                        style={{ backgroundColor: '#050f08', border: '1px solid rgba(255,191,0,0.3)', color: '#fff', borderRadius: '8px', fontSize: '11px', padding: '0 5px' }}
                      >
                        <option>Gol</option>
                        <option>T. Amarilla</option>
                        <option>T. Roja</option>
                      </select>
                      {!isReadOnly && idx === partidoEditando.registros.length - 1 && (
                        <button onClick={agregarFila} style={{ backgroundColor: '#FFBF00', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#000' }}>+</button>
                      )}
                    </div>
                  ))}
                </div>

                {!isReadOnly && (
                  <button onClick={guardarActa} style={{ backgroundColor: '#FFBF00', color: '#000', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', marginTop: '10px' }}>
                    {partidoEditando.estado === 'Guardada' ? 'GUARDAR CAMBIOS' : 'GUARDAR ACTA'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default DashboardArbitro;