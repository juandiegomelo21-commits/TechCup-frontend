import styles from "./Badge.module.css";

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral";

export function Badge({ label, variant = "neutral", dot = false }: {
  label: string; variant?: BadgeVariant; dot?: boolean;
}) {
  return (
    <span className={[styles.badge, styles[variant]].join(" ")}>
      {dot && <span className={styles.dot} />}
      {label}
    </span>
  );
}
