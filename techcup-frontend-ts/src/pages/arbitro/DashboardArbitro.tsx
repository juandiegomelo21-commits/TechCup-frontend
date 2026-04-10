import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./DashboardArbitro.module.css";

const partidos = [
  { local: "Real Madrid FC",    visitante: "Barcelona FC",       fecha: "Lunes 7 Abril",  hora: "14:00", cancha: "Cancha 1", accion: "Iniciar Acta" },
  { local: "Manchester United", visitante: "Liverpool FC",        fecha: "Lunes 7 Abril",  hora: "16:30", cancha: "Cancha 2", accion: "Cargar Resultado" },
  { local: "Bayern Munich",     visitante: "Borussia Dortmund",   fecha: "Martes 8 Abril", hora: "18:00", cancha: "Cancha 3", accion: "Iniciar Acta" },
];

export function DashboardArbitro() {
  return (
    <DashboardLayout role="ARBITRO">
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Panel del Árbitro</h1>
          <span className={styles.phaseBadge}>Jornada 5 - Activa</span>
        </div>

        {/* Top row */}
        <div className={styles.topRow}>
          {/* Stats */}
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Tus Estadísticas</div>
            <table className={styles.simpleTable}>
              <thead><tr><th>Header</th><th>Header</th></tr></thead>
              <tbody><tr><td>Cell</td><td>Cell</td></tr></tbody>
            </table>
          </div>

          {/* Perfil */}
          <div className={styles.glassCard}>
            <div className={styles.amberHeader}>Perfil</div>
            <div className={styles.avatarPlaceholder}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                <circle cx="12" cy="8" r="4.5"/>
                <path d="M3 20c0-4.4 4-8 9-8s9 3.6 9 8"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Counter bar */}
        <div className={styles.counterBar}>
          <div className={styles.counterItem}>
            <span className={styles.counterNum}>3</span>
            <span className={styles.counterLabel}>Partidos hoy</span>
          </div>
          <div className={styles.counterDivider} />
          <div className={styles.counterItem}>
            <span className={styles.counterNum}>14:00</span>
            <span className={styles.counterLabel}>Siguiente silbatazo</span>
          </div>
        </div>

        {/* Partidos */}
        <div className={styles.glassCard}>
          <h2 className={styles.sectionTitle}>Mis Partidos Asignados</h2>
          <table className={styles.table}>
            <tbody>
              {partidos.map((p, i) => (
                <tr key={i}>
                  <td className={styles.matchName}>
                    {p.local} <span className={styles.vs}>vs</span> {p.visitante}
                  </td>
                  <td className={styles.matchMeta}>
                    <span>{p.fecha}</span>
                    <span>{p.hora}</span>
                  </td>
                  <td>{p.cancha}</td>
                  <td>
                    <button className={styles.actionBtn}>{p.accion}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
