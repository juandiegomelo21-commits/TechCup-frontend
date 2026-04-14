import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';

const mockPlayers = [
  { id: 1, name: 'Vanessa Torres', username: '', edad: 20, posicion: 'Delantero', sexo: 'F', semestre: 3 },
  { id: 2, name: 'Daniel Pinilla', username: '', edad: 22, posicion: 'Defensa', sexo: 'M', semestre: 5 },
  { id: 3, name: 'Shadday Correa', username: '', edad: 19, posicion: 'Mediocampista', sexo: 'M', semestre: 2 },
  { id: 4, name: 'Nicolas Sanchez', username: '', edad: 23, posicion: 'Portero', sexo: 'M', semestre: 7 },
  { id: 5, name: 'Maria Jose Perez', username: '', edad: 19, posicion: 'Mediocampista', sexo: 'F', semestre: 2 },
  { id: 6, name: 'Adrian Ducuara', username: '', edad: 23, posicion: 'Portero', sexo: 'M', semestre: 7 },
  { id: 7, name: 'Juan David Mejia', username: '', edad: 21, posicion: 'Defensa', sexo: 'M', semestre: 4 },
  { id: 8, name: 'Andres Pineda', username: '', edad: 24, posicion: 'Delantero', sexo: 'M', semestre: 6 },
  { id: 9, name: 'Mariana Malagon', username: '', edad: 20, posicion: 'Mediocampista', sexo: 'F', semestre: 3 },
  { id: 10, name: 'Andres Cantor', username: '', edad: 22, posicion: 'Defensa', sexo: 'M', semestre: 5 },
  { id: 11, name: 'Rodrigo Martinez', username: '', edad: 20, posicion: 'Mediocampista', sexo: 'M', semestre: 3 },
  { id: 12, name: 'Javier Romero', username: '', edad: 22, posicion: 'Defensa', sexo: 'M', semestre: 5 },
  { id: 13, name: 'Juan Tellez', username: '', edad: 20, posicion: 'Mediocampista', sexo: 'M', semestre: 3 },
  { id: 14, name: 'Ronaldo Mejia', username: '', edad: 22, posicion: 'Defensa', sexo: 'M', semestre: 5 },
  { id: 15, name: 'David Cajamarca', username: '', edad: 20, posicion: 'Mediocampista', sexo: 'M', semestre: 3 },
  { id: 16, name: 'Juan Diego Melo', username: '', edad: 22, posicion: 'Defensa', sexo: 'M', semestre: 5 },
];

const posiciones = ['Delantero', 'Mediocampista', 'Defensa', 'Portero'];

const PLayerSearchPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null); // 'Edad' | 'Semestre' | 'Posicion' | 'Sexo'

  const [filters, setFilters] = useState({
    edad: '',
    semestre: '',
    posicion: '',
    sexo: '',
  });

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? '' : value }));
  };

  const filtered = mockPlayers.filter((p) => {
    const matchSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.username.toLowerCase().includes(search.toLowerCase());
    const matchEdad = filters.edad === '' || p.edad === Number(filters.edad);
    const matchSemestre = filters.semestre === '' || p.semestre === Number(filters.semestre);
    const matchPosicion = filters.posicion === '' || p.posicion === filters.posicion;
    const matchSexo = filters.sexo === '' || p.sexo === filters.sexo;
    return matchSearch && matchEdad && matchSemestre && matchPosicion && matchSexo;
  });

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Fondo verde */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />

      {/* Imagen de fondo */}
      <img
        src={campoFutbol}
        alt="Jugador"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', opacity: 0.22, zIndex: 1,
        }}
      />

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,60,35,0.35)', zIndex: 2 }} />

      {/* ── SIDEBAR ── */}
      <div
        style={{
          position: 'relative', zIndex: 10, width: '170px', minWidth: '170px',
          height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 0',
        }}
      >
        <img src={logo} alt="TechUp Fútbol" style={{ width: '85px', margin: '0 auto 28px auto', display: 'block' }} />

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 10px' }}>
          {[
            { label: 'Panel Principal'},
            { label: 'Mi Equipo'},
            { label: 'Pagos'},
            { label: 'Mercado', active: true },
            { label: 'Historial'},
          ].map((item) => (
            <button
              key={item.label}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px',
                borderRadius: '8px', border: 'none',
                background: item.active ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: '12px',
                cursor: 'pointer', textAlign: 'left', width: '100%',
              }}
            >
              <span style={{ fontSize: '13px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { label: 'Preguntas Frecuentes'},
            { label: 'Aprender'},
            { label: 'Cerrar Sesión'},
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.label === 'Cerrar Sesión' ? () => navigate('/login') : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px',
                borderRadius: '8px', border: 'none', background: 'transparent',
                color: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: '12px',
                cursor: 'pointer', textAlign: 'left', width: '100%', opacity: 0.85,
              }}
            >
              <span style={{ fontSize: '13px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENIDO ── */}
      <div
        style={{
          position: 'relative', zIndex: 10, flex: 1,
          display: 'flex', flexDirection: 'column',
          padding: '20px 24px 20px 10px', overflow: 'hidden',
        }}
      >
        {/* Panel blanco/semitransparente */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: '14px',
            flex: 1, display: 'flex', flexDirection: 'column',
            padding: '16px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
          }}
        >
          {/* Barra superior: búsqueda + filtros */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'flex-start' }}>

            {/* Input búsqueda */}
            <div style={{ position: 'relative', flex: 1, maxWidth: '340px' }}>
              <input
                type="text"
                placeholder="Busca jugadores para tu equipo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '9px 40px 9px 14px',
                  borderRadius: '8px', border: '1px solid #ddd',
                  fontFamily: "'Inter', sans-serif", fontSize: '12px',
                  color: '#333', outline: 'none', boxSizing: 'border-box',
                  backgroundColor: '#f9f9f9',
                }}
              />
              <div
                style={{
                  position: 'absolute', right: '0', top: '0', bottom: '0',
                  width: '38px', backgroundColor: '#2ecc71', borderRadius: '0 8px 8px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2.2" />
                  <path d="M16.5 16.5L21 21" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Botón filtros + dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setFiltersOpen((p) => !p); setOpenSection(null); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 14px', borderRadius: '8px',
                  border: '1px solid #ddd', backgroundColor: '#f9f9f9',
                  fontFamily: "'Inter', sans-serif", fontSize: '12px',
                  cursor: 'pointer', color: '#333', fontWeight: 500,
                  minWidth: '130px', justifyContent: 'space-between',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M7 12h10M11 18h2" stroke="#555" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Filtros {activeFiltersCount > 0 && <span style={{ backgroundColor: '#2ecc71', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '9px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{activeFiltersCount}</span>}
                </span>
                <span style={{ fontSize: '10px', color: '#888' }}>{filtersOpen ? '▲' : '▼'}</span>
              </button>

              {/* Dropdown filtros */}
              {filtersOpen && (
                <div
                  style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                    backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e0e0e0',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 100,
                    width: '220px', overflow: 'hidden',
                  }}
                >
                  {/* Edad */}
                  <div>
                    <button
                      onClick={() => toggleSection('Edad')}
                      style={{
                        width: '100%', padding: '10px 14px', border: 'none', background: 'none',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333',
                        cursor: 'pointer', fontWeight: filters.edad ? 600 : 400,
                      }}
                    >
                      Edad {filters.edad && <span style={{ color: '#2ecc71', fontSize: '10px' }}>({filters.edad})</span>}
                      <span style={{ fontSize: '10px', color: '#aaa' }}>›</span>
                    </button>
                    {openSection === 'Edad' && (
                      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #f0f0f0' }}>
                        <input
                          type="number"
                          placeholder="Ingrese un Número"
                          value={filters.edad}
                          onChange={(e) => setFilters((p) => ({ ...p, edad: e.target.value }))}
                          min={15} max={40}
                          style={{
                            width: '100%', padding: '7px 10px', borderRadius: '6px',
                            border: '1px solid #ddd', fontSize: '12px', fontFamily: "'Inter', sans-serif",
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0' }} />

                  {/* Semestre */}
                  <div>
                    <button
                      onClick={() => toggleSection('Semestre')}
                      style={{
                        width: '100%', padding: '10px 14px', border: 'none', background: 'none',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333',
                        cursor: 'pointer', fontWeight: filters.semestre ? 600 : 400,
                      }}
                    >
                      Semestre {filters.semestre && <span style={{ color: '#2ecc71', fontSize: '10px' }}>({filters.semestre})</span>}
                      <span style={{ fontSize: '10px', color: '#aaa' }}>›</span>
                    </button>
                    {openSection === 'Semestre' && (
                      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #f0f0f0' }}>
                        <input
                          type="number"
                          placeholder="Ingrese un Número"
                          value={filters.semestre}
                          onChange={(e) => setFilters((p) => ({ ...p, semestre: e.target.value }))}
                          min={1} max={10}
                          style={{
                            width: '100%', padding: '7px 10px', borderRadius: '6px',
                            border: '1px solid #ddd', fontSize: '12px', fontFamily: "'Inter', sans-serif",
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0' }} />

                  {/* Posición */}
                  <div>
                    <button
                      onClick={() => toggleSection('Posicion')}
                      style={{
                        width: '100%', padding: '10px 14px', border: 'none', background: 'none',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333',
                        cursor: 'pointer', fontWeight: filters.posicion ? 600 : 400,
                      }}
                    >
                      Posición {filters.posicion && <span style={{ color: '#2ecc71', fontSize: '10px' }}>({filters.posicion})</span>}
                      <span style={{ fontSize: '10px', color: '#aaa' }}>›</span>
                    </button>
                    {openSection === 'Posicion' && (
                      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {posiciones.map((pos) => (
                          <button
                            key={pos}
                            onClick={() => setFilter('posicion', pos)}
                            style={{
                              padding: '5px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                              fontFamily: "'Inter', sans-serif", fontSize: '11px', textAlign: 'left',
                              backgroundColor: filters.posicion === pos ? '#2ecc71' : '#f5f5f5',
                              color: filters.posicion === pos ? '#fff' : '#333',
                            }}
                          >
                            {pos}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0' }} />

                  {/* Sexo */}
                  <div>
                    <button
                      onClick={() => toggleSection('Sexo')}
                      style={{
                        width: '100%', padding: '10px 14px', border: 'none', background: 'none',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333',
                        cursor: 'pointer', fontWeight: filters.sexo ? 600 : 400,
                      }}
                    >
                      Sexo {filters.sexo && <span style={{ color: '#2ecc71', fontSize: '10px' }}>({filters.sexo === 'M' ? 'Masculino' : 'Femenino'})</span>}
                      <span style={{ fontSize: '10px', color: '#aaa' }}>›</span>
                    </button>
                    {openSection === 'Sexo' && (
                      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '6px' }}>
                        {[{ val: 'M', label: 'Masculino' }, { val: 'F', label: 'Femenino' }].map((s) => (
                          <button
                            key={s.val}
                            onClick={() => setFilter('sexo', s.val)}
                            style={{
                              flex: 1, padding: '5px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                              fontFamily: "'Inter', sans-serif", fontSize: '11px',
                              backgroundColor: filters.sexo === s.val ? '#2ecc71' : '#f5f5f5',
                              color: filters.sexo === s.val ? '#fff' : '#333',
                            }}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Limpiar filtros */}
                  {activeFiltersCount > 0 && (
                    <div style={{ padding: '8px 14px', borderTop: '1px solid #f0f0f0' }}>
                      <button
                        onClick={() => setFilters({ edad: '', semestre: '', posicion: '', sexo: '' })}
                        style={{
                          width: '100%', padding: '6px', borderRadius: '6px', border: 'none',
                          backgroundColor: '#fee', color: '#e53935', fontFamily: "'Inter', sans-serif",
                          fontSize: '11px', cursor: 'pointer', fontWeight: 600,
                        }}
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Grid de jugadores */}
          <div
            style={{
              flex: 1, overflowY: 'auto',
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
              paddingRight: '4px',
            }}
          >
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontFamily: "'Inter', sans-serif", fontSize: '13px', padding: '40px' }}>
                No se encontraron jugadores
              </div>
            ) : (
              filtered.map((player) => (
                <div
                  key={player.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 12px', borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    transition: 'background 0.15s',
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%',
                      backgroundColor: '#ccc', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                    }}
                  >
                    👤
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 1px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {player.name}
                    </p>
                    {player.username && (
                      <p style={{ margin: '0 0 2px 0', fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#888' }}>
                        {player.username}
                      </p>
                    )}
                    <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#aaa' }}>
                      Edad · Posición · Sexo · Semestre
                    </p>
                  </div>

                  {/* Botón invitar */}
                  <button
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#aaa', padding: '2px', flexShrink: 0,
                    }}
                    title="Invitar al equipo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;