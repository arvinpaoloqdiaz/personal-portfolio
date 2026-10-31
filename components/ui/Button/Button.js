'use client';

import Link from 'next/link';
import styles from './Button.module.css';

/**
 * Reusable Button component
 * @param {'gradient' | 'secondary' | 'outline' | 'ghost'} variant - Visual style variant (default: 'gradient')
 * @param {'sm' | 'md' | 'lg'} size - Button size (default: 'md')
 * @param {string} href - If provided, renders as <a> or Next.js <Link>
 * @param {boolean} external - If true with href, opens in a new tab with rel="noopener noreferrer"
 * @param {string} className - Optional extra className
 * @param {React.ReactNode} children - Button contents
 * @param {React.ReactNode} icon - Optional trailing or leading icon
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'gradient',
  size = 'md',
  external = false,
  className = '',
  icon,
  type = 'button',
  disabled = false,
  ...rest
}) {
  const variantClass = styles[variant] || styles.gradient;
  const sizeClass = styles[size] || styles.md;
  const combinedClassName = `${styles.button} ${variantClass} ${sizeClass} ${className}`.trim();

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (href) {
    if (href.startsWith('#') || external) {
      return (
        <a
          href={href}
          className={combinedClassName}
          onClick={onClick}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClassName} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
}

