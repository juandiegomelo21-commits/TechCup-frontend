import { useState } from "react";
import { Link } from "react-router-dom";
import logoTechup from "../../assets/logo-techup.png";
import styles from "./RecuperarPassword.module.css";

export function RecuperarPasswordPage() {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className={styles.root}>
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      <div className={styles.content}>
        <img src={logoTechup} alt="TechUp Fútbol" className={styles.logo} />
        <h1 className={styles.pageTitle}>Recuperar Contraseña</h1>

        <Link to="/login" className={styles.backLink}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Volver
        </Link>

        {sent ? (
          <div className={styles.card}>
            <div className={styles.successIcon}>✓</div>
            <p className={styles.successText}>
              Enviamos un enlace de recuperación a <strong>{email}</strong>.<br />
              Revisa tu bandeja de entrada.
            </p>
            <Link to="/login" className={styles.submitBtn} style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form className={styles.card} onSubmit={handleSubmit} noValidate>
            <p className={styles.instruction}>
              Escribe tu correo para enviar enlace de recuperación de la cuenta
            </p>
            <input
              className={styles.input}
              type="email"
              placeholder="correo"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Enviando…" : "enviar"}
            </button>
          </form>
        )}

        <div className={styles.noteCard}>
          <p className={styles.noteTitle}>📋 Tener en cuenta:</p>
          <ul className={styles.noteList}>
            <li>Si es miembro de la Escuela, usar correo institucional</li>
            <li>Si es familiar de algún miembro, usar Gmail</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
