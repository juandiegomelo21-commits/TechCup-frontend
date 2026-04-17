import { useState } from "react";
import DashboardLayout from '../Components/layout/DashboardLayout';


// ─── Types ────────────────────────────────────────────────────────────────────

interface Badge {
  label: string;
  value: string;
}

interface Team {
  name: string;
  logo: string;
  period: string;
  matches: number;
}

interface Tournament {
  name: string;
  team: string;
  teamLogo: string;
  position: number | null;
  matches: number;
}

interface Match {
  date: string;
  tournament: string;
  rival: string;
  result: string;
  win: boolean;
  minutesPlayed: number;
  rating: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const BADGES: Badge[] = [
  { label: "Partidos", value: "100" },
  { label: "Goles",    value: "50"  },
];

const TEAMS: Team[] = [
  { name: "Real Madrid FC",  logo: "⚪", period: "20/04/2026", matches: 12 },
  { name: "Barcelona SC",    logo: "🔵", period: "03/04/2026", matches: 10 },
  { name: "Atlético United", logo: "🔴", period: "30/03/2026", matches: 10 },
  { name: "Deportivo FC",    logo: "🟢", period: "30/03/2026", matches: 10 },
];

const TOURNAMENTS: Tournament[] = [
  { name: "Copa TechUp 2025", team: "Real Madrid", teamLogo: "⚪", position: 1,    matches: 10 },
  { name: "Copa TechUp 2025", team: "Barcelona SC", teamLogo: "🔵", position: 1,    matches: 10 },
  { name: "Copa TechUp 2025", team: "Milan AC",     teamLogo: "🔴", position: 2,    matches: 10 },
  { name: "Copa TechUp 2025", team: "Santiago FC",  teamLogo: "🟡", position: null, matches: 3  },
];

const MATCHES: Match[] = [
  { date: "16/04/2026", tournament: "Copa TechUp 2025", rival: "Real Madrid", result: "1 - 0", win: true,  minutesPlayed: 10, rating: 7.8 },
  { date: "16/04/2026", tournament: "Copa TechUp 2025", rival: "Atlético FC", result: "0 - 1", win: false, minutesPlayed: 10, rating: 7.9 },
  { date: "16/04/2026", tournament: "Copa TechUp 2025", rival: "Belgium",     result: "1 - 2", win: true,  minutesPlayed: 10, rating: 7.8 },
  { date: "15/04/2026", tournament: "Copa TechUp 2025", rival: "Milan AC",    result: "0 - 1", win: false, minutesPlayed: 10, rating: 7.8 },
  { date: "14/04/2026", tournament: "Copa TechUp 2025", rival: "France",      result: "2 - 0", win: true,  minutesPlayed: 10, rating: 8.2 },
  { date: "13/04/2026", tournament: "Copa TechUp 2025", rival: "Germany",     result: "1 - 1", win: false, minutesPlayed: 10, rating: 7.5 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBadge({ label, value }: Badge) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(212,175,55,0.22)",
      borderRadius: "12px",
      padding: "16px 32px",
      minWidth: "100px",
    }}>
      <span style={{
        fontSize: "28px",
        fontWeight: 800,
        color: "#D4AF37",
        fontFamily: "'Montserrat', sans-serif",
        lineHeight: 1,
      }}>
        {value}
      </span>
      <span style={{
        fontSize: "9px",
        color: "rgba(255,255,255,0.6)", // Oscurecido para legibilidad (antes 0.35)
        fontFamily: "'Montserrat', sans-serif",
        marginTop: "6px",
        textTransform: "uppercase",
        letterSpacing: "2.5px",
        fontWeight: 700,
      }}>
        {label}
      </span>
    </div>
  );
}

function RatingChip({ rating }: { rating: number }) {
  const color = rating >= 8 ? "#4ade80" : rating >= 7.5 ? "#D4AF37" : "#f87171";
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 11px",
      borderRadius: "20px",
      background: `${color}14`,
      color,
      fontSize: "12px",
      fontWeight: 700,
      fontFamily: "'Montserrat', sans-serif",
      border: `1px solid ${color}40`,
    }}>
      {rating.toFixed(1)}
    </span>
  );
}

function PositionBadge({ position }: { position: number | null }) {
  if (position === null) {
    return (
      <span style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "rgba(255,255,255,0.3)",
        fontSize: "18px",
        fontWeight: 300,
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: "-1px",
      }}>
        —
      </span>
    );
  }
  const isFirst = position === 1;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "24px",
      height: "24px",
      borderRadius: "6px",
      fontSize: "11px",
      fontWeight: 700,
      fontFamily: "'Montserrat', sans-serif",
      background: isFirst ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.1)",
      color: isFirst ? "#D4AF37" : "rgba(255,255,255,0.7)", // Oscurecido (antes 0.4)
      border: isFirst ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(255,255,255,0.2)",
    }}>
      {position}°
    </span>
  );
}

// ─── Page content ─────────────────────────────────────────────────────────────

function HistorialContent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");

  const filtered = MATCHES.filter(m =>
    (filter === "Todos" || (filter === "Victoria" ? m.win : !m.win)) &&
    (m.rival.toLowerCase().includes(search.toLowerCase()) ||
     m.tournament.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');

        .h-root * { box-sizing: border-box; }

        .h-card {
          background: rgba(0,0,0,0.45); /* Un poco más oscuro para el fondo */
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          overflow: hidden;
        }

        .h-card-header {
          background: rgba(212,175,55,0.1);
          border-bottom: 1px solid rgba(212,175,55,0.2);
          padding: 13px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .h-section-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #D4AF37;
        }

        .h-col-head {
          display: grid;
          padding: 9px 20px;
          background: rgba(0,0,0,0.2);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .h-col-head span {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5); /* Texto de cabecera más visible */
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }

        .h-row {
          display: grid;
          padding: 13px 20px;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.15s;
        }

        .h-row:last-child { border-bottom: none; }
        .h-row:hover { background: rgba(212,175,55,0.06); }

        .h-filter-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 7px;
          padding: 6px 12px;
          color: rgba(255,255,255,0.6); /* Botones inactivos más claros */
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.18s;
        }

        .h-filter-btn:hover,
        .h-filter-btn.active {
          background: rgba(212,175,55,0.15);
          border-color: rgba(212,175,55,0.5);
          color: #FFD700; /* Dorado más brillante para el activo */
        }

        .h-search {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 6px 12px;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          outline: none;
          width: 180px;
          transition: border-color 0.2s;
        }
        .h-search::placeholder { color: rgba(255,255,255,0.4); }
        .h-search:focus { border-color: rgba(212,175,55,0.5); }

        .h-result-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 20px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 11px;
        }
        .h-result-pill.win  { background: rgba(74,222,128,0.12); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
        .h-result-pill.loss { background: rgba(248,113,113,0.12); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }
      `}</style>

      <div className="h-root" style={{
        padding: "28px 24px",
        fontFamily: "'Montserrat', sans-serif",
        color: "#fff",
        maxWidth: "1080px",
        margin: "0 auto",
      }}>

        {/* Page title */}
        <div style={{ marginBottom: "26px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "4px", height: "24px", borderRadius: "2px", background: "#D4AF37", flexShrink: 0 }} />
          <div>
            <h1 style={{
              fontWeight: 800, fontSize: "22px", letterSpacing: "2.5px",
              textTransform: "uppercase", lineHeight: 1, margin: 0,
            }}>
              Historial de Jugador
            </h1>
            <p style={{
              fontSize: "11px", color: "rgba(255,255,255,0.6)", marginTop: "5px",
              letterSpacing: "1.5px", fontWeight: 600, textTransform: "uppercase",
            }}>
              Registro completo de tu trayectoria
            </p>
          </div>
        </div>

        {/* Player card */}
        <div className="h-card" style={{ marginBottom: "16px", padding: "22px 26px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>

            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(212,175,55,0.1)",
                border: "2px solid rgba(212,175,55,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "21px", letterSpacing: "0.5px" }}>Mendoza, C.</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "5px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
                    Career Rating
                  </span>
                  <span style={{ fontWeight: 800, fontSize: "18px", color: "#D4AF37" }}>8.5</span>
                </div>
              </div>
            </div>

            {/* Badges — solo Partidos y Goles */}
            <div style={{ display: "flex", gap: "10px" }}>
              {BADGES.map(b => <StatBadge key={b.label} {...b} />)}
            </div>
          </div>
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

          {/* Equipos */}
          <div className="h-card">
            <div className="h-card-header">
              <span className="h-section-title">Equipos y Permanencia</span>
            </div>
            <div className="h-col-head" style={{ gridTemplateColumns: "1fr 100px 44px" }}>
              <span>Equipo</span>
              <span>Período</span>
              <span style={{ textAlign: "right" }}>PJ</span>
            </div>
            {TEAMS.map((t, i) => (
              <div className="h-row" key={i} style={{ gridTemplateColumns: "1fr 100px 44px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "6px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "14px",
                  }}>{t.logo}</div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{t.name}</span>
                </div>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{t.period}</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.8)", textAlign: "right" }}>{t.matches}</span>
              </div>
            ))}
          </div>

          {/* Torneos */}
          <div className="h-card">
            <div className="h-card-header">
              <span className="h-section-title">Participación Reciente en Torneos</span>
            </div>
            <div className="h-col-head" style={{ gridTemplateColumns: "1fr 110px 44px 44px" }}>
              <span>Torneo</span>
              <span>Equipo</span>
              <span style={{ textAlign: "center" }}>Pos.</span>
              <span style={{ textAlign: "right" }}>PJ</span>
            </div>
            {TOURNAMENTS.map((t, i) => (
              <div className="h-row" key={i} style={{ gridTemplateColumns: "1fr 110px 44px 44px" }}>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{t.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px" }}>{t.teamLogo}</span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{t.team}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PositionBadge position={t.position} />
                </div>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textAlign: "right", fontWeight: 600 }}>{t.matches}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Match log */}
        <div className="h-card">
          <div className="h-card-header">
            <span className="h-section-title">Registro Detallado de Partidos</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              {["Todos", "Victoria", "Derrota"].map(f => (
                <button
                  key={f}
                  className={`h-filter-btn${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
              <input
                className="h-search"
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="h-col-head" style={{ gridTemplateColumns: "100px 165px 1fr 100px 70px 75px" }}>
            <span>Fecha</span>
            <span>Torneo</span>
            <span>Rival</span>
            <span>Resultado</span>
            <span style={{ textAlign: "center" }}>Min.</span>
            <span style={{ textAlign: "right" }}>Rating</span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 600 }}>
              No se encontraron resultados
            </div>
          ) : filtered.map((m, i) => (
            <div className="h-row" key={i} style={{ gridTemplateColumns: "100px 165px 1fr 100px 70px 75px" }}>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{m.date}</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{m.tournament}</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{m.rival}</span>
              <div style={{ display: "flex" }}>
                <span className={`h-result-pill ${m.win ? "win" : "loss"}`}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor", display: "inline-block", flexShrink: 0 }} />
                  {m.result}
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textAlign: "center", fontWeight: 600 }}>
                {m.minutesPlayed}'
              </span>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <RatingChip rating={m.rating} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function Historial() {
  return (
    <DashboardLayout>
      <HistorialContent />
    </DashboardLayout>
  );
}