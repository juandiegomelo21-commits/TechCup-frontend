import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./DashboardAdmin.module.css";

const standings = [
  { pos: 1, team: "Real Madrid FC",    pj: 10, g: 8, e: 1, p: 1 },
  { pos: 2, team: "Barcelona SC",      pj: 10, g: 7, e: 2, p: 1 },
  { pos: 3, team: "Atlético United",   pj: 10, g: 6, e: 3, p: 1 },
  { pos: 4, team: "Deportivo FC",      pj: 10, g: 5, e: 3, p: 2 },
  { pos: 5, team: "Juventus FC",       pj: 10, g: 4, e: 2, p: 4 },
  { pos: 6, team: "Milan AC",          pj: 10, g: 3, e: 3, p: 4 },
];

export function DashboardAdmin() {
  return (
    <DashboardLayout role="ADMIN">
      <div className={styles.page}>
        {/* Top row */}
        <div className={styles.topRow}>
          {/* Stats */}
          <div className={styles.glassCard}>
            <div className={styles.sectionHeader}>Tus Estadísticas</div>
            <table className={styles.simpleTable}>
              <thead>
                <tr><th>Header</th><th>Header</th></tr>
              </thead>
              <tbody>
                <tr><td>Cell</td><td>Cell</td></tr>
              </tbody>
            </table>
          </div>

          {/* Perfil */}
          <div className={styles.glassCard}>
            <div className={styles.sectionHeader}>Perfil</div>
            <div className={styles.avatarPlaceholder}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Tabla de posiciones */}
        <div className={styles.glassCard}>
          <div className={styles.cardTitle}>
            <span className={styles.trophyIcon}>🏆</span>
            Tabla de Posiciones
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>G</th>
                <th>E</th>
                <th>P</th>
              </tr>
            </thead>
            <tbody>
              {standings.map(row => (
                <tr key={row.pos}>
                  <td>
                    <span className={styles.posBadge}>{row.pos}</span>
                  </td>
                  <td>{row.team}</td>
                  <td>{row.pj}</td>
                  <td>{row.g}</td>
                  <td>{row.e}</td>
                  <td>{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.cardActions}>
            <button className={styles.cancelBtn}>Cancelar</button>
            <button className={styles.confirmBtn}>Confirmar →</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
