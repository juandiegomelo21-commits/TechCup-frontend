import { useState, useMemo } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./MercadoJugadores.module.css";

interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  sex: "M" | "F";
  semester: number;
  available: boolean;
}

const ALL_PLAYERS: Player[] = [
  { id: 1,  name: "Jenny Wilson",    age: 21, position: "Portero",        sex: "F", semester: 4,  available: true  },
  { id: 2,  name: "Jane Cooper",     age: 22, position: "Central",         sex: "F", semester: 6,  available: true  },
  { id: 3,  name: "Maria Natalia",   age: 20, position: "Lateral",         sex: "F", semester: 3,  available: true  },
  { id: 4,  name: "Wade Warren",     age: 23, position: "Mediocampista",   sex: "M", semester: 7,  available: true  },
  { id: 5,  name: "Courtney Henry",  age: 21, position: "Delantero",       sex: "F", semester: 5,  available: true  },
  { id: 6,  name: "Daniel Austin",   age: 22, position: "Central",         sex: "M", semester: 8,  available: true  },
  { id: 7,  name: "Kathryn Murphy",  age: 20, position: "Mediocampista",   sex: "F", semester: 2,  available: false },
  { id: 8,  name: "Eleanor Pena",    age: 24, position: "Delantero",       sex: "F", semester: 9,  available: true  },
  { id: 9,  name: "Robert Fox",      age: 21, position: "Portero",         sex: "M", semester: 4,  available: true  },
  { id: 10, name: "Jacob Jones",     age: 23, position: "Lateral",         sex: "M", semester: 6,  available: true  },
  { id: 11, name: "Kristin Watson",  age: 20, position: "Mediocampista",   sex: "F", semester: 1,  available: false },
  { id: 12, name: "Cameron Diaz",    age: 22, position: "Delantero",       sex: "M", semester: 5,  available: true  },
];

const POSITIONS = ["Todas", "Portero", "Central", "Lateral", "Mediocampista", "Delantero"];
const SEMESTERS = ["Todos", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const SEXES = ["Todos", "Masculino", "Femenino"];

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 4-8 8-8s8 3.6 8 8"/>
    </svg>
  );
}

export function MercadoJugadores() {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [position, setPosition] = useState("Todas");
  const [semester, setSemester] = useState("Todos");
  const [sex, setSex] = useState("Todos");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [invited, setInvited] = useState<Set<number>>(new Set());
  const [confirm, setConfirm] = useState<Player | null>(null);

  const filtered = useMemo(() => {
    return ALL_PLAYERS.filter(p => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (position !== "Todas" && p.position !== position) return false;
      if (semester !== "Todos" && p.semester !== Number(semester)) return false;
      if (sex === "Masculino" && p.sex !== "M") return false;
      if (sex === "Femenino" && p.sex !== "F") return false;
      if (onlyAvailable && !p.available) return false;
      return true;
    });
  }, [query, position, semester, sex, onlyAvailable]);

  function confirmInvite(player: Player) {
    if (invited.has(player.id)) return;
    setConfirm(player);
  }

  function doInvite() {
    if (!confirm) return;
    setInvited(prev => new Set(prev).add(confirm.id));
    setConfirm(null);
  }

  const activeFilters = [
    position !== "Todas",
    semester !== "Todos",
    sex !== "Todos",
    onlyAvailable,
  ].filter(Boolean).length;

  return (
    <DashboardLayout role="CAPITAN">
      <div className={styles.page}>
        {/* Confirmation modal */}
        {confirm && (
          <div className={styles.overlay} onClick={() => setConfirm(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalAvatar}>
                <UserIcon />
              </div>
              <h3 className={styles.modalTitle}>Enviar invitación</h3>
              <p className={styles.modalBody}>
                ¿Deseas invitar a <strong>{confirm.name}</strong> a unirse a tu equipo?
              </p>
              <p className={styles.modalMeta}>
                {confirm.position} · {confirm.sex === "M" ? "Masculino" : "Femenino"} · Sem. {confirm.semester}
              </p>
              <div className={styles.modalActions}>
                <button className={styles.modalCancel} onClick={() => setConfirm(null)}>Cancelar</button>
                <button className={styles.modalConfirm} onClick={doInvite}>Enviar invitación</button>
              </div>
            </div>
          </div>
        )}
        <div className={styles.card}>
          {/* Search bar row */}
          <div className={styles.searchRow}>
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className={styles.searchInput}
                placeholder="Busca jugadores para tu equipo"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button className={styles.searchBtn} aria-label="Buscar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a3020" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>

            <div className={styles.filterWrap}>
              <button
                className={`${styles.filterBtn} ${filterOpen ? styles.filterBtnActive : ""}`}
                onClick={() => setFilterOpen(o => !o)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Filtros
                {activeFilters > 0 && <span className={styles.filterBadge}>{activeFilters}</span>}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ transform: filterOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {filterOpen && (
                <div className={styles.filterDropdown}>
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Posición</label>
                    <div className={styles.filterPills}>
                      {POSITIONS.map(p => (
                        <button
                          key={p}
                          className={`${styles.pill} ${position === p ? styles.pillActive : ""}`}
                          onClick={() => setPosition(p)}
                        >{p}</button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Semestre</label>
                    <div className={styles.filterPills}>
                      {SEMESTERS.map(s => (
                        <button
                          key={s}
                          className={`${styles.pill} ${semester === s ? styles.pillActive : ""}`}
                          onClick={() => setSemester(s)}
                        >{s}</button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Sexo</label>
                    <div className={styles.filterPills}>
                      {SEXES.map(s => (
                        <button
                          key={s}
                          className={`${styles.pill} ${sex === s ? styles.pillActive : ""}`}
                          onClick={() => setSex(s)}
                        >{s}</button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.filterGroup}>
                    <label className={styles.filterCheckRow}>
                      <input
                        type="checkbox"
                        className={styles.filterCheck}
                        checked={onlyAvailable}
                        onChange={e => setOnlyAvailable(e.target.checked)}
                      />
                      Solo disponibles
                    </label>
                  </div>
                  <button
                    className={styles.clearBtn}
                    onClick={() => { setPosition("Todas"); setSemester("Todos"); setSex("Todos"); setOnlyAvailable(false); }}
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results count */}
          <p className={styles.resultsCount}>{filtered.length} jugadores encontrados</p>

          {/* Player grid */}
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>No se encontraron jugadores con esos filtros.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(player => {
                const isInvited = invited.has(player.id);
                return (
                  <div key={player.id} className={styles.playerCard}>
                    <div className={styles.playerAvatar}>
                      <UserIcon />
                    </div>
                    <div className={styles.playerInfo}>
                      <span className={styles.playerName}>{player.name}</span>
                      <span className={styles.playerMeta}>
                        {player.age} años · {player.position} · {player.sex === "M" ? "Masc." : "Fem."} · Sem. {player.semester}
                      </span>
                      {!player.available && (
                        <span className={styles.unavailablePill}>No disponible</span>
                      )}
                    </div>
                    <button
                      className={`${styles.inviteBtn} ${isInvited ? styles.inviteBtnSent : ""}`}
                      onClick={() => confirmInvite(player)}
                      title={isInvited ? "Invitación enviada" : "Enviar invitación"}
                      disabled={!player.available || isInvited}
                    >
                      <SendIcon />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
