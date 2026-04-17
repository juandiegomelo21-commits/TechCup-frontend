import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface FechaPartido {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  descripcion: string;
}

interface Sancion {
  id: number;
  tipo: string;
  consecuencia: string;
}

// ─── Iconos ──────────────────────────────────────────────────────────────────
const IconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconField = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="12" y1="5" x2="12" y2="19"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconSave = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);
const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

// ─── Estilos base ─────────────────────────────────────────────────────────────
const card: React.CSSProperties = {
  backgroundColor: 'rgba(10, 30, 15, 0.7)',
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
  border: '1px solid rgba(255,191,0,0.18)',
  padding: '22px',
  color: '#fff',
  fontFamily: "'Montserrat', sans-serif",
};

const input: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '10px 12px',
  color: '#fff',
  fontSize: '13px',
  outline: 'none',
  width: '100%',
  marginTop: '6px',
  fontFamily: "'Montserrat', sans-serif",
  boxSizing: 'border-box' as const,
};

const label: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  color: '#FFBF00',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.6px',
  display: 'block',
};

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,191,0,0.15)' }}>
    <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'rgba(255,191,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icon}
    </div>
    <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>{title}</h2>
  </div>
);

// ─── Componente Principal ─────────────────────────────────────────────────────
const ConfigurarTorneo = () => {
  const navigate = useNavigate();
  const [torneoSeleccionado, setTorneoSeleccionado] = useState('1');

  // Canchas
  const [canchas, setCanchas] = useState(['Cancha Sintética 1', 'Polideportivo Norte']);
  const [nuevaCancha, setNuevaCancha] = useState('');

  // Fechas de partidos
  const [fechasPartidos, setFechasPartidos] = useState<FechaPartido[]>([
    { id: 1, fecha: '', horaInicio: '08:00', horaFin: '20:00', descripcion: 'Jornada 1' },
  ]);
  const [nextFechaId, setNextFechaId] = useState(2);

  // Sanciones
  const [sanciones, setSanciones] = useState<Sancion[]>([
    { id: 1, tipo: 'Tarjeta Roja', consecuencia: '' },
    { id: 2, tipo: 'Acumulación de Amarillas', consecuencia: '' },
    { id: 3, tipo: 'No presentación', consecuencia: '' },
  ]);
  const [nextSancionId, setNextSancionId] = useState(4);

  const torneosVigentes = [
    { id: '1', nombre: 'Copa Universitaria 2026' },
    { id: '2', nombre: 'Torneo Inter-Facultades' },
  ];

  // ── Handlers Canchas ──
  const agregarCancha = () => {
    if (nuevaCancha.trim()) {
      setCanchas([...canchas, nuevaCancha.trim()]);
      setNuevaCancha('');
    }
  };
  const eliminarCancha = (i: number) => setCanchas(canchas.filter((_, idx) => idx !== i));

  // ── Handlers Fechas ──
  const agregarFecha = () => {
    setFechasPartidos([...fechasPartidos, { id: nextFechaId, fecha: '', horaInicio: '08:00', horaFin: '20:00', descripcion: `Jornada ${nextFechaId}` }]);
    setNextFechaId(nextFechaId + 1);
  };
  const actualizarFecha = (id: number, campo: keyof FechaPartido, valor: string) => {
    setFechasPartidos(fechasPartidos.map(f => f.id === id ? { ...f, [campo]: valor } : f));
  };
  const eliminarFecha = (id: number) => setFechasPartidos(fechasPartidos.filter(f => f.id !== id));

  // ── Handlers Sanciones ──
  const agregarSancion = () => {
    setSanciones([...sanciones, { id: nextSancionId, tipo: '', consecuencia: '' }]);
    setNextSancionId(nextSancionId + 1);
  };
  const actualizarSancion = (id: number, campo: keyof Sancion, valor: string) => {
    setSanciones(sanciones.map(s => s.id === id ? { ...s, [campo]: valor } : s));
  };
  const eliminarSancion = (id: number) => setSanciones(sanciones.filter(s => s.id !== id));

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', fontFamily: "'Montserrat', sans-serif" }}>

        {/* ── Header ───────────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#fff' }}>Configurar Torneo</h1>
            <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Define las reglas y logística de tu competencia</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '210px' }}>
            <span style={label}>Torneo activo</span>
            <select
              value={torneoSeleccionado}
              onChange={e => setTorneoSeleccionado(e.target.value)}
              style={{ ...input, border: '1px solid rgba(255,191,0,0.5)', cursor: 'pointer' }}
            >
              {torneosVigentes.map(t => (
                <option key={t.id} value={t.id} style={{ backgroundColor: '#0a1e0f' }}>{t.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', overflowY: 'auto', paddingBottom: '16px' }}>

          {/* Reglamento */}
          <div style={card}>
            <SectionHeader icon={<IconDoc />} title="Reglamento General" />
            <div style={{ marginBottom: '14px' }}>
              <label style={label}>Normas del torneo</label>
              <textarea rows={4} placeholder="Escribe aquí las normas generales del torneo..." style={{ ...input, resize: 'none' }} />
            </div>
            <div style={{ backgroundColor: 'rgba(255,191,0,0.06)', borderRadius: '8px', padding: '10px 12px', border: '1px solid rgba(255,191,0,0.1)' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>💡 El reglamento será visible para todos los participantes al publicar.</span>
            </div>
          </div>

          {/* Fechas importantes */}
          <div style={card}>
            <SectionHeader icon={<IconCalendar />} title="Fechas Importantes" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={label}>Cierre de inscripciones</label>
                <input type="date" style={input} />
              </div>
              <div>
                <label style={label}>Inicio del torneo</label>
                <input type="date" style={input} />
              </div>
              <div>
                <label style={label}>Primera jornada</label>
                <input type="date" style={input} />
              </div>
              <div>
                <label style={label}>Final estimada</label>
                <input type="date" style={input} />
              </div>
            </div>
          </div>

          {/* ── Horarios de Partidos (lista dinámica) ─────────────── */}
          <div style={card}>
            <SectionHeader icon={<IconClock />} title="Horarios de Partidos" />
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '0 0 14px' }}>
              Agrega una fila por cada jornada o fecha de partidos.
            </p>

            {/* Cabecera de columnas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 1fr 32px', gap: '6px', marginBottom: '6px' }}>
              {['Descripción', 'H. inicio', 'H. cierre', 'Fecha', ''].map((col, i) => (
                <span key={i} style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,191,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col}</span>
              ))}
            </div>

            {/* Filas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {fechasPartidos.map(fp => (
                <div key={fp.id} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 1fr 32px', gap: '6px', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '8px' }}>
                  <input
                    value={fp.descripcion}
                    onChange={e => actualizarFecha(fp.id, 'descripcion', e.target.value)}
                    placeholder="Ej: Jornada 1"
                    style={{ ...input, marginTop: 0, fontSize: '12px', padding: '7px 10px' }}
                  />
                  <input
                    type="time"
                    value={fp.horaInicio}
                    onChange={e => actualizarFecha(fp.id, 'horaInicio', e.target.value)}
                    style={{ ...input, marginTop: 0, fontSize: '12px', padding: '7px 6px' }}
                  />
                  <input
                    type="time"
                    value={fp.horaFin}
                    onChange={e => actualizarFecha(fp.id, 'horaFin', e.target.value)}
                    style={{ ...input, marginTop: 0, fontSize: '12px', padding: '7px 6px' }}
                  />
                  <input
                    type="date"
                    value={fp.fecha}
                    onChange={e => actualizarFecha(fp.id, 'fecha', e.target.value)}
                    style={{ ...input, marginTop: 0, fontSize: '12px', padding: '7px 8px' }}
                  />
                  <button
                    onClick={() => eliminarFecha(fp.id)}
                    disabled={fechasPartidos.length === 1}
                    style={{ background: 'rgba(255,60,60,0.15)', border: '1px solid rgba(255,60,60,0.25)', borderRadius: '7px', width: '32px', height: '32px', cursor: fechasPartidos.length === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,100,100,0.8)', opacity: fechasPartidos.length === 1 ? 0.3 : 1, flexShrink: 0 }}
                  >
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={agregarFecha}
              style={{ width: '100%', backgroundColor: 'rgba(255,191,0,0.1)', border: '1px dashed rgba(255,191,0,0.4)', borderRadius: '8px', padding: '9px', color: '#FFBF00', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}
            >
              + Agregar jornada
            </button>
          </div>

          {/* Canchas */}
          <div style={card}>
            <SectionHeader icon={<IconField />} title="Canchas y Sedes" />
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '0 0 12px' }}>Agrega las canchas disponibles para este torneo.</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input
                value={nuevaCancha}
                onChange={e => setNuevaCancha(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && agregarCancha()}
                placeholder="Nombre de la cancha..."
                style={{ ...input, marginTop: 0 }}
              />
              <button
                onClick={agregarCancha}
                style={{ backgroundColor: '#FFBF00', border: 'none', borderRadius: '8px', minWidth: '40px', cursor: 'pointer', fontWeight: 900, fontSize: '18px', flexShrink: 0 }}
              >+</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {canchas.map((c, i) => (
                <span key={i} style={{ fontSize: '11px', backgroundColor: 'rgba(255,191,0,0.1)', color: '#FFBF00', padding: '5px 10px', borderRadius: '20px', border: '1px solid rgba(255,191,0,0.25)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  {c}
                  <span onClick={() => eliminarCancha(i)} style={{ cursor: 'pointer', opacity: 0.6, fontSize: '12px', lineHeight: 1 }}>✕</span>
                </span>
              ))}
            </div>
          </div>

          {/* ── Sanciones (lista dinámica) ────────────────────────── */}
          <div style={{ ...card, gridColumn: '1 / -1' }}>
            <SectionHeader icon={<IconShield />} title="Sanciones y Consecuencias" />
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '0 0 14px' }}>
              Define qué ocurre ante cada infracción. Las consecuencias pueden ser deportivas (fechas de suspensión, descuento de puntos) o de cualquier otra naturaleza que el reglamento establezca.
            </p>

            {/* Cabecera */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 32px', gap: '10px', marginBottom: '8px', padding: '0 8px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,191,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tipo de infracción</span>
              <span style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,191,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Consecuencia</span>
              <span />
            </div>

            {/* Filas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {sanciones.map(s => (
                <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 32px', gap: '10px', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px' }}>
                  <input
                    value={s.tipo}
                    onChange={e => actualizarSancion(s.id, 'tipo', e.target.value)}
                    placeholder="Ej: Tarjeta Roja"
                    style={{ ...input, marginTop: 0, fontSize: '12px', padding: '8px 10px' }}
                  />
                  <input
                    value={s.consecuencia}
                    onChange={e => actualizarSancion(s.id, 'consecuencia', e.target.value)}
                    placeholder="Ej: 1 fecha de suspensión · No juega siguiente partido · -3 puntos al equipo"
                    style={{ ...input, marginTop: 0, fontSize: '12px', padding: '8px 10px' }}
                  />
                  <button
                    onClick={() => eliminarSancion(s.id)}
                    disabled={sanciones.length === 1}
                    style={{ background: 'rgba(255,60,60,0.15)', border: '1px solid rgba(255,60,60,0.25)', borderRadius: '7px', width: '32px', height: '32px', cursor: sanciones.length === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,100,100,0.8)', opacity: sanciones.length === 1 ? 0.3 : 1, flexShrink: 0 }}
                  >
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={agregarSancion}
              style={{ backgroundColor: 'rgba(255,191,0,0.1)', border: '1px dashed rgba(255,191,0,0.4)', borderRadius: '8px', padding: '9px 20px', color: '#FFBF00', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}
            >
              + Agregar sanción
            </button>
          </div>

          {/* Publicar */}
          <div style={{ ...card, gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', border: '1px dashed rgba(255,191,0,0.4)', backgroundColor: 'rgba(255,191,0,0.04)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(255,191,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconSave />
              </div>
              <div>
                <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: '14px', color: '#fff' }}>¿Todo listo?</p>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                  Al publicar, los capitanes de cada equipo recibirán una notificación con la configuración completa del torneo.
                </p>
              </div>
            </div>
            <button
              onClick={() => alert('Configuración publicada')}
              style={{ backgroundColor: '#FFBF00', color: '#000', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.5px', whiteSpace: 'nowrap' }}
            >
              PUBLICAR CONFIGURACIÓN
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConfigurarTorneo;