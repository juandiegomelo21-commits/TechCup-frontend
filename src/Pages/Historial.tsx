import { useState, useEffect } from "react";
import DashboardLayout from '../Components/layout/DashboardLayout';
import apiClient from '../api/axiosInstance';
import { getPlayerByIdApi } from '../api/playerService';

interface PlayerStats {
  matchesPlayed: number;
  goals: number;
  yellowCards: number;
  redCards: number;
}

function RatingChip({ rating }: { rating: number }) {
  const color = rating >= 8 ? "#4ade80" : rating >= 7.5 ? "#D4AF37" : "#f87171";
  return (
    <span style={{
      display: "inline-block", padding: "3px 11px", borderRadius: "20px",
      background: `${color}14`, color, fontSize: "12px", fontWeight: 700,
      fontFamily: "'Montserrat', sans-serif", border: `1px solid ${color}40`,
    }}>
      {rating.toFixed(1)}
    </span>
  );
}

function HistorialContent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [stats, setStats] = useState<PlayerStats>({ matchesPlayed: 0, goals: 0, yellowCards: 0, redCards: 0 });
  const [playerName, setPlayerName] = useState("—");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) { setLoading(false); return; }
    Promise.all([
      apiClient.get<PlayerStats>(`/api/players/${userId}/stats`).then(r => r.data).catch(() => ({ matchesPlayed: 0, goals: 0, yellowCards: 0, redCards: 0 })),
      getPlayerByIdApi(userId).then(p => p.fullname).catch(() => '—'),
    ]).then(([s, name]) => {
      setStats(s);
      const parts = name.split(' ');
      setPlayerName(parts.length > 1 ? `${parts[parts.length - 1]}, ${parts[0][0]}.` : name);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        .h-root * { box-sizing: border-box; }
        .h-card {
          background: rgba(0,0,0,0.45);
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
          color: rgba(255,255,255,0.5);
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
          color: rgba(255,255,255,0.6);
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.18s;
        }
        .h-filter-btn:hover, .h-filter-btn.active {
          background: rgba(212,175,55,0.15);
          border-color: rgba(212,175,55,0.5);
          color: #FFD700;
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
        .h-result-pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 11px; }
        .h-result-pill.win  { background: rgba(74,222,128,0.12); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
        .h-result-pill.loss { background: rgba(248,113,113,0.12); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }
      `}</style>

      <div className="h-root" style={{
        padding: "28px 24px", fontFamily: "'Montserrat', sans-serif",
        color: "#fff", maxWidth: "1080px", margin: "0 auto",
      }}>

        {/* Page title */}
        <div style={{ marginBottom: "26px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "4px", height: "24px", borderRadius: "2px", background: "#D4AF37", flexShrink: 0 }} />
          <div>
            <h1 style={{ fontWeight: 800, fontSize: "22px", letterSpacing: "2.5px", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
              Historial de Jugador
            </h1>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginTop: "5px", letterSpacing: "1.5px", fontWeight: 600, textTransform: "uppercase" }}>
              Registro completo de tu trayectoria
            </p>
          </div>
        </div>

        {/* Player card */}
        <div className="h-card" style={{ marginBottom: "16px", padding: "22px 26px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(212,175,55,0.1)", border: "2px solid rgba(212,175,55,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "21px", letterSpacing: "0.5px" }}>
                  {loading ? '...' : playerName}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "5px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
                    Partidos jugados
                  </span>
                  <span style={{ fontWeight: 800, fontSize: "18px", color: "#D4AF37" }}>{stats.matchesPlayed}</span>
                </div>
              </div>
            </div>

            {/* Stats badges */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { label: "Partidos", value: String(stats.matchesPlayed) },
                { label: "Goles", value: String(stats.goals) },
                { label: "T. Amarillas", value: String(stats.yellowCards) },
                { label: "T. Rojas", value: String(stats.redCards) },
              ].map(b => (
                <div key={b.label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.22)",
                  borderRadius: "12px", padding: "16px 20px", minWidth: "80px",
                }}>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#D4AF37", fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>
                    {b.value}
                  </span>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", fontFamily: "'Montserrat', sans-serif", marginTop: "6px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700, textAlign: "center" }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two columns */}
        <div className="grid-2col" style={{ marginBottom: "16px" }}>

          {/* Equipos */}
          <div className="h-card">
            <div className="h-card-header">
              <span className="h-section-title">Equipos y Permanencia</span>
            </div>
            <div style={{ padding: "32px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>🏟️</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", fontFamily: "'Montserrat', sans-serif", margin: 0 }}>
                Sin historial de equipos disponible aún
              </p>
            </div>
          </div>

          {/* Torneos */}
          <div className="h-card">
            <div className="h-card-header">
              <span className="h-section-title">Participación en Torneos</span>
            </div>
            <div style={{ padding: "32px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>🏆</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", fontFamily: "'Montserrat', sans-serif", margin: 0 }}>
                Sin torneos completados aún
              </p>
            </div>
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

          <div style={{ padding: "48px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚽</div>
            Sin partidos registrados aún
          </div>
        </div>

      </div>
    </>
  );
}

export default function Historial() {
  return (
    <DashboardLayout>
      <HistorialContent />
    </DashboardLayout>
  );
}
