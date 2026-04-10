import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import type { UserRole } from "../../types";
import styles from "./DashboardLayout.module.css";

interface Props {
  children:  React.ReactNode;
  role:      UserRole;
  onLogout?: () => void;
}

export function DashboardLayout({ children, role, onLogout }: Props) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout?.();
    navigate("/login");
  }

  return (
    <div className={styles.layout}>
      <div className={styles.bgOverlay} />
      <Sidebar role={role} onLogout={handleLogout} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
