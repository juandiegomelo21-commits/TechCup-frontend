import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import styles from "./PerfilJugador.module.css";

const POSITIONS = [
  "Portero", "Lateral Derecho", "Lateral Izquierdo", "Central",
  "Volante (Midfielder)", "Interior", "Mediapunta", "Extremo Derecho",
  "Extremo Izquierdo", "Delantero Centro", "Segunda Punta",
];

interface ProfileData {
  name: string;
  nationalId: string;
  email: string;
  position: string;
  jersey: number;
  affiliation: string;
}

const initial: ProfileData = {
  name: "Carlos Rodríguez",
  nationalId: "1234567890",
  email: "carlos.rodriguez@university.edu.co",
  position: "Volante (Midfielder)",
  jersey: 10,
  affiliation: "Student",
};

export function PerfilJugador() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState<ProfileData>(initial);
  const [draft, setDraft] = useState<ProfileData>(initial);
  const [available, setAvailable] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function startEdit() { setDraft(saved); setEditing(true); }
  function cancel() { setEditing(false); }
  function save() { setSaved(draft); setEditing(false); }
  function set<K extends keyof ProfileData>(key: K, value: ProfileData[K]) {
    setDraft(d => ({ ...d, [key]: value }));
  }

  function toggleAvailable() {
    const next = !available;
    setAvailable(next);
    setToast(next
      ? "Apareces en el mercado de jugadores"
      : "Ya no apareces en el mercado de jugadores"
    );
  }

  return (
    <DashboardLayout role="JUGADOR">
      <div className={styles.page}>
        {/* Toast */}
        {toast && (
          <div className={`${styles.toast} ${available ? styles.toastGreen : styles.toastRed}`}>
            {available
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            }
            {toast}
          </div>
        )}

        <div className={styles.profileCard}>
          {/* Amber header */}
          <div className={styles.header}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 4-8 8-8s8 3.6 8 8"/>
                </svg>
              </div>
            </div>
            <div className={styles.headerInfo}>
              <h1 className={styles.name}>{saved.name}</h1>
              <div className={styles.badges}>
                <span className={styles.badge} style={{ background: "#4A90D9" }}>Player</span>
                <span className={styles.badge} style={{ background: "rgba(255,255,255,0.25)" }}>{saved.affiliation}</span>
              </div>
            </div>
            {editing ? (
              <div className={styles.editActions}>
                <button className={styles.cancelBtn} onClick={cancel}>Cancelar</button>
                <button className={styles.saveBtn} onClick={save}>Guardar</button>
              </div>
            ) : (
              <button className={styles.editBtn} onClick={startEdit}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Editar Perfil
              </button>
            )}
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
                  {editing ? (
                    <input className={styles.editInput} value={draft.name} onChange={e => set("name", e.target.value)} />
                  ) : (
                    <span className={styles.fieldValue}>{saved.name}</span>
                  )}
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>NATIONAL ID</span>
                  {editing ? (
                    <input className={styles.editInput} value={draft.nationalId} onChange={e => set("nationalId", e.target.value)} />
                  ) : (
                    <span className={styles.fieldValue}>
                      <span style={{ color: "var(--color-amber)", marginRight: "0.25rem" }}>#</span>
                      {saved.nationalId}
                    </span>
                  )}
                </div>
                <div className={styles.infoField} style={{ gridColumn: "1 / -1" }}>
                  <span className={styles.fieldLabel}>EMAIL ADDRESS</span>
                  <span className={styles.fieldValue}>
                    <span style={{ marginRight: "0.4rem", opacity: 0.6 }}>✉</span>
                    {saved.email}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Perfil Deportivo */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="2">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
                </svg>
                Perfil Deportivo
              </h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>PREFERRED POSITION</span>
                  {editing ? (
                    <select className={styles.editInput} value={draft.position} onChange={e => set("position", e.target.value)}>
                      {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  ) : (
                    <span className={styles.fieldValue}>
                      <span style={{ marginRight: "0.3rem", opacity: 0.6 }}>📍</span>
                      {saved.position}
                    </span>
                  )}
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>JERSEY NUMBER</span>
                  {editing ? (
                    <input className={styles.editInput} type="number" min={1} max={99} value={draft.jersey} onChange={e => set("jersey", Number(e.target.value))} />
                  ) : (
                    <span className={styles.jerseyBadge}>{saved.jersey}</span>
                  )}
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>AFFILIATION TYPE</span>
                  <span className={styles.fieldValue}>{saved.affiliation}</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className={styles.statsRow}>
              <button
                className={`${styles.statCard} ${styles.availableCard}`}
                style={{ background: available ? "#2ECC71" : "#E74C3C" }}
                onClick={toggleAvailable}
              >
                <p className={styles.statMain}>{available ? "Disponible" : "No disponible"}</p>
                <p className={styles.statSub}>{available ? "Disponible para Equipos" : "No disponible para equipos"}</p>
              </button>
              <div className={styles.statCard} style={{ background: "var(--color-amber)" }}>
                <p className={styles.statNum}>0</p>
                <p className={styles.statSub}>Matches Played</p>
              </div>
              <div className={styles.statCard} style={{ background: "#4A90D9" }}>
                <p className={styles.statNum}>0</p>
                <p className={styles.statSub}>Goals Scored</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
