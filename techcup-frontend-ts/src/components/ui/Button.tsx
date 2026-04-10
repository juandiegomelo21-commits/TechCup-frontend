import styles from "./Button.module.css";

type ButtonVariant = "primary" | "cta" | "outline" | "ghost" | "danger";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  loading?:   boolean;
  fullWidth?: boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = "primary", size = "md", loading = false,
  fullWidth = false, leftIcon, rightIcon,
  children, disabled, className = "", ...props
}: ButtonProps) {
  const cls = [
    styles.btn, styles[variant], styles[size],
    fullWidth ? styles.fullWidth : "",
    loading   ? styles.loading   : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button className={cls} disabled={disabled || loading} {...props}>
      {loading && <span className={styles.spinner} />}
      {!loading && leftIcon  && <span className={styles.icon}>{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
}
