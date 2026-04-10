import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoTechup from "../../assets/logo-techup.png";
import styles from "./Register.module.css";

type Role        = "player" | "referee" | "admin";
type Affiliation = "student" | "graduate" | "family";

const positions = [
  "Portero", "Defensa Central", "Lateral Derecho", "Lateral Izquierdo",
  "Mediocampista", "Interior Derecho", "Interior Izquierdo",
  "Extremo Derecho", "Extremo Izquierdo", "Delantero", "Media Punta",
];

export function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole]               = useState<Role>("player");
  const [affiliation, setAffiliation] = useState<Affiliation>("student");
  const [showPwd, setShowPwd]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: "", nationalId: "", email: "", semester: "",
    password: "", confirmPassword: "", position: "", jersey: "",
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar con endpoint de registro
    navigate("/login");
  };

  return (
    <div className={styles.root}>
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      <div className={styles.content}>
        {/* Logo */}
        <img src={logoTechup} alt="TechUp Fútbol" className={styles.logo} />

        {/* Card */}
        <form className={styles.card} onSubmit={handleSubmit} noValidate>

          {/* Role selector */}
          <div className={styles.section}>
            <p className={styles.sectionLabel}>Select Your Role</p>
            <div className={styles.roleGroup}>
              {(["player", "referee", "admin"] as Role[]).map(r => (
                <button
                  key={r} type="button"
                  className={[styles.roleBtn, role === r ? styles.roleBtnActive : ""].join(" ")}
                  onClick={() => setRole(r)}
                >
                  {r === "player" ? "Player" : r === "referee" ? "Referee" : "Admin"}
                </button>
              ))}
            </div>
          </div>

          {/* Affiliation (only for Player) */}
          {role === "player" && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Select your affiliation:</p>
              <div className={styles.affiliationGroup}>
                {(["student", "graduate", "family"] as Affiliation[]).map(a => (
                  <button
                    key={a} type="button"
                    className={[styles.affCard, affiliation === a ? styles.affCardActive : ""].join(" ")}
                    onClick={() => setAffiliation(a)}
                  >
                    <span className={styles.affRadio}>{affiliation === a ? "●" : "○"}</span>
                    <span>{a === "student" ? "Student" : a === "graduate" ? "Graduate" : "Family / Guest"}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.divider} />

          {/* Personal info */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Información Personal</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <input className={styles.input} placeholder="Enter your full name" value={form.fullName} onChange={set("fullName")} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>National ID Number</label>
                <input className={styles.input} placeholder="Enter your ID number" value={form.nationalId} onChange={set("nationalId")} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email Address</label>
                <input className={styles.input} type="email" placeholder="your.email@institution.edu" value={form.email} onChange={set("email")} />
              </div>
              {role === "player" && affiliation === "student" && (
                <div className={styles.field}>
                  <label className={styles.label}>Semester</label>
                  <input className={styles.input} placeholder="Enter your semester number 1-10" value={form.semester} onChange={set("semester")} />
                </div>
              )}
              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrap}>
                  <input className={styles.input} type={showPwd ? "text" : "password"} placeholder="Minimum 6 characters" value={form.password} onChange={set("password")} />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirm Password</label>
                <div className={styles.inputWrap}>
                  <input className={styles.input} type={showConfirm ? "text" : "password"} placeholder="Re-enter your password" value={form.confirmPassword} onChange={set("confirmPassword")} />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sports profile (only for player) */}
          {role === "player" && (
            <>
              <div className={styles.divider} />
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Perfil Deportivo</h2>
                <div className={styles.sportsGrid}>
                  <div className={styles.sportsLeft}>
                    <div className={styles.field}>
                      <label className={styles.label}>Preferred Position</label>
                      <select className={styles.input} value={form.position} onChange={set("position")}>
                        <option value="">Select position</option>
                        {positions.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Jersey Number</label>
                      <input className={styles.input} placeholder="1-99" type="number" min="1" max="99" value={form.jersey} onChange={set("jersey")} />
                    </div>
                  </div>
                  <div className={styles.photoUpload}>
                    <div className={styles.photoCircle}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(0,100,60,0.4)" strokeWidth="1.5">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                    </div>
                    <p className={styles.uploadLabel}>Upload Photo</p>
                    <p className={styles.uploadHint}>Click or drag and drop<br/>JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <button type="submit" className={styles.submitBtn}>Register Now</button>
          <p className={styles.loginLink}>
            Already have an account?{" "}
            <Link to="/login" className={styles.link}>Go →</Link>
          </p>
        </form>

        <p className={styles.terms}>
          Al registrarte, aceptas nuestros{" "}
          <a href="#" className={styles.link}>Términos de Servicio</a> y{" "}
          <a href="#" className={styles.link}>Política de Privacidad</a>
        </p>
      </div>
    </div>
  );
}
