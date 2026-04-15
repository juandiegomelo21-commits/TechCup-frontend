import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { usePizarra } from '../Hook/UsePizarra';

import jeimmy   from '../assets/Jeimmy.png';
import juandi   from '../assets/juandi.png';
import santi    from '../assets/santi.png';
import jesteban from '../assets/jesteban.png';
import david    from '../assets/david.png';
import cantor   from '../assets/cantor.png';
import rodrigo  from '../assets/rodrigo.png';
import messi    from '../assets/messi.png';

// ── Tipos ─────────────────────────────────────────────────────────────────────

type Posicion = 'portero' | 'defensa' | 'mediocampista' | 'delantero';

export interface Jugador {
  id: string;
  nombre: string;
  foto: string;
  posicion: Posicion;
}

// ── Mock data — reemplazar con fetch al back ──────────────────────────────────

const jugadores: Jugador[] = [
  { id: '1', nombre: 'JEIMMY',    foto: jeimmy,   posicion: 'portero'       },
  { id: '2', nombre: 'JUAN DI',   foto: juandi,   posicion: 'defensa'       },
  { id: '3', nombre: 'SANTI',     foto: santi,    posicion: 'defensa'       },
  { id: '4', nombre: 'J ESTEBAN', foto: jesteban, posicion: 'defensa'       },
  { id: '5', nombre: 'DAVID',     foto: david,    posicion: 'mediocampista' },
  { id: '6', nombre: 'CANTOR',    foto: cantor,   posicion: 'mediocampista' },
  { id: '7', nombre: 'RODRIGO',   foto: rodrigo,  posicion: 'delantero'     },
  { id: '8', nombre: 'TU',        foto: messi,    posicion: 'delantero'     },
];

// ── Colores y labels por posición ─────────────────────────────────────────────

const colPosicion: Record<Posicion, string> = {
  portero:       '#E8A020',
  defensa:       '#0D3B6E',
  mediocampista: '#0D3B6E',
  delantero:     '#0D3B6E',
};

const labelPosicion: Record<Posicion, string> = {
  portero:       'Portero',
  defensa:       'Defensa',
  mediocampista: 'Mediocampista',
  delantero:     'Delantero',
};

const colorSlot = { portero: '#E8A020', jugador: '#1565C0' };

// ── Tarjeta jugador draggable ─────────────────────────────────────────────────

const TarjetaJugador = ({ jugador, asignado }: { jugador: Jugador; asignado: boolean }) => {
  const col = colPosicion[jugador.posicion];
  const esPortero = jugador.posicion === 'portero';

  return (
    <div
      draggable={!asignado}
      onDragStart={e => {
        e.dataTransfer.setData('jugadorId', jugador.id);
        e.dataTransfer.setData('fromSlotId', '');
      }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
        cursor: asignado ? 'not-allowed' : 'grab',
        opacity: asignado ? 0.3 : 1,
        transition: 'opacity 0.2s',
        pointerEvents: asignado ? 'none' : 'auto',
      }}
    >
      {/* Círculo foto */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '50%',
        overflow: 'hidden',
        border: `2.5px solid ${esPortero ? '#E8A020' : '#ffffff'}`,
        backgroundColor: col,
        boxShadow: esPortero
          ? `0 0 10px #E8A02066`
          : '0 0 8px rgba(255,255,255,0.15)',
        position: 'relative', flexShrink: 0,
      }}>
        <img src={jugador.foto} alt={jugador.nombre} style={{
          width: '100%', height: '130%', objectFit: 'cover',
          objectPosition: 'top', position: 'absolute', top: 0, left: 0,
        }} />
      </div>

      {/* Nombre */}
      <span style={{
        fontSize: '8px', fontWeight: 800, color: '#fff',
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: '0.3px', textAlign: 'center', lineHeight: 1.1,
      }}>
        {jugador.nombre}
      </span>

      {/* Badge posición */}
      <span style={{
        backgroundColor: col,
        color: esPortero ? '#000' : '#fff',
        fontSize: '7px', fontWeight: 700,
        fontFamily: "'Inter', sans-serif",
        textTransform: 'uppercase', letterSpacing: '0.3px',
        padding: '1px 5px', borderRadius: '4px',
        border: esPortero ? 'none' : '1px solid rgba(255,255,255,0.3)',
      }}>
        {labelPosicion[jugador.posicion]}
      </span>
    </div>
  );
};

// ── Pantalla ──────────────────────────────────────────────────────────────────

const PizarraTactica = () => {
  const navigate = useNavigate();
  const {
    slots, dragOver, setDragOver,
    hayCambios, mostrarPopup,
    jugadoresAsignados,
    handleDrop, handleRemove,
    handleDragFromSlot, handleDropToList,
    handleGuardar,
  } = usePizarra(jugadores);

  return (
    <DashboardLayout>

      {/* ── Popup guardado ───────────────────────────────────────────────── */}
      {mostrarPopup && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.78)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,191,0,0.45)',
          borderRadius: '14px',
          padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: '0 0 28px rgba(255,191,0,0.2)',
          animation: 'slideIn 0.3s ease',
        }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            backgroundColor: '#FFBF00',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '13px' }}>
              ¡Cambios guardados!
            </p>
            <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", fontSize: '11px' }}>
              Tu alineación fue actualizada
            </p>
          </div>
          <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }`}</style>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px', fontFamily: "'Inter', sans-serif" }}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#FFBF00', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '18px' }}>
            Pizarra Táctica — Fútbol 7
          </span>
          <button
            onClick={() => navigate('/mercado')}
            style={{
              backgroundColor: '#FFBF00', color: '#000', border: 'none',
              borderRadius: '25px', padding: '10px 28px', fontSize: '13px',
              fontWeight: 800, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Mercado de jugadores
          </button>
        </div>

        {/* ── Cuerpo ──────────────────────────────────────────────────────── */}
        <div style={{
          flex: 1, display: 'flex', gap: '14px', overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.13)',
          padding: '14px',
        }}>

          {/* ── CAMPO FÚTBOL 7 ───────────────────────────────────────────── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden',
              background: 'linear-gradient(180deg, #1a6b2f 0%, #1e7a34 20%, #1a6b2f 40%, #1e7a34 60%, #1a6b2f 80%, #1e7a34 100%)',
              border: '2px solid rgba(255,255,255,0.25)',
            }}>
              {/* Líneas campo SVG fútbol 7 */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 340 480" preserveAspectRatio="none">
                {[0,1,2,3,4,5,6,7].map(i => (
                  <rect key={i} x="8" y={8 + i*58} width="324" height="29" fill="rgba(0,0,0,0.04)"/>
                ))}
                <rect x="8" y="8" width="324" height="464" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2"/>
                <line x1="8" y1="240" x2="332" y2="240" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <circle cx="170" cy="240" r="45" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <circle cx="170" cy="240" r="3" fill="rgba(255,255,255,0.7)"/>
                <circle cx="170" cy="68" r="2.5" fill="rgba(255,255,255,0.6)"/>
                <circle cx="170" cy="412" r="2.5" fill="rgba(255,255,255,0.6)"/>
                <rect x="80" y="8" width="180" height="80" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <rect x="120" y="8" width="100" height="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                <rect x="80" y="392" width="180" height="80" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <rect x="120" y="437" width="100" height="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                <rect x="130" y="2" width="80" height="10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
                <rect x="130" y="468" width="80" height="10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
              </svg>

              {/* Slots */}
              {slots.map(slot => {
                const jugador = slot.jugadorId ? jugadores.find(j => j.id === slot.jugadorId) : null;
                const col = colorSlot[slot.posicion];
                const isOver = dragOver === slot.id;

                return (
                  <div
                    key={slot.id}
                    onDragOver={e => { e.preventDefault(); setDragOver(slot.id); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={e => handleDrop(e, slot.id)}
                    style={{
                      position: 'absolute',
                      left: `${slot.x}%`, top: `${slot.y}%`,
                      transform: 'translate(-50%, -50%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      zIndex: 10,
                    }}
                  >
                    {jugador ? (
                      <div
                        style={{ position: 'relative', cursor: 'grab' }}
                        draggable
                        onDragStart={e => handleDragFromSlot(e, slot.id)}
                      >
                        <div
                          onClick={() => handleRemove(slot.id)}
                          title="Click para devolver"
                          style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            overflow: 'hidden',
                            border: `2.5px solid ${jugador.posicion === 'portero' ? '#E8A020' : '#fff'}`,
                            backgroundColor: colPosicion[jugador.posicion],
                            boxShadow: jugador.posicion === 'portero'
                              ? '0 0 16px #E8A020bb'
                              : '0 0 12px rgba(255,255,255,0.25)',
                            cursor: 'pointer',
                          }}
                        >
                          <img src={jugador.foto} alt={jugador.nombre} style={{
                            width: '100%', height: '130%', objectFit: 'cover', objectPosition: 'top',
                          }} />
                        </div>
                        <span style={{
                          position: 'absolute', bottom: '-16px', left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '8px', fontWeight: 800, color: '#fff',
                          fontFamily: "'Montserrat', sans-serif",
                          textShadow: '0 1px 4px rgba(0,0,0,1)',
                          whiteSpace: 'nowrap',
                        }}>
                          {jugador.nombre}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div style={{
                          width: '44px', height: '44px', borderRadius: '50%',
                          border: `2px dashed ${isOver ? '#FFBF00' : col}`,
                          backgroundColor: isOver ? 'rgba(255,191,0,0.18)' : 'rgba(0,0,0,0.28)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s',
                          boxShadow: isOver ? '0 0 16px rgba(255,191,0,0.5)' : 'none',
                        }}>
                          <span style={{ fontSize: '20px', color: isOver ? '#FFBF00' : `${col}cc`, lineHeight: 1 }}>+</span>
                        </div>
                        <span style={{
                          marginTop: '4px', fontSize: '7px', color: 'rgba(255,255,255,0.65)',
                          fontFamily: "'Inter', sans-serif", fontWeight: 600,
                          textTransform: 'uppercase', letterSpacing: '0.3px',
                          textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                          textAlign: 'center', maxWidth: '70px', lineHeight: 1.2,
                        }}>
                          {slot.label}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Botón guardar */}
            <button
              onClick={handleGuardar}
              disabled={!hayCambios}
              style={{
                backgroundColor: hayCambios ? '#FFBF00' : 'rgba(255,255,255,0.12)',
                color: hayCambios ? '#000' : 'rgba(255,255,255,0.35)',
                border: 'none', borderRadius: '25px', padding: '11px 0',
                fontSize: '14px', fontWeight: 800,
                cursor: hayCambios ? 'pointer' : 'not-allowed',
                fontFamily: "'Montserrat', sans-serif", width: '100%',
                transition: 'all 0.25s',
              }}
            >
              {hayCambios ? 'Guardar cambios' : 'Sin cambios pendientes'}
            </button>
          </div>

          {/* ── LISTA JUGADORES ─────────────────────────────────────────── */}
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDropToList}
            style={{ width: '175px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <span style={{ color: '#FFBF00', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '13px' }}>
              Jugadores ({jugadores.length}/12)
            </span>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px', overflowY: 'auto', flex: 1,
              alignContent: 'start', paddingRight: '2px',
            }}>
              {jugadores.map(j => (
                <TarjetaJugador
                  key={j.id}
                  jugador={j}
                  asignado={jugadoresAsignados.includes(j.id)}
                />
              ))}
            </div>

            {/* Leyenda */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#E8A020', flexShrink: 0 }}/>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>Portero</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0D3B6E', border: '1px solid rgba(255,255,255,0.3)', flexShrink: 0 }}/>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>Jugador de campo</span>
              </div>
              <p style={{
                fontSize: '9px', color: 'rgba(255,255,255,0.3)',
                fontFamily: "'Inter', sans-serif", margin: '4px 0 0',
                textAlign: 'center', lineHeight: 1.4,
              }}>
                Arrastra al campo o aquí<br/>para devolver · Click quita
              </p>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default PizarraTactica;
