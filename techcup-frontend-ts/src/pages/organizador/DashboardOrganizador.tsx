import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./DashboardOrganizador.module.css";

const quickActions = [
  { icon: "+", label: "Crear Torneo" },
  { icon: "⚙", label: "Configurar Reglas" },
  { icon: "▶", label: "Iniciar Jornada" },
  { icon: "✓", label: "Finalizar Torneo" },
];

const equipos = [
  { initials: "FC", color: "#4A90D9", nombre: "FC Barcelona Universitario", capitan: "Carlos Martínez", jugadores: "18/22" },
  { initials: "RM", color: "#2ECC71", nombre: "Real Madrid Académico",       capitan: "Ana López",      jugadores: "20/22" },
  { initials: "AM", color: "#E74C3C", nombre: "Atlético Madrid Campus",      capitan: "Diego Fernández",jugadores: "15/22" },
  { initials: "SE", color: "#9B59B6", nombre: "Sevilla FC Estudiantil",      capitan: "María Sánchez",  jugadores: "19/22" },
  { initials: "VL", color: "#E67E22", nombre: "Valencia CF Universidad",     capitan: "Javier Gómez",   jugadores: "17/22" },
  { initials: "BT", color: "#8E44AD", nombre: "Real Betis Académico",        capitan: "Laura Rodríguez",jugadores: "21/22" },
];

export function DashboardOrganizador() {
  return (
    <DashboardLayout role="ORGANIZADOR">
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Copa Universitaria 2026</h1>
          <span className={styles.phaseBadge}>FASE DE GRUPOS</span>
          <div className={styles.perfilBtn}>Perfil</div>
        </div>

        {/* Quick access */}
        <div className={styles.glassCard}>
          <h2 className={styles.sectionTitle}>Accesos Rápidos</h2>
          <div className={styles.quickGrid}>
            {quickActions.map(a => (
              <button key={a.label} className={styles.quickCard}>
                <span className={styles.quickIcon}>{a.icon}</span>
                <span className={styles.quickLabel}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Teams table */}
        <div className={styles.glassCard}>
          <h2 className={styles.sectionTitle}>Equipos Inscritos</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Escudo</th>
                <th>Nombre del Equipo</th>
                <th>Capitán</th>
                <th>Jugadores</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map(e => (
                <tr key={e.nombre}>
                  <td>
                    <span className={styles.shield} style={{ background: e.color }}>{e.initials}</span>
                  </td>
                  <td>{e.nombre}</td>
                  <td>{e.capitan}</td>
                  <td>{e.jugadores}</td>
                  <td>
                    <button className={styles.detailBtn}>Ver Detalles</button>
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
