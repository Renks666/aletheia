import type {ButtonHTMLAttributes} from "react";

import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({variant = "primary", className = "", ...props}: ButtonProps) {
  const variantClass = styles[variant];
  const classes = `${styles.button} ${variantClass} ${className}`.trim();

  return <button className={`${classes} focus-ring`} {...props} />;
}

