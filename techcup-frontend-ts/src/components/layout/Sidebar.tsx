import { NavLink } from "react-router-dom";
import type { UserRole } from "../../types";
import logoTechup from "../../assets/logo-techup.png";
import styles from "./Sidebar.module.css";

/* ──────────────────── Icons ──────────────────── */
const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const AppsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/>
    <circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>
    <circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
  </svg>
);
const PeopleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const StackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 2,7 12,12 22,7 12,2"/>
    <polyline points="2,17 12,22 22,17"/>
    <polyline points="2,12 12,17 22,12"/>
  </svg>
);
const LearnIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

type IconKey = "grid" | "apps" | "clock" | "people" | "settings";

const iconMap: Record<IconKey, React.FC> = {
  grid:     GridIcon,
  apps:     AppsIcon,
  clock:    ClockIcon,
  people:   PeopleIcon,
  settings: SettingsIcon,
};

interface SidebarNavItem {
  label: string;
  path:  string;
  icon:  IconKey;
}

const navByRole: Record<UserRole, SidebarNavItem[]> = {
  ADMIN: [
    { label: "Torneos",             path: "/admin/torneos",     icon: "grid" },
    { label: "Pagos",               path: "/admin/pagos",       icon: "apps" },
    { label: "Usuarios y Equipos",  path: "/admin/usuarios",    icon: "clock" },
    { label: "Reglamentos",         path: "/admin/reglamentos", icon: "people" },
    { label: "Historial de Torneos",path: "/admin/historial",   icon: "settings" },
  ],
  ORGANIZADOR: [
    { label: "Panel Principal", path: "/organizador/dashboard", icon: "grid" },
    { label: "Mi Equipo",       path: "/organizador/equipo",    icon: "apps" },
    { label: "Pagos",           path: "/organizador/pagos",     icon: "clock" },
    { label: "Mercado",         path: "/organizador/mercado",   icon: "people" },
    { label: "Historial",       path: "/organizador/historial", icon: "settings" },
  ],
  ARBITRO: [
    { label: "Panel Principal", path: "/arbitro/dashboard", icon: "grid" },
    { label: "Mi Perfil",       path: "/arbitro/perfil",    icon: "people" },
    { label: "Pagos",           path: "/arbitro/pagos",     icon: "clock" },
    { label: "Mercado",         path: "/arbitro/mercado",   icon: "apps" },
    { label: "Historial",       path: "/arbitro/historial", icon: "settings" },
  ],
  CAPITAN: [
    { label: "Panel Principal", path: "/capitan/dashboard", icon: "grid" },
    { label: "Mi Equipo",       path: "/capitan/equipo",    icon: "apps" },
    { label: "Pagos",           path: "/capitan/pagos",     icon: "clock" },
    { label: "Mercado",         path: "/capitan/mercado",   icon: "people" },
    { label: "Historial",       path: "/capitan/historial", icon: "settings" },
  ],
  JUGADOR: [
    { label: "Panel Principal", path: "/jugador/dashboard", icon: "grid" },
    { label: "Mi Perfil",       path: "/jugador/perfil",    icon: "people" },
    { label: "Mi Equipo",       path: "/jugador/equipo",    icon: "apps" },
    { label: "Pagos",           path: "/jugador/pagos",     icon: "clock" },
    { label: "Mercado",         path: "/jugador/mercado",   icon: "apps" },
    { label: "Historial",       path: "/jugador/historial", icon: "settings" },
  ],
};

interface SidebarProps {
  role:     UserRole;
  onLogout: () => void;
}

export function Sidebar({ role, onLogout }: SidebarProps) {
  const items = navByRole[role] ?? [];

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={logoTechup} alt="TechUp Fútbol" className={styles.logoImg} />
      </div>

      {/* Main nav */}
      <nav className={styles.nav}>
        {items.map(item => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [styles.navItem, isActive ? styles.active : ""].filter(Boolean).join(" ")
              }
            >
              <span className={styles.navIcon}><Icon /></span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className={styles.bottom}>
        <button className={styles.bottomItem}>
          <span className={styles.navIcon}><StackIcon /></span>
          <span>Preguntas Frecuentes</span>
        </button>
        <button className={styles.bottomItem}>
          <span className={styles.navIcon}><LearnIcon /></span>
          <span>Aprender</span>
        </button>
        <button className={styles.logoutBtn} onClick={onLogout}>
          <span className={styles.navIcon}><LogoutIcon /></span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
