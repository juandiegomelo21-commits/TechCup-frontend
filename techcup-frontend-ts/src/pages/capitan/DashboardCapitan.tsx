import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./DashboardCapitan.module.css";

const jugadores = [
  { nombre: "Carlos Mendoza",  posicion: "Delantero",      edad: 24 },
  { nombre: "Ana Rodríguez",   posicion: "Defensa",        edad: 22 },
  { nombre: "Luis García",     posicion: "Mediocampista",  edad: 26 },
  { nombre: "María López",     posicion: "Portera",        edad: 23 },
  { nombre: "Jorge Martínez",  posicion: "Delantero",      edad: 25 },
  { nombre: "Sofía Torres",    posicion: "Mediocampista",  edad: 21 },
];

const invitaciones = [
  { nombre: "Pedro Sánchez",  fecha: "2026-04-05", estado: "Aceptada",  color: "#2ECC71" },
  { nombre: "Laura Díaz",     fecha: "2026-04-04", estado: "Pendiente", color: "#FFBF00" },
  { nombre: "Miguel Ruiz",    fecha: "2026-04-03", estado: "Aceptada",  color: "#2ECC71" },
  { nombre: "Carmen Vega",    fecha: "2026-04-02", estado: "Rechazada", color: "#8E44AD" },
  { nombre: "Roberto Castro", fecha: "2026-04-01", estado: "Pendiente", color: "#FFBF00" },
  { nombre: "Isabel Moreno",  fecha: "2026-03-31", estado: "Aceptada",  color: "#2ECC71" },
];

export function DashboardCapitan() {
  return (
    <DashboardLayout role="CAPITAN">
      <div className={styles.page}>
        {/* Top row */}
        <div className={styles.topRow}>
          {/* Team summary */}
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Resumen del Equipo</div>
            <div className={styles.teamSummary}>
              <div className={styles.shieldWrap}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5 3.5 9.74 9 11 5.5-1.26 9-6 9-11V7l-9-5z"/>
                </svg>
                <span className={styles.captainLabel}>Capitán</span>
              </div>
              <div className={styles.teamStats}>
                <p className={styles.statLabel}>Jugadores Inscritos</p>
                <p className={styles.statNum}>
                  12 / <span className={styles.statTotal}>20</span>
                </p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: "60%" }} />
                </div>
                <p className={styles.statSub}>8 espacios disponibles</p>
              </div>
            </div>
          </div>

          {/* Perfil + Estadísticas */}
          <div className={styles.rightCol}>
            <div className={styles.glassCard}>
              <div className={styles.amberHeader}>Perfil</div>
              <div className={styles.avatarPlaceholder}>
                <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                  <circle cx="12" cy="8" r="4.5"/>
                  <path d="M3 20c0-4.4 4-8 9-8s9 3.6 9 8"/>
                </svg>
              </div>
            </div>
            <div className={styles.glassCard}>
              <div className={styles.amberHeader}>Tus Estadísticas</div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className={styles.bottomRow}>
          {/* Search players */}
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Buscar Jugadores Disponibles</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Posición</th>
                  <th>Edad</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {jugadores.map(j => (
                  <tr key={j.nombre}>
                    <td>{j.nombre}</td>
                    <td>{j.posicion}</td>
                    <td>{j.edad}</td>
                    <td><button className={styles.inviteBtn}>Invitar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invitations */}
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Invitaciones Enviadas</div>
            <div className={styles.invitationList}>
              {invitaciones.map(inv => (
                <div key={inv.nombre} className={styles.invitationItem}>
                  <div>
                    <p className={styles.invName}>{inv.nombre}</p>
                    <p className={styles.invDate}>{inv.fecha}</p>
                  </div>
                  <span className={styles.statusBadge} style={{ background: inv.color }}>
                    {inv.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
