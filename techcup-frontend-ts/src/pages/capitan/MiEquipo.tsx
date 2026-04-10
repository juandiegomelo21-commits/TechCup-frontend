import { useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./MiEquipo.module.css";

const players = [
  { name: "Carlos Martínez", position: "PORTERO",        jersey: 1,  color: "#9B59B6" },
  { name: "Luis Hernández",  position: "CENTRAL",         jersey: 4,  color: "#9B59B6" },
  { name: "Pedro Sánchez",   position: "CENTRAL",         jersey: 5,  color: "#9B59B6" },
  { name: "Miguel Ángel",    position: "LATERAL",         jersey: 2,  color: "#4A90D9" },
  { name: "Javier López",    position: "LATERAL",         jersey: 3,  color: "#4A90D9" },
  { name: "Antonio García",  position: "Medio Campista",  jersey: 6,  color: "#2ECC71" },
  { name: "David Ruiz",      position: "INTERIOR",        jersey: 8,  color: "#2ECC71" },
];

// Tactical positions [top%, left%]
const fieldPositions: Record<number, [number, number]> = {
  1:  [82, 47],  // Portero
  2:  [65, 20],  // D Lateral IZQ
  4:  [65, 38],  // D Central
  5:  [65, 57],  // D Central
  3:  [65, 75],  // D Lateral DER
  6:  [44, 47],  // Medio Campista
  8:  [30, 28],  // Interior IZQ
  10: [30, 67],  // Interior DER
  7:  [18, 47],  // M Punta
  9:  [8,  30],  // Delantero
  11: [8,  65],  // Delantero
};

const positionLabels: Record<number, string> = {
  1: "PORTERO", 2: "D LATERAL IZQ", 3: "D LATERAL DER",
  4: "D CENTRAL", 5: "D CENTRAL", 6: "MEDIO CAMPISTA",
  7: "M. PUNTA", 8: "INTERIOR IZQ", 9: "DELANTERO",
  10: "INTERIOR DER", 11: "DELANTERO",
};

const playerColors: Record<number, string> = {
  1: "#9B59B6", 2: "#4A90D9", 3: "#4A90D9",
  4: "#9B59B6", 5: "#9B59B6", 6: "#2ECC71",
  7: "#F39C12", 8: "#2ECC71", 9: "#E74C3C",
  10: "#2ECC71", 11: "#E74C3C",
};

export function MiEquipo() {
  const [hasTeam, setHasTeam] = useState(false);

  return (
    <DashboardLayout role="CAPITAN">
      <div className={styles.page}>
        {/* Top row: Mercado + Escudo */}
        <div className={styles.topRow}>
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Mercado de jugadores</div>
            <table className={styles.simpleTable}>
              <thead><tr><th>Header</th><th>Header</th></tr></thead>
              <tbody><tr><td>Cell</td><td>Cell</td></tr></tbody>
            </table>
          </div>
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>escudo</div>
            <div className={styles.escudoArea}>
              {hasTeam ? (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5 3.5 9.74 9 11 5.5-1.26 9-6 9-11V7l-9-5z"/>
                </svg>
              ) : (
                <div className={styles.cloudIcon}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                    <circle cx="17" cy="9" r="2" fill="rgba(255,80,80,0.7)" stroke="none"/>
                    <line x1="16" y1="8" x2="18" y2="10" stroke="rgba(255,80,80,0.9)" strokeWidth="1.5"/>
                    <line x1="18" y1="8" x2="16" y2="10" stroke="rgba(255,80,80,0.9)" strokeWidth="1.5"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        {!hasTeam ? (
          <div className={styles.glassCard}>
            <div className={styles.noTeamPill}>NO HAS CREADO UN EQUIPO</div>
            <div className={styles.noTeamBody}>
              <div className={styles.silhouette}>
                ⚽ 🏃 🏃 🏃 🏃
              </div>
              <button className={styles.createBtn} onClick={() => setHasTeam(true)}>
                CREAR EQUIPO
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.bottomRow}>
            {/* Tactical board */}
            <div className={styles.glassCard}>
              <div className={styles.amberHeader}>Pizarra Táctica</div>
              <div className={styles.field}>
                {/* Field markings */}
                <div className={styles.fieldInner}>
                  <div className={styles.centerCircle} />
                  <div className={styles.centerLine} />
                  <div className={styles.penaltyTop} />
                  <div className={styles.penaltyBottom} />
                  {/* Players */}
                  {Object.entries(fieldPositions).map(([num, [top, left]]) => (
                    <div
                      key={num}
                      className={styles.playerDot}
                      style={{ top: `${top}%`, left: `${left}%`, background: playerColors[Number(num)] }}
                    >
                      <span className={styles.dotNum}>{num}</span>
                      <span className={styles.dotPos}>{positionLabels[Number(num)]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Player list */}
            <div className={styles.glassCard}>
              <div className={styles.amberHeader}>Lista de Jugadores</div>
              <div className={styles.playerList}>
                {players.map(p => (
                  <div key={p.jersey} className={styles.playerRow}>
                    <div className={styles.playerAvatar}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 4-8 8-8s8 3.6 8 8"/>
                      </svg>
                    </div>
                    <div className={styles.playerInfo}>
                      <span className={styles.playerName}>{p.name}</span>
                      <span className={styles.playerPos}>{p.position}</span>
                    </div>
                    <span className={styles.jerseyNum} style={{ background: p.color }}>#{p.jersey}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
