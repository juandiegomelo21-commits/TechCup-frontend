import { useState, useEffect } from 'react';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { getPlayersApi, PlayerResponse } from '../api/playerService';

const positionLabel: Record<string, string> = {
  GoalKeeper: 'Portero',
  Defender: 'Defensa',
  Midfielder: 'Mediocampista',
  Winger: 'Delantero',
};

interface Player {
  id: string;
  name: string;
  edad: number;
  posicion: string;
  sexo: string;
  semestre: number;
}

const mapPlayer = (p: PlayerResponse): Player => ({
  id: p.id,
  name: p.fullname,
  edad: p.age,
  posicion: positionLabel[p.position] ?? p.position,
  sexo: p.gender,
  semestre: p.semester,
});

const posiciones = ['Delantero', 'Mediocampista', 'Defensa', 'Portero'];

interface Filters {
  edad: string;
  semestre: string;
  posicion: string;
  sexo: string;
}

const colPosicion: Record<string, string> = {
  Portero:       '#E8A020',
  Defensa:       '#1565C0',
  Mediocampista: '#2E7D32',
  Delantero:     '#C62828',
};

const PlayerSearchPage = () => {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ edad: '', semestre: '', posicion: '', sexo: '' });
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getPlayersApi()
      .then(data => setPlayers(data.map(mapPlayer)))
      .catch(() => setPlayers([]));
  }, []);

  const toggleSection = (s: string) => setOpenSection(p => p === s ? null : s);
  const setFilter = (key: keyof Filters, value: string) =>
    setFilters(p => ({ ...p, [key]: p[key] === value ? '' : value }));

  const filtered = players.filter(p => {
    const matchSearch   = search === '' || p.name.toLowerCase().includes(search.toLowerCase());
    const matchEdad     = filters.edad === ''     || p.edad === Number(filters.edad);
    const matchSemestre = filters.semestre === '' || p.semestre === Number(filters.semestre);
    const matchPosicion = filters.posicion === '' || p.posicion === filters.posicion;
    const matchSexo     = filters.sexo === ''     || p.sexo === filters.sexo;
    return matchSearch && matchEdad && matchSemestre && matchPosicion && matchSexo;
  });

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <DashboardLayout>
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '14px', fontFamily: "'Inter', sans-serif" }}
        onClick={() => { setFiltersOpen(false); setOpenSection(null); }}
      >

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
              Mercado de Jugadores
            </h1>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              Busca y ficha jugadores para tu equipo
            </p>
          </div>
          <span style={{
            backgroundColor: '#FFBF00', color: '#000',
            fontSize: '11px', fontWeight: 700,
            padding: '4px 14px', borderRadius: '20px',
            letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            {filtered.length} jugadores
          </span>
        </div>

        {/* ── Búsqueda + filtros ───────────────────────────────────────────── */}
        <div
          style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Input */}
          <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
            <input
              type="text"
              placeholder="Busca jugadores por nombre..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '10px 44px 10px 16px',
                borderRadius: '25px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                fontFamily: "'Inter', sans-serif", fontSize: '13px',
                color: '#fff', outline: 'none',
                boxSizing: 'border-box' as const,
              }}
            />
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '44px',
              backgroundColor: '#FFBF00', borderRadius: '0 25px 25px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#000" strokeWidth="2.2"/>
                <path d="M16.5 16.5L21 21" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Filtros */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={e => { e.stopPropagation(); setFiltersOpen(p => !p); setOpenSection(null); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px', borderRadius: '25px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: activeFiltersCount > 0 ? 'rgba(255,191,0,0.15)' : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                fontFamily: "'Inter', sans-serif", fontSize: '12px',
                cursor: 'pointer', color: '#fff', fontWeight: 500,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M7 12h10M11 18h2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Filtros
              {activeFiltersCount > 0 && (
                <span style={{
                  backgroundColor: '#FFBF00', color: '#000',
                  borderRadius: '50%', width: '18px', height: '18px',
                  fontSize: '9px', fontWeight: 800,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {filtersOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                backgroundColor: 'rgba(0,40,20,0.97)',
                backdropFilter: 'blur(16px)',
                borderRadius: '12px',
                border: '1px solid rgba(255,191,0,0.25)',
                boxShadow: '0 8px 28px rgba(0,0,0,0.4)',
                zIndex: 200, width: '220px', overflow: 'hidden',
              }}>

                {/* Edad */}
                <div>
                  <button onClick={() => toggleSection('Edad')} style={{ width: '100%', padding: '11px 16px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#fff', cursor: 'pointer' }}>
                    <span>Edad {filters.edad && <span style={{ color: '#FFBF00', fontSize: '10px' }}>({filters.edad})</span>}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>›</span>
                  </button>
                  {openSection === 'Edad' && (
                    <div style={{ padding: '6px 16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <input type="number" placeholder="Ej: 20" value={filters.edad} onChange={e => setFilters(p => ({ ...p, edad: e.target.value }))} min={15} max={40}
                        style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.08)', fontSize: '12px', fontFamily: "'Inter', sans-serif", outline: 'none', color: '#fff', boxSizing: 'border-box' as const }} />
                    </div>
                  )}
                </div>
                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.07)' }} />

                {/* Semestre */}
                <div>
                  <button onClick={() => toggleSection('Semestre')} style={{ width: '100%', padding: '11px 16px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#fff', cursor: 'pointer' }}>
                    <span>Semestre {filters.semestre && <span style={{ color: '#FFBF00', fontSize: '10px' }}>({filters.semestre})</span>}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>›</span>
                  </button>
                  {openSection === 'Semestre' && (
                    <div style={{ padding: '6px 16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <input type="number" placeholder="Ej: 4" value={filters.semestre} onChange={e => setFilters(p => ({ ...p, semestre: e.target.value }))} min={1} max={10}
                        style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.08)', fontSize: '12px', fontFamily: "'Inter', sans-serif", outline: 'none', color: '#fff', boxSizing: 'border-box' as const }} />
                    </div>
                  )}
                </div>
                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.07)' }} />

                {/* Posición */}
                <div>
                  <button onClick={() => toggleSection('Posicion')} style={{ width: '100%', padding: '11px 16px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#fff', cursor: 'pointer' }}>
                    <span>Posición {filters.posicion && <span style={{ color: '#FFBF00', fontSize: '10px' }}>({filters.posicion})</span>}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>›</span>
                  </button>
                  {openSection === 'Posicion' && (
                    <div style={{ padding: '6px 16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {posiciones.map(pos => (
                        <button key={pos} onClick={() => setFilter('posicion', pos)} style={{ padding: '6px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '11px', textAlign: 'left', backgroundColor: filters.posicion === pos ? '#FFBF00' : 'rgba(255,255,255,0.08)', color: filters.posicion === pos ? '#000' : '#fff', fontWeight: filters.posicion === pos ? 700 : 400 }}>
                          {pos}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.07)' }} />

                {/* Sexo */}
                <div>
                  <button onClick={() => toggleSection('Sexo')} style={{ width: '100%', padding: '11px 16px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#fff', cursor: 'pointer' }}>
                    <span>Sexo {filters.sexo && <span style={{ color: '#FFBF00', fontSize: '10px' }}>({filters.sexo === 'M' ? 'Masc.' : 'Fem.'})</span>}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>›</span>
                  </button>
                  {openSection === 'Sexo' && (
                    <div style={{ padding: '6px 16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '6px' }}>
                      {[{ val: 'M', label: 'Masculino' }, { val: 'F', label: 'Femenino' }].map(s => (
                        <button key={s.val} onClick={() => setFilter('sexo', s.val)} style={{ flex: 1, padding: '6px 8px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '11px', backgroundColor: filters.sexo === s.val ? '#FFBF00' : 'rgba(255,255,255,0.08)', color: filters.sexo === s.val ? '#000' : '#fff', fontWeight: filters.sexo === s.val ? 700 : 400 }}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {activeFiltersCount > 0 && (
                  <div style={{ padding: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <button onClick={() => setFilters({ edad: '', semestre: '', posicion: '', sexo: '' })} style={{ width: '100%', padding: '7px', borderRadius: '8px', border: '1px solid rgba(255,80,80,0.3)', backgroundColor: 'rgba(255,80,80,0.1)', color: '#ff6b6b', fontFamily: "'Inter', sans-serif", fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Grid jugadores ───────────────────────────────────────────────── */}
        <div className="grid-players" style={{ flex: 1, overflowY: 'auto', alignContent: 'start', paddingRight: '4px' }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '13px', padding: '60px', gap: '10px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                <path d="M16.5 16.5L21 21" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              No se encontraron jugadores
            </div>
          ) : (
            filtered.map(player => {
              const col = colPosicion[player.posicion] ?? '#555';
              return (
                <div
                  key={player.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(0,80,40,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,100,50,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,191,0,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(0,80,40,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  {/* Avatar — icono blanco */}
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.3)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.9)"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,0.9)"/>
                    </svg>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 2px', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {player.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: col, color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 6px', borderRadius: '4px', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                        {player.posicion}
                      </span>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif" }}>
                        {player.edad} años · Sem {player.semestre} · {player.sexo === 'M' ? 'M' : 'F'}
                      </span>
                    </div>
                  </div>

                  {/* Botón invitar */}
                  <button
                    title="Invitar al equipo"
                    style={{ backgroundColor: '#FFBF00', border: 'none', borderRadius: '20px', padding: '5px 12px', cursor: 'pointer', flexShrink: 0, fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700, color: '#000', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e6ac00'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFBF00'; }}
                  >
                    Invitar
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlayerSearchPage;