import { Link } from "react-router-dom";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./DashboardJugador.module.css";

const invitations = [
  { id: 1, team: "Los Tigres FC",    captain: "Carlos Rodríguez",  date: "2026-04-08", status: "pendiente" as const },
  { id: 2, team: "Águilas Doradas",  captain: "Pedro Martínez",    date: "2026-04-07", status: "pendiente" as const },
  { id: 3, team: "Real Universitario",captain: "Andrés López",     date: "2026-04-06", status: "aceptada"  as const },
  { id: 4, team: "Deportivo Central",captain: "Jorge Suárez",      date: "2026-04-05", status: "rechazada" as const },
];

const stats = [
  { label: "Partidos Jugados", value: "0",          color: "var(--color-amber)" },
  { label: "Goles",            value: "0",          color: "#2ECC71" },
  { label: "Asistencias",      value: "0",          color: "#4A90D9" },
];

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  pendiente: { bg: "rgba(240,177,0,0.2)",  color: "#f0b100",  label: "Pendiente" },
  aceptada:  { bg: "rgba(0,201,80,0.2)",   color: "#00c950",  label: "Aceptada"  },
  rechazada: { bg: "rgba(106,114,130,0.2)",color: "#9ca3af",  label: "Rechazada" },
};

export function DashboardJugador() {
  return (
    <DashboardLayout role="JUGADOR">
      <div className={styles.page}>
        {/* Top row */}
        <div className={styles.topRow}>
          {/* Team summary */}
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Resumen del Equipo</div>
            <div className={styles.teamBody}>
              <div className={styles.shieldWrap}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5 3.5 9.74 9 11 5.5-1.26 9-6 9-11V7l-9-5z"/>
                </svg>
                <span className={styles.rolePill}>Jugador</span>
              </div>
              <div className={styles.teamStats}>
                <div className={styles.teamStatRow}>
                  <span className={styles.teamStatLabel}>Estado del Equipo</span>
                  <span className={styles.teamStatValue} style={{ color: "#9ca3af" }}>Sin equipo</span>
                </div>
                <div className={styles.progressWrap}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: "0%" }} />
                  </div>
                </div>
                <span className={styles.teamStatSub}>Espera una invitación o contacta a un capitán</span>
              </div>
            </div>
          </div>

          {/* Perfil + Stats shortcut */}
          <Link to="/jugador/perfil" className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <span className={styles.profileTitle}>Perfil</span>
            </div>
            <div className={styles.profileAvatar}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 4-8 8-8s8 3.6 8 8"/>
              </svg>
            </div>
            <div className={styles.profileFooter}>
              <span className={styles.profileTitle}>Tus Estadísticas</span>
            </div>
          </Link>
        </div>

        {/* Bottom row */}
        <div className={styles.bottomRow}>
          {/* Invitations received */}
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Invitaciones Recibidas</div>
            <div className={styles.inviteList}>
              {invitations.map(inv => {
                const s = statusStyle[inv.status];
                return (
                  <div key={inv.id} className={styles.inviteRow}>
                    <div className={styles.inviteInfo}>
                      <span className={styles.inviteTeam}>{inv.team}</span>
                      <span className={styles.inviteCapt}>Capitán: {inv.captain}</span>
                      <span className={styles.inviteDate}>{inv.date}</span>
                    </div>
                    <div className={styles.inviteActions}>
                      <span className={styles.statusPill} style={{ background: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                      {inv.status === "pendiente" && (
                        <div className={styles.inviteBtns}>
                          <button className={styles.acceptBtn}>Aceptar</button>
                          <button className={styles.rejectBtn}>Rechazar</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Mis Estadísticas</div>
            <div className={styles.statsGrid}>
              {stats.map(s => (
                <div key={s.label} className={styles.statCard} style={{ borderColor: s.color + "44" }}>
                  <span className={styles.statNum} style={{ color: s.color }}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.divider} />
            <div className={styles.availBox}>
              <span className={styles.availLabel}>Disponibilidad</span>
              <Link to="/jugador/perfil" className={styles.availLink}>
                <span className={styles.availDot} />
                Disponible · Cambiar en Perfil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
