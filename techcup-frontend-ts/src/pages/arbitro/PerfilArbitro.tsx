import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./PerfilArbitro.module.css";

export function PerfilArbitro() {
  return (
    <DashboardLayout role="ARBITRO">
      <div className={styles.page}>
        <div className={styles.profileCard}>
          {/* Amber header */}
          <div className={styles.header}>
            <div className={styles.avatar}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 4-8 8-8s8 3.6 8 8"/>
              </svg>
            </div>
            <div className={styles.headerInfo}>
              <h1 className={styles.name}>María González</h1>
              <span className={styles.roleBadge}>Referee</span>
            </div>
            <button className={styles.editBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Editar Perfil
            </button>
          </div>

          {/* Body */}
          <div className={styles.body}>
            {/* Información Personal */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Información Personal
              </h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>FULL NAME</span>
                  <span className={styles.fieldValue}>María González</span>
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>NATIONAL ID</span>
                  <span className={styles.fieldValue}>
                    <span style={{ color: "var(--color-amber)", marginRight: "0.25rem" }}>#</span>
                    0987654321
                  </span>
                </div>
                <div className={styles.infoField} style={{ gridColumn: "1 / -1" }}>
                  <span className={styles.fieldLabel}>EMAIL ADDRESS</span>
                  <span className={styles.fieldValue}>
                    <span style={{ marginRight: "0.4rem", opacity: 0.6 }}>✉</span>
                    maria.gonzalez@referee-association.org
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Referee Credentials */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="2">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
                </svg>
                Referee Credentials
              </h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>LICENSE NUMBER</span>
                  <span className={styles.fieldValue}>
                    <span style={{ color: "var(--color-amber)", marginRight: "0.25rem" }}>#</span>
                    REF-2024-0456
                  </span>
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>YEARS OF EXPERIENCE</span>
                  <span className={styles.fieldValue}>
                    <span style={{ marginRight: "0.3rem", opacity: 0.6 }}>📅</span>
                    8 years
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.statsRow}>
              <div className={styles.statCard} style={{ background: "rgba(255,191,0,0.15)", border: "1px solid rgba(255,191,0,0.3)" }}>
                <p className={styles.statMain} style={{ color: "var(--color-amber)" }}>Certified</p>
                <p className={styles.statSub} style={{ color: "var(--color-amber)" }}>Status</p>
              </div>
              <div className={styles.statCard} style={{ background: "rgba(74,144,217,0.15)", border: "1px solid rgba(74,144,217,0.3)" }}>
                <p className={styles.statNum} style={{ color: "#4A90D9" }}>0</p>
                <p className={styles.statSub} style={{ color: "#4A90D9" }}>Matches Officiated</p>
              </div>
              <div className={styles.statCard} style={{ background: "rgba(46,204,113,0.15)", border: "1px solid rgba(46,204,113,0.3)" }}>
                <p className={styles.statNum} style={{ color: "#2ECC71" }}>5.0</p>
                <p className={styles.statSub} style={{ color: "#2ECC71" }}>Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
