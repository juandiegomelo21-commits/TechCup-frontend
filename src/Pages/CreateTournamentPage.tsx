import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';
import { createTournamentApi } from '../api/tournamentService';

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS_SHORT = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

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
  const isSelected = (d: number) => selected?.getFullYear() === year && selected?.getMonth() === month && selected?.getDate() === d;

  return (
    <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 300, backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', padding: '12px', width: '220px', border: '1px solid #e5e5e5' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <button onClick={() => setView(new Date(year, month - 1, 1))} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', color: '#666', padding: '2px 6px' }}>‹</button>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#333' }}>{MONTHS[month]} {year}</span>
        <button onClick={() => setView(new Date(year, month + 1, 1))} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', color: '#666', padding: '2px 6px' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
        {DAYS_SHORT.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '9px', color: '#aaa', fontFamily: "'Inter', sans-serif" }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
        {cells.map((d, i) => (
          <button key={i} onClick={() => { if (d) { onSelect(new Date(year, month, d)); onClose(); } }} disabled={!d}
            style={{ border: 'none', borderRadius: '50%', width: '26px', height: '26px', fontSize: '10px', cursor: d ? 'pointer' : 'default', fontFamily: "'Inter', sans-serif", backgroundColor: d && isSelected(d) ? '#F5C518' : 'transparent', color: d ? '#333' : 'transparent', fontWeight: d && isSelected(d) ? 700 : 400, margin: '0 auto', display: 'block' }}>
            {d ?? ''}
          </button>
        ))}
      </div>
    </div>
  );
};

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

  const sancionOptions = ['Tarjeta amarilla: 1 partido', 'Tarjeta roja: 2 partidos', 'Expulsión: 3 partidos', 'Falta grave: descalificación'];

  const formatDate = (d: Date | null) =>
    d ? `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}` : '';

  const toISOLocal = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T00:00:00`;
  };

  const handleConfirmar = async () => {
    if (!nombre) { setError('El nombre del torneo es obligatorio.'); return; }
    if (!startDate) { setError('La fecha de inicio es obligatoria.'); return; }
    if (!endDate) { setError('La fecha de fin es obligatoria.'); return; }
    if (!cuotaInscripcion) { setError('La cuota de inscripción es obligatoria.'); return; }
    if (!maxEquipos) { setError('El número máximo de equipos es obligatorio.'); return; }

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

  const fieldLabel: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#444', marginBottom: '6px', display: 'block' };
  const fieldBox: React.CSSProperties = { border: '1px solid #ddd', borderRadius: '8px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#fff', cursor: 'pointer', width: '100%', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#888' };
  const inputStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: '8px', padding: '9px 12px', width: '100%', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#333', outline: 'none' };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />
      <img src={campoFutbol} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22, zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,60,35,0.35)', zIndex: 2 }} />

      {/* SIDEBAR */}
      <div style={{ position: 'relative', zIndex: 10, width: '160px', minWidth: '160px', height: '100%', display: 'flex', flexDirection: 'column', padding: '18px 0' }}>
        <img src={logo} alt="TechUp Fútbol" style={{ width: '80px', margin: '0 auto 24px auto', display: 'block' }} />
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 10px' }}>
          {[
            { label: 'Panel Principal', icon: '▦', path: '/dashboard/org', active: true },
            { label: 'Equipos', icon: '👥', path: '/dashboard/org' },
            { label: 'Pagos', icon: '💳' },
            { label: 'Torneos', icon: '🏆', path: '/dashboard/org' },
          ].map((item) => (
            <button key={item.label} onClick={() => (item as any).path && navigate((item as any).path)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 10px', borderRadius: '8px', border: 'none', background: item.active ? 'rgba(255,255,255,0.18)' : 'transparent', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '11px', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[{ label: 'Cerrar Sesión', icon: '🚪', onClick: () => { localStorage.clear(); navigate('/login'); } }].map((item) => (
            <button key={item.label} onClick={item.onClick} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 10px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '11px', cursor: 'pointer', textAlign: 'left', width: '100%', opacity: 0.85 }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        onClick={() => { setSancionesOpen(false); setOpenCal(null); }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', width: '100%', maxWidth: '640px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', padding: '28px 32px', position: 'relative' }}
          onClick={e => e.stopPropagation()}>

          {/* Nombre del torneo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del torneo (ej: TechCup 2026-2)"
              style={{ ...inputStyle, textAlign: 'center', fontSize: '16px', fontWeight: 800, fontFamily: "'Inter', sans-serif", backgroundColor: '#FFFBE6', border: '2px solid #F5C518', borderRadius: '50px', padding: '10px 32px', maxWidth: '380px', color: '#1a1a1a' }} />
          </div>

          {/* Fila 1: Reglamento | Cuota | Máx. Equipos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={fieldLabel}>Reglamento (opcional)</label>
              <button onClick={() => reglamentoRef.current?.click()} style={{ ...fieldBox }}>
                <span style={{ fontSize: '13px' }}>📄</span>
                <span style={{ color: reglamento ? '#2ecc71' : '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                  {reglamento ? reglamento.name : 'Adjuntar archivo'}
                </span>
              </button>
              <input ref={reglamentoRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => setReglamento(e.target.files?.[0] ?? null)} />
            </div>
            <div>
              <label style={fieldLabel}>Cuota de inscripción ($)</label>
              <input type="number" placeholder="Ej: 50000" value={cuotaInscripcion} onChange={e => setCuotaInscripcion(e.target.value)} min={0} style={inputStyle} />
            </div>
            <div>
              <label style={fieldLabel}>Máximo de equipos</label>
              <input type="number" placeholder="4 – 32" value={maxEquipos} onChange={e => setMaxEquipos(e.target.value)} min={4} max={32} style={inputStyle} />
            </div>
          </div>

          {/* Fila 2: Cancha | Sanciones */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={fieldLabel}>Cancha principal</label>
              <select value={cancha} onChange={e => setCancha(e.target.value)} style={{ ...fieldBox, appearance: 'none', width: '100%', color: cancha ? '#333' : '#888' }}>
                <option value="">Elija una cancha</option>
                {['Cancha 1','Cancha 2','Cancha 3','Cancha 4'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={fieldLabel}>Sanciones</label>
              <div style={{ position: 'relative' }}>
                <button onClick={e => { e.stopPropagation(); setSancionesOpen(p => !p); }} style={{ ...fieldBox, justifyContent: 'space-between' }}>
                  <span style={{ color: sanciones ? '#333' : '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sanciones || 'Seleccionar sanción'}</span>
                  <span style={{ fontSize: '10px', color: '#aaa' }}>▾</span>
                </button>
                {sancionesOpen && (
                  <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 200, overflow: 'hidden' }}>
                    {sancionOptions.map(opt => (
                      <button key={opt} onClick={() => { setSanciones(opt); setSancionesOpen(false); }} style={{ width: '100%', padding: '8px 14px', border: 'none', background: sanciones === opt ? '#fffbeb' : '#fff', textAlign: 'left', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#333', cursor: 'pointer', borderBottom: '1px solid #f5f5f5' }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fila 3: Fechas */}
          <p style={{ margin: '0 0 12px 0', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#444' }}>Duración del torneo</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <label style={fieldLabel}>Fecha de inicio</label>
              <button onClick={e => { e.stopPropagation(); setOpenCal(p => p === 'start' ? null : 'start'); }} style={{ ...fieldBox }}>
                <span style={{ fontSize: '13px' }}>📅</span>
                <span style={{ color: startDate ? '#333' : '#888' }}>{startDate ? formatDate(startDate) : 'Seleccionar fecha'}</span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#aaa' }}>▾</span>
              </button>
              {openCal === 'start' && <CalendarDropdown selected={startDate} onSelect={setStartDate} onClose={() => setOpenCal(null)} />}
            </div>
            <div style={{ position: 'relative' }}>
              <label style={fieldLabel}>Fecha de fin</label>
              <button onClick={e => { e.stopPropagation(); setOpenCal(p => p === 'end' ? null : 'end'); }} style={{ ...fieldBox }}>
                <span style={{ fontSize: '13px' }}>📅</span>
                <span style={{ color: endDate ? '#333' : '#888' }}>{endDate ? formatDate(endDate) : 'Seleccionar fecha'}</span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#aaa' }}>▾</span>
              </button>
              {openCal === 'end' && <CalendarDropdown selected={endDate} onSelect={setEndDate} onClose={() => setOpenCal(null)} />}
            </div>
          </div>

          {error && <p style={{ color: '#cc0000', fontSize: '11px', fontFamily: "'Inter', sans-serif", textAlign: 'center', margin: '0 0 12px 0' }}>{error}</p>}

          {/* Botones */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button onClick={() => navigate('/dashboard/org')} style={{ padding: '10px 28px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", background: '#f0f0f0', color: '#666', fontWeight: 500 }}>
              Cancelar ✕
            </button>
            <button onClick={handleConfirmar} disabled={loading} style={{ padding: '10px 32px', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif", background: loading ? '#cca800' : '#F5C518', color: '#1a1a1a', fontWeight: 700 }}>
              {loading ? 'Creando...' : 'Confirmar →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentPage;
