import styles from "./Card.module.css";

interface CardProps {
  children:      React.ReactNode;
  title?:        string;
  subtitle?:     string;
  headerAction?: React.ReactNode;
  padding?:      "sm" | "md" | "lg";
  shadow?:       boolean;
  className?:    string;
  onClick?:      () => void;
}

export function Card({
  children, title, subtitle, headerAction,
  padding = "md", shadow = true, className = "", onClick,
}: CardProps) {
  const cls = [
    styles.card, styles[`p${padding}`],
    shadow  ? styles.shadow   : "",
    onClick ? styles.clickable : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={cls} onClick={onClick} role={onClick ? "button" : undefined}>
      {(title || headerAction) && (
        <div className={styles.header}>
          <div>
            {title    && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p  className={styles.subtitle}>{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
