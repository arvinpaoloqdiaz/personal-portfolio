'use client';

import { useState } from 'react';
import styles from './SmallCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Modern Reinvented Stat Card
 * Supports:
 * - link href (e.g. #Projects)
 * - action click (e.g. triggering Certificates modal)
 * - non-interactive display (e.g. Experience)
 * - flat resting state, subtle elevation & emerald rim on hover
 */
export default function SmallCard({
  title,
  quantity,
  subtitle,
  icon,
  href,
  onClick,
  badge
}) {
  const isInteractive = Boolean(href || onClick);

  const cardInner = (
    <>
      <div className={styles.topRow}>
        <div className={styles.iconCircle}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
        </div>
        {badge && <span className={styles.statusBadge}>{badge}</span>}
      </div>

      <div className={styles.metricBlock}>
        <div className={styles.quantity}>{quantity}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>

      <div className={styles.footerRow}>
        <span className={styles.cardTitle}>{title}</span>
        {isInteractive && (
          <span className={styles.arrowIcon}>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${styles.cardContainer} ${styles.interactiveCard}`}>
        {cardInner}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${styles.cardContainer} ${styles.interactiveCard} ${styles.buttonReset}`}
      >
        {cardInner}
      </button>
    );
  }

  return <div className={styles.cardContainer}>{cardInner}</div>;
}
