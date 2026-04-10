import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoTechup from "../../assets/logo-techup.png";
import styles from "./Login.module.css";

type DemoRole = "ADMIN" | "ORGANIZADOR" | "ARBITRO" | "CAPITAN" | "JUGADOR";

const roleRoutes: Record<DemoRole, string> = {
  ADMIN:       "/admin/torneos",
  ORGANIZADOR: "/organizador/dashboard",
  ARBITRO:     "/arbitro/dashboard",
  CAPITAN:     "/capitan/dashboard",
  JUGADOR:     "/jugador/dashboard",
};

interface LoginForm {
  email:    string;
  password: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm]               = useState<LoginForm>({ email: "", password: "" });
  const [demoRole, setDemoRole]       = useState<DemoRole>("JUGADOR");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    // Demo: simula autenticación y redirige según rol seleccionado
    setTimeout(() => {
      setLoading(false);
      navigate(roleRoutes[demoRole]);
    }, 800);
  };

  return (
    <div className={styles.root}>
      {/* Fondo y overlay */}
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      {/* Contenido */}
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <img src={logoTechup} alt="TechUp Fútbol" className={styles.logo} />
        </div>

        {/* Volver */}
        <Link to="/" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Volver
        </Link>

        {/* Card */}
        <div className={styles.card}>
          {/* User icon */}
          <div className={styles.userIconWrap}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>

          <h1 className={styles.title}>Iniciar Sesión</h1>
          <div className={styles.divider} />

          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Correo Electrónico</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  id="email" name="email" type="email"
                  className={styles.input}
                  placeholder="usuario@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Contraseña</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.togglePwd}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.error} role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Otros métodos */}
            <p className={styles.otherLabel}>Otros metodos de ingreso</p>
            <button type="button" className={styles.googleBtn}>
              <span>Ingresar con Google</span>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            {/* Demo: selector de rol */}
            <div className={styles.field}>
              <label className={styles.label}>Ingresar como (demo)</label>
              <select
                className={styles.input}
                value={demoRole}
                onChange={e => setDemoRole(e.target.value as DemoRole)}
                style={{ paddingLeft: "0.75rem", cursor: "pointer" }}
              >
                <option value="JUGADOR">Jugador</option>
                <option value="CAPITAN">Capitán</option>
                <option value="ARBITRO">Árbitro</option>
                <option value="ORGANIZADOR">Organizador</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

            <div className={styles.links}>
              <Link to="/registro" className={styles.link}>¿No tienes cuenta? Regístrate aquí</Link>
              <Link to="/recuperar" className={styles.link}>¿Olvidaste tu contraseña?</Link>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <><span className={styles.spinner} /> Ingresando…</>
              ) : (
                <>Iniciar Sesión <span>→</span></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
