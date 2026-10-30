'use client';

import Image from 'next/image';
import styles from './HeroAvatar.module.css';

/**
 * HeroAvatar component supporting:
 * - 'professional': luminous light-frosted frame for 1x1-latest.png headshot with status badge
 * - 'casual': light-frosted arch backdrop for full-body cutout portrait me.png with status badge
 */
export default function HeroAvatar({ mode = 'professional' }) {
  const isCasual = mode?.toLowerCase() === 'casual';

  if (isCasual) {
    return (
      <div className={styles.casualContainer}>
        {/* Soft mint/emerald radial glow */}
        <div className={styles.casualBackdropGlow} />

        {/* Crisp luminous light arch plate behind cutout */}
        <div className={styles.casualRingBackdrop} />

        {/* Casual cutout figure */}
        <div className={styles.casualImageWrapper}>
          <Image
            src="/images/me.png"
            alt="Arvin Paolo Diaz - Casual"
            width={400}
            height={838}
            priority
            className={styles.casualImage}
          />
        </div>

        {/* Floating status badge */}
        <div className={styles.floatingTag}>
          <span className={styles.floatingTagDot} />
          <span className={styles.floatingTagText}>Available for Opportunities</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.proContainer}>
      {/* Ambient mint/emerald glow */}
      <div className={styles.proAura} />

      {/* Luminous light-frosted frame */}
      <div className={styles.proCard}>
        <div className={styles.photoFrame}>
          <Image
            src="/images/1x1-latest.png"
            alt="Arvin Paolo Diaz - Professional Headshot"
            width={340}
            height={340}
            priority
            className={styles.proPhoto}
          />
          <div className={styles.photoSheen} />
        </div>

        {/* Floating status pill */}
        <div className={styles.proBadge}>
          <span className={styles.proBadgePulse} />
          <span className={styles.proBadgeText}>Available for Opportunities</span>
        </div>
      </div>
    </div>
  );
}
