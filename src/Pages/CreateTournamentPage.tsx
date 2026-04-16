import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { createTournament } from '../Pages/CreateTournamentPage';

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS_SHORT = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

// ── Calendario ────────────────────────────────────────────────────────────────

interface CalendarDropdownProps {
  selected: Date | null;
  onSelect: (d: Date) => void;
  onClose: () => void;
}

const CalendarDropdown = ({ selected, onSelect, onClose }: CalendarDropdownProps) => {
  const today = new Date();
  const [view, setView] = useState<Date>(selected ?? today);
  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const isSelected = (d: number) =>
    selected?.getFullYear() === year && selected?.getMonth() === month && selected?.getDate() === d;

  return (
    <div style={{
      position: 'absolute', top: '110%', left: 0, zIndex: 300,
      backgroundColor: 'rgba(10,50,30,0.97)',
      backdropFilter: 'blur(16px)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      padding: '14px',
      width: '230px',
      border: '1px solid rgba(255,191,0,0.25)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={() => setView(new Date(year, month - 1, 1))}
          style={{ border: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#fff', padding: '2px 8px' }}>‹</button>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: 700, color: '#FFBF00' }}>
          {MONTHS[month]} {year}
        </span>
        <button onClick={() => setView(new Date(year, month + 1, 1))}
          style={{ border: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#fff', padding: '2px 8px' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '6px' }}>
        {DAYS_SHORT.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((d, i) => (
          <button key={i} onClick={() => { if (d) { onSelect(new Date(year, month, d)); onClose(); } }} disabled={!d}
            style={{
              border: 'none', borderRadius: '50%', width: '28px', height: '28px', fontSize: '10px',
              cursor: d ? 'pointer' : 'default', fontFamily: "'Inter', sans-serif",
              backgroundColor: d && isSelected(d) ? '#FFBF00' : 'transparent',
              color: d && isSelected(d) ? '#000' : d ? '#fff' : 'transparent',
              fontWeight: d && isSelected(d) ? 800 : 400,
              margin: '0 auto', display: 'block',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (d && !isSelected(d)) e.currentTarget.style.backgroundColor = 'rgba(255,191,0,0.2)'; }}
            onMouseLeave={e => { if (d && !isSelected(d)) e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            {d ?? ''}
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Pantalla ──────────────────────────────────────────────────────────────────

const CreateTournamentPage = () => {
  const navigate = useNavigate();
  const reglamentoRef = useRef<HTMLInputElement>(null);

  const [nombre, setNombre] = useState('');
  const [reglamento, setReglamento] = useState<File | null>(null);
  const [cancha, setCancha] = useState('');
  const [sanciones, setSanciones] = useState('');
  const [sancionesOpen, setSancionesOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openCal, setOpenCal] = useState<'start' | 'end' | null>(null);
  const [cuotaInscripcion, setCuotaInscripcion] = useState('');
  const [maxEquipos, setMaxEquipos] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sancionOptions = [
    'Tarjeta amarilla: 1 partido suspendido',
    'Tarjeta roja directa: 2 partidos suspendido',
    'Doble amarilla: 1 partido suspendido',
    'Expulsión por conducta: 3 partidos suspendido',
    'Falta grave: descalificación del torneo',
    'Acumulación 3 amarillas: 1 partido suspendido',
  ];

  const formatDate = (d: Date | null) =>
    d ? `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}` : '';

  const toISOLocal = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T00:00:00`;
  };

  const handleConfirmar = async () => {
    if (!nombre)          { setError('El nombre del torneo es obligatorio.');        return; }
    if (!startDate)       { setError('La fecha de inicio es obligatoria.');          return; }
    if (!endDate)         { setError('La fecha de fin es obligatoria.');             return; }
    if (!cuotaInscripcion){ setError('La cuota de inscripción es obligatoria.');     return; }
    if (!maxEquipos)      { setError('El número máximo de equipos es obligatorio.'); return; }

    setLoading(true);
    setError(null);
    try {
      await createTournamentApi({
        name: nombre,
        startDate: toISOLocal(startDate),
        endDate: toISOLocal(endDate),
        registrationFee: parseFloat(cuotaInscripcion),
        maxTeams: parseInt(maxEquipos),
        rules: reglamento?.name || sanciones || 'Sin reglamento especificado',
      });
      navigate('/dashboard/org');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al crear el torneo. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const card: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.09)',
    backdropFilter: 'blur(12px)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.13)',
    padding: '20px 24px',
  };

  const fieldLabel: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '6px',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const fieldBox: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    boxSizing: 'border-box' as const,
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '10px 14px',
    width: '100%',
    boxSizing: 'border-box' as const,
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    color: '#fff',
    outline: 'none',
  };

  return (
    <DashboardLayout>
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px', fontFamily: "'Inter', sans-serif" }}
        onClick={() => { setSancionesOpen(false); setOpenCal(null); }}
      >

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
              Crear Torneo
            </h1>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              Configura los detalles del nuevo torneo
            </p>
          </div>
          <span style={{
            backgroundColor: '#FFBF00', color: '#000',
            fontSize: '11px', fontWeight: 700,
            padding: '4px 14px', borderRadius: '20px',
            letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            Nuevo torneo
          </span>
        </div>

        {/* ── Formulario ──────────────────────────────────────────────────── */}
        <div
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}
          onClick={e => e.stopPropagation()}
        >

          {/* Nombre */}
          <div style={card}>
            <label style={{ ...fieldLabel, marginBottom: '10px' }}>Nombre del torneo</label>
            <input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej: TechCup 2026-2"
              style={{
                ...inputStyle,
                fontSize: '16px',
                fontWeight: 700,
                padding: '12px 18px',
                borderRadius: '25px',
                border: '2px solid rgba(255,191,0,0.4)',
                backgroundColor: 'rgba(255,191,0,0.08)',
                color: '#FFBF00',
              }}
            />
          </div>

          {/* Fila 1: Reglamento | Cuota | Máx equipos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div style={card}>
              <label style={fieldLabel}>Reglamento (opcional)</label>
              <button onClick={() => reglamentoRef.current?.click()} style={{ ...fieldBox }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
                  <path d="M14 2v6h6M12 18v-6M9 15h6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span style={{ color: reglamento ? '#FFBF00' : 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {reglamento ? reglamento.name : 'Adjuntar archivo'}
                </span>
              </button>
              <input ref={reglamentoRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => setReglamento(e.target.files?.[0] ?? null)} />
            </div>

            <div style={card}>
              <label style={fieldLabel}>Cuota de inscripción ($)</label>
              <input
                type="number" placeholder="Ej: 50000"
                value={cuotaInscripcion} onChange={e => setCuotaInscripcion(e.target.value)} min={0}
                style={inputStyle}
              />
            </div>

            <div style={card}>
              <label style={fieldLabel}>Máximo de equipos</label>
              <input
                type="number" placeholder="4 – 32"
                value={maxEquipos} onChange={e => setMaxEquipos(e.target.value)} min={4} max={32}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Fila 2: Cancha | Sanciones */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={card}>
              <label style={fieldLabel}>Cancha principal</label>
              <select value={cancha} onChange={e => setCancha(e.target.value)}
                style={{ ...fieldBox, appearance: 'none' as const, color: cancha ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                <option value="" style={{ backgroundColor: '#0a3020' }}>Elegir cancha</option>
                {['Cancha 1','Cancha 2','Cancha 3','Cancha 4'].map(c => (
                  <option key={c} value={c} style={{ backgroundColor: '#0a3020' }}>{c}</option>
                ))}
              </select>
            </div>

            <div style={{ ...card, overflow: 'visible', position: 'relative', zIndex: 100 }}>
              <label style={fieldLabel}>Sanciones</label>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={e => { e.stopPropagation(); setSancionesOpen(p => !p); }}
                  style={{ ...fieldBox, justifyContent: 'space-between' }}
                >
                  <span style={{
                    color: sanciones ? '#fff' : 'rgba(255,255,255,0.4)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {sanciones || 'Seleccionar sanción'}
                  </span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>▾</span>
                </button>

                {sancionesOpen && (
                  <div style={{
                    position: 'absolute', top: '110%', left: 0, right: 0,
                    backgroundColor: 'rgba(10,50,30,0.97)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,191,0,0.3)',
                    borderRadius: '10px',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
                    zIndex: 200, overflow: 'hidden',
                  }}>
                    {sancionOptions.map((opt, i) => (
                      <button
                        key={opt}
                        onClick={() => { setSanciones(opt); setSancionesOpen(false); }}
                        style={{
                          width: '100%', padding: '11px 16px', border: 'none',
                          background: sanciones === opt ? 'rgba(255,191,0,0.18)' : 'rgba(255,255,255,0.04)',
                          textAlign: 'left', fontFamily: "'Inter', sans-serif", fontSize: '12px',
                          color: sanciones === opt ? '#FFBF00' : 'rgba(255,255,255,0.85)',
                          cursor: 'pointer',
                          borderBottom: i < sancionOptions.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                          fontWeight: sanciones === opt ? 700 : 400,
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (sanciones !== opt) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                        onMouseLeave={e => { if (sanciones !== opt) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fila 3: Fechas */}
          <div style={card}>
            <label style={{ ...fieldLabel, marginBottom: '12px' }}>Duración del torneo</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

              <div style={{ position: 'relative' }}>
                <label style={fieldLabel}>Fecha de inicio</label>
                <button onClick={e => { e.stopPropagation(); setOpenCal(p => p === 'start' ? null : 'start'); }}
                  style={{ ...fieldBox }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
                    <path d="M3 9h18M8 2v4M16 2v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: startDate ? '#FFBF00' : 'rgba(255,255,255,0.4)' }}>
                    {startDate ? formatDate(startDate) : 'Seleccionar fecha'}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>▾</span>
                </button>
                {openCal === 'start' && <CalendarDropdown selected={startDate} onSelect={setStartDate} onClose={() => setOpenCal(null)} />}
              </div>

              <div style={{ position: 'relative' }}>
                <label style={fieldLabel}>Fecha de fin</label>
                <button onClick={e => { e.stopPropagation(); setOpenCal(p => p === 'end' ? null : 'end'); }}
                  style={{ ...fieldBox }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
                    <path d="M3 9h18M8 2v4M16 2v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: endDate ? '#FFBF00' : 'rgba(255,255,255,0.4)' }}>
                    {endDate ? formatDate(endDate) : 'Seleccionar fecha'}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>▾</span>
                </button>
                {openCal === 'end' && <CalendarDropdown selected={endDate} onSelect={setEndDate} onClose={() => setOpenCal(null)} />}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(204,0,0,0.15)',
              border: '1px solid rgba(204,0,0,0.4)',
              borderRadius: '10px', padding: '10px 16px',
              color: '#ff6b6b', fontSize: '12px',
              fontFamily: "'Inter', sans-serif", textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          {/* Botones */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', paddingBottom: '8px' }}>
            <button onClick={() => navigate('/dashboard/org')} style={{
              padding: '12px 32px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '25px', fontSize: '13px', cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)', fontWeight: 600,
              transition: 'all 0.2s',
            }}>
              Cancelar
            </button>
            <button onClick={handleConfirmar} disabled={loading} style={{
              padding: '12px 40px', border: 'none', borderRadius: '25px',
              fontSize: '13px', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              background: loading ? 'rgba(255,191,0,0.5)' : '#FFBF00',
              color: '#000', fontWeight: 800,
              transition: 'all 0.2s',
            }}>
              {loading ? 'Creando...' : 'Confirmar'}
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTournamentPage;