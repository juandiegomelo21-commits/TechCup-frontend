import { Link } from "react-router-dom";
import logoTechup  from "../assets/logo-techup.png";
import logoEscuela from "../assets/logo-escuela.png";
import styles from "./Landing.module.css";

export function LandingPage() {
  return (
    <div className={styles.root}>
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      {/* Logo ECIJ top right */}
      <div className={styles.topRight}>
        <img src={logoEscuela} alt="Escuela Colombiana de Ingeniería" className={styles.ecijLogo} />
      </div>

      {/* Center content */}
      <div className={styles.center}>
        <div className={styles.logoWrap}>
          <img src={logoTechup} alt="TechUp Fútbol" className={styles.logo} />
        </div>

        <h1 className={styles.tagline}>
          Tu torneo en<br />una sola plataforma
        </h1>

        <Link to="/login" className={styles.ctaBtn}>
          Ingresar
        </Link>
      </div>
    </div>
  );
}
