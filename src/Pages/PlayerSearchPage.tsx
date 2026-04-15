import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';
import { searchPlayersApi, type PlayerSearchResult } from '../api/playerService';

// Mapeo posición backend → display
const posicionDisplay: Record<string, string> = {
  GoalKeeper: 'Portero',
  Defender: 'Defensa',
  Midfielder: 'Mediocampista',
  Winger: 'Extremo',
};

// Opciones del filtro (valor enviado al backend)
const posicionesOpciones = [
  { backend: 'GoalKeeper', label: 'Portero' },
  { backend: 'Defender', label: 'Defensa' },
  { backend: 'Midfielder', label: 'Mediocampista' },
  { backend: 'Winger', label: 'Extremo' },
];

interface Filters {
  edad: string;
  semestre: string;
  posicion: string;
  sexo: string;
}

const PlayerSearchPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ edad: '', semestre: '', posicion: '', sexo: '' });
  const [players, setPlayers] = useState<PlayerSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {};
      if (search) params.name = search;
      if (filters.posicion) params.position = filters.posicion;
      if (filters.semestre) params.semester = parseInt(filters.semestre);
      if (filters.edad) { params.minAge = parseInt(filters.edad); params.maxAge = parseInt(filters.edad); }
      if (filters.sexo) params.gender = filters.sexo === 'M' ? 'Masculino' : 'Femenino';
      const result = await searchPlayersApi(params);
      setPlayers(result);
    } catch {
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  }, [search, filters]);

  useEffect(() => { fetchPlayers(); }, [fetchPlayers]);

  const toggleSection = (section: string) => setOpenSection(prev => prev === section ? null : section);
  const setFilter = (key: keyof Filters, value: string) => setFilters(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }));
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />
      <img src={campoFutbol} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22, zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,60,35,0.35)', zIndex: 2 }} />

      {/* SIDEBAR */}
      <div style={{ position: 'relative', zIndex: 10, width: '170px', minWidth: '170px', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        <img src={logo} alt="TechUp Fútbol" style={{ width: '85px', margin: '0 auto 28px auto', display: 'block' }} />
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 10px' }}>
          {[
            { label: 'Panel Principal', icon: '▦', path: '/dashboard' },
            { label: 'Mi Equipo', icon: '👥', path: '/equipo' },
            { label: 'Pagos', icon: '💳', path: '/pagos' },
            { label: 'Mercado', icon: '🛒', path: '/player-search', active: true },
            { label: 'Historial', icon: '📋', path: '/historial' },
          ].map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', border: 'none', background: item.active ? 'rgba(255,255,255,0.18)' : 'transparent', color: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: '12px', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { label: 'Preguntas Frecuentes', icon: '❓' },
            { label: 'Aprender', icon: '📖' },
            { label: 'Cerrar Sesión', icon: '🚪', onClick: () => { localStorage.clear(); navigate('/login'); } },
          ].map((item) => (
            <button key={item.label} onClick={(item as any).onClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: '12px', cursor: 'pointer', textAlign: 'left', width: '100%', opacity: 0.85 }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 20px 10px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: '14px', flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.25)' }}>

          {/* Barra búsqueda + filtros */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'flex-start' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '340px' }}>
              <input type="text" placeholder="Busca jugadores para tu equipo" value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '9px 40px 9px 14px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9f9f9' }} />
              <div style={{ position: 'absolute', right: '0', top: '0', bottom: '0', width: '38px', backgroundColor: '#2ecc71', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={fetchPlayers}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2.2" />
                  <path d="M16.5 16.5L21 21" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <button onClick={() => { setFiltersOpen(p => !p); setOpenSection(null); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', fontFamily: "'Inter', sans-serif", fontSize: '12px', cursor: 'pointer', color: '#333', fontWeight: 500, minWidth: '130px', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M7 12h10M11 18h2" stroke="#555" strokeWidth="2" strokeLinecap="round" /></svg>
                  Filtros {activeFiltersCount > 0 && (<span style={{ backgroundColor: '#2ecc71', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '9px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{activeFiltersCount}</span>)}
                </span>
                <span style={{ fontSize: '10px', color: '#888' }}>{filtersOpen ? '▲' : '▼'}</span>
              </button>

              {filtersOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 100, width: '220px', overflow: 'hidden' }}>
                  {/* Edad */}
                  <div>
                    <button onClick={() => toggleSection('Edad')} style={{ width: '100%', padding: '10px 14px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333', cursor: 'pointer', fontWeight: filters.edad ? 600 : 400 }}>
                      Edad {filters.edad && <span style={{ color: '#2ecc71', fontSize: '10px' }}>({filters.edad})</span>}
                      <span style={{ fontSize: '10px', color: '#aaa' }}>›</span>
                    </button>
                    {openSection === 'Edad' && (
                      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #f0f0f0' }}>
                        <input type="number" placeholder="Edad exacta" value={filters.edad} onChange={e => setFilters(p => ({ ...p, edad: e.target.value }))} min={15} max={40} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '12px', fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    )}
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0' }} />

                  {/* Semestre */}
                  <div>
                    <button onClick={() => toggleSection('Semestre')} style={{ width: '100%', padding: '10px 14px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333', cursor: 'pointer', fontWeight: filters.semestre ? 600 : 400 }}>
                      Semestre {filters.semestre && <span style={{ color: '#2ecc71', fontSize: '10px' }}>({filters.semestre})</span>}
                      <span style={{ fontSize: '10px', color: '#aaa' }}>›</span>
                    </button>
                    {openSection === 'Semestre' && (
                      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #f0f0f0' }}>
                        <input type="number" placeholder="Semestre (1-10)" value={filters.semestre} onChange={e => setFilters(p => ({ ...p, semestre: e.target.value }))} min={1} max={10} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '12px', fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    )}
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0' }} />

                  {/* Posición */}
                  <div>
                    <button onClick={() => toggleSection('Posicion')} style={{ width: '100%', padding: '10px 14px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333', cursor: 'pointer', fontWeight: filters.posicion ? 600 : 400 }}>
                      Posición {filters.posicion && <span style={{ color: '#2ecc71', fontSize: '10px' }}>({posicionDisplay[filters.posicion]})</span>}
                      <span style={{ fontSize: '10px', color: '#aaa' }}>›</span>
                    </button>
                    {openSection === 'Posicion' && (
                      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {posicionesOpciones.map(p => (
                          <button key={p.backend} onClick={() => setFilter('posicion', p.backend)} style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '11px', textAlign: 'left', backgroundColor: filters.posicion === p.backend ? '#2ecc71' : '#f5f5f5', color: filters.posicion === p.backend ? '#fff' : '#333' }}>
                            {p.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0' }} />

                  {/* Sexo */}
                  <div>
                    <button onClick={() => toggleSection('Sexo')} style={{ width: '100%', padding: '10px 14px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#333', cursor: 'pointer', fontWeight: filters.sexo ? 600 : 400 }}>
                      Sexo {filters.sexo && <span style={{ color: '#2ecc71', fontSize: '10px' }}>({filters.sexo === 'M' ? 'Masculino' : 'Femenino'})</span>}
                      <span style={{ fontSize: '10px', color: '#aaa' }}>›</span>
                    </button>
                    {openSection === 'Sexo' && (
                      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '6px' }}>
                        {[{ val: 'M', label: 'Masculino' }, { val: 'F', label: 'Femenino' }].map(s => (
                          <button key={s.val} onClick={() => setFilter('sexo', s.val)} style={{ flex: 1, padding: '5px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '11px', backgroundColor: filters.sexo === s.val ? '#2ecc71' : '#f5f5f5', color: filters.sexo === s.val ? '#fff' : '#333' }}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {activeFiltersCount > 0 && (
                    <div style={{ padding: '8px 14px', borderTop: '1px solid #f0f0f0' }}>
                      <button onClick={() => setFilters({ edad: '', semestre: '', posicion: '', sexo: '' })} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: 'none', backgroundColor: '#fee', color: '#e53935', fontFamily: "'Inter', sans-serif", fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>
                        Limpiar filtros
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Grid jugadores */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', paddingRight: '4px', alignContent: 'start' }}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontFamily: "'Inter', sans-serif", fontSize: '13px', padding: '40px' }}>
                Buscando jugadores...
              </div>
            ) : players.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontFamily: "'Inter', sans-serif", fontSize: '13px', padding: '40px' }}>
                No se encontraron jugadores
              </div>
            ) : (
              players.map((player) => (
                <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {player.photoUrl ? <img src={player.photoUrl} alt={player.fullname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 1px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {player.fullname}
                    </p>
                    <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#aaa' }}>
                      {player.age} · {posicionDisplay[player.position] || player.position} · {player.gender}{player.semester ? ` · Sem ${player.semester}` : ''}
                    </p>
                    <span style={{ fontSize: '9px', color: player.available ? '#27ae60' : '#e74c3c', fontWeight: 600 }}>
                      {player.available ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', flexShrink: 0 }} title="Invitar al equipo">
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

export default PlayerSearchPage;
