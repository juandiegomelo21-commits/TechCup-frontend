import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';

// ── Mini Calendario ────────────────────────────────────────────────────────
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

  const isSelected = (d: number) =>
    selected?.getFullYear() === year && selected?.getMonth() === month && selected?.getDate() === d;

  return (
    <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 300, backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', padding: '12px', width: '220px', border: '1px solid #e5e5e5' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <button onClick={() => setView(new Date(year, month - 1, 1))} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', color: '#666', padding: '2px 6px' }}>‹</button>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#333' }}>{MONTHS[month]} {year}</span>
        <button onClick={() => setView(new Date(year, month + 1, 1))} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', color: '#666', padding: '2px 6px' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
        {DAYS_SHORT.map((d) => <div key={d} style={{ textAlign: 'center', fontSize: '9px', color: '#aaa', fontFamily: "'Inter', sans-serif" }}>{d}</div>)}
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

// ── Componente Principal ───────────────────────────────────────────────────
const CreateTournamentPage = () => {
  const navigate = useNavigate();
  const reglamentoRef = useRef<HTMLInputElement>(null);

  const [reglamento, setReglamento] = useState<File | null>(null);
  const [cancha, setCancha] = useState<string>('');
  const [sanciones, setSanciones] = useState<string>('');
  const [sancionesOpen, setSancionesOpen] = useState(false);
  const [duracion, setDuracion] = useState<Date | null>(null);
  const [fechasImportantes, setFechasImportantes] = useState<Date | null>(null);
  const [openCal, setOpenCal] = useState<'duracion' | 'fechas' | null>(null);

  const sancionOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  const formatDate = (d: Date | null) =>
    d ? `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}` : '';

  const fieldLabel: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600,
    color: '#444', marginBottom: '6px', display: 'block',
  };

  const fieldBox: React.CSSProperties = {
    border: '1px solid #ddd', borderRadius: '8px', padding: '9px 12px',
    display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#fff',
    cursor: 'pointer', width: '100%', boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#888',
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex' }}>
      {/* Fondo */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />
      <img src={campoFutbol} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22, zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,60,35,0.35)', zIndex: 2 }} />

      {/* SIDEBAR */}
      <div style={{ position: 'relative', zIndex: 10, width: '160px', minWidth: '160px', height: '100%', display: 'flex', flexDirection: 'column', padding: '18px 0' }}>
        <img src={logo} alt="TechUp Fútbol" style={{ width: '80px', margin: '0 auto 24px auto', display: 'block' }} />
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 10px' }}>
          {[
            { label: 'Panel Principal', icon: '▦', active: true },
            { label: 'Portfolio', icon: '📂' },
            { label: 'Pagos', icon: '💳' },
            { label: 'Mercado', icon: '🛒' },
            { label: 'Historial', icon: '📋' },
          ].map((item) => (
            <button key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 10px', borderRadius: '8px', border: 'none', background: item.active ? 'rgba(255,255,255,0.18)' : 'transparent', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '11px', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[{ label: 'Preguntas Frecuentes', icon: '❓' }, { label: 'Aprender', icon: '📖' }, { label: 'Cerrar Sesión', icon: '🚪' }].map((item) => (
            <button key={item.label} onClick={item.label === 'Cerrar Sesión' ? () => navigate('/login') : undefined} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 10px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '11px', cursor: 'pointer', textAlign: 'left', width: '100%', opacity: 0.85 }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL CARD centrado */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        onClick={() => { setSancionesOpen(false); setOpenCal(null); }}
      >
        <div
          style={{ backgroundColor: '#fff', borderRadius: '16px', width: '100%', maxWidth: '620px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', padding: '28px 32px', position: 'relative' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Título amarillo pill */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <div style={{ backgroundColor: '#F5C518', borderRadius: '50px', padding: '10px 32px', display: 'inline-block' }}>
              <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 800, color: '#1a1a1a', letterSpacing: '0.01em' }}>
                TechCup 2026-2
              </p>
            </div>
          </div>

          {/* Fila 1: Reglamento | Seleccionar Cancha | Establecer Sanciones */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>

            {/* Reglamento */}
            <div>
              <label style={fieldLabel}>Reglamento personalizado</label>
              <button onClick={() => reglamentoRef.current?.click()} style={{ ...fieldBox }}>
                <span style={{ fontSize: '13px' }}>📄</span>
                <span style={{ color: reglamento ? '#2ecc71' : '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                  {reglamento ? reglamento.name : 'Adjuntar reglamento'}
                </span>
              </button>
              <input ref={reglamentoRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => setReglamento(e.target.files?.[0] ?? null)} />
            </div>

            {/* Cancha */}
            <div>
              <label style={fieldLabel}>Seleccionar Cancha</label>
              <div style={{ position: 'relative' }}>
                <select
                  value={cancha}
                  onChange={(e) => setCancha(e.target.value)}
                  style={{ ...fieldBox, appearance: 'none' as const, width: '100%' }}
                >
                  <option value="">Elija una cancha</option>
                  <option>Cancha 1</option>
                  <option>Cancha 2</option>
                  <option>Cancha 3</option>
                  <option>Cancha 4</option>
                </select>
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#888', pointerEvents: 'none' }}>▾</span>
              </div>
            </div>

            {/* Sanciones dropdown custom */}
            <div>
              <label style={fieldLabel}>Establecer Sanciones</label>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setSancionesOpen((p) => !p); }}
                  style={{ ...fieldBox, justifyContent: 'space-between' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px' }}>🚫</span>
                    <span style={{ color: sanciones ? '#333' : '#888' }}>{sanciones || 'Sanciones'}</span>
                  </span>
                  <span style={{ fontSize: '10px', color: '#aaa' }}>▾</span>
                </button>

                {sancionesOpen && (
                  <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 200, overflow: 'hidden' }}>
                    {sancionOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSanciones(opt); setSancionesOpen(false); }}
                        style={{ width: '100%', padding: '8px 14px', border: 'none', background: sanciones === opt ? '#fffbeb' : '#fff', textAlign: 'left', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#333', cursor: 'pointer', borderBottom: '1px solid #f5f5f5' }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Separador con label */}
          <p style={{ margin: '0 0 12px 0', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#444' }}>
            Duración del torneo
          </p>

          {/* Fila 2: Duración | Fechas importantes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>

            {/* Duración */}
            <div style={{ position: 'relative' }}>
              <label style={fieldLabel}>Duración del torneo</label>
              <button
                onClick={(e) => { e.stopPropagation(); setOpenCal((p) => p === 'duracion' ? null : 'duracion'); }}
                style={{ ...fieldBox }}
              >
                <span style={{ fontSize: '13px' }}>📅</span>
                <span style={{ color: duracion ? '#333' : '#888' }}>
                  {duracion ? formatDate(duracion) : 'Seleccionar Fechas'}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#aaa' }}>▾</span>
              </button>
              {openCal === 'duracion' && (
                <CalendarDropdown selected={duracion} onSelect={setDuracion} onClose={() => setOpenCal(null)} />
              )}
            </div>

            {/* Fechas importantes */}
            <div style={{ position: 'relative' }}>
              <label style={fieldLabel}>Fechas importantes del torneo</label>
              <button
                onClick={(e) => { e.stopPropagation(); setOpenCal((p) => p === 'fechas' ? null : 'fechas'); }}
                style={{ ...fieldBox }}
              >
                <span style={{ fontSize: '13px' }}>📅</span>
                <span style={{ color: fechasImportantes ? '#333' : '#888' }}>
                  {fechasImportantes ? formatDate(fechasImportantes) : 'Seleccionar Fechas'}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#aaa' }}>▾</span>
              </button>
              {openCal === 'fechas' && (
                <CalendarDropdown selected={fechasImportantes} onSelect={setFechasImportantes} onClose={() => setOpenCal(null)} />
              )}
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button
              onClick={() => navigate(-1)}
              style={{ padding: '10px 28px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", background: '#f0f0f0', color: '#666', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Cancelar ✕
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              style={{ padding: '10px 32px', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", background: '#F5C518', color: '#1a1a1a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Confirmar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentPage;