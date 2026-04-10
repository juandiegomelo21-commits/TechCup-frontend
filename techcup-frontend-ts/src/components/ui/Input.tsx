import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string;
  error?:     string;
  hint?:      string;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label, error, hint, leftIcon, rightIcon,
  fullWidth = true, id, className = "", ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={[styles.wrapper, fullWidth ? styles.fullWidth : ""].join(" ")}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <div className={[styles.inputWrapper, error ? styles.hasError : ""].join(" ")}>
        {leftIcon  && <span className={styles.iconLeft}>{leftIcon}</span>}
        <input
          id={inputId}
          className={[
            styles.input,
            leftIcon  ? styles.withLeftIcon  : "",
            rightIcon ? styles.withRightIcon : "",
            error     ? styles.error         : "",
            className,
          ].filter(Boolean).join(" ")}
          {...props}
        />
        {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </div>
      {error  && <p className={styles.errorMsg}>{error}</p>}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
