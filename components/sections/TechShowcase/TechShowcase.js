'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDocker,
  faGithub,
  faLinux,
  faGitlab,
  faReact,
  faNodeJs,
  faPhp,
  faLaravel,
  faPython,
  faJs,
  faChrome
} from '@fortawesome/free-brands-svg-icons';
import {
  faCloud,
  faDatabase,
  faNetworkWired,
  faShieldHalved,
  faBolt,
  faDesktop,
  faCheckDouble,
  faRobot,
  faWandMagicSparkles,
  faAtom
} from '@fortawesome/free-solid-svg-icons';

import techData from '@/data/technologies.json';
import styles from './TechShowcase.module.css';

// FontAwesome icon lookup map for tech items
const ICON_MAP = {
  faDocker,
  faGithub,
  faLinux,
  faGitlab,
  faReact,
  faNodeJs,
  faPhp,
  faLaravel,
  faPython,
  faJs,
  faCloud,
  faDatabase,
  faNetworkWired,
  faShieldHalved,
  faBolt,
  faDesktop,
  faCheckDouble,
  faChrome,
  faRobot,
  faWandMagicSparkles,
  faAtom
};

export default function TechShowcase() {
  // Divide into two balanced rows for the continuous infinite marquee
  const row1 = techData.filter((_, i) => i % 2 === 0);
  const row2 = techData.filter((_, i) => i % 2 !== 0);

  const renderIcon = (item) => {
    if (item.svg) {
      return (
        <Image
          src={item.svg}
          alt={item.name}
          width={30}
          height={30}
          className={styles.techSvg}
        />
      );
    }
    if (item.icon && ICON_MAP[item.icon]) {
      return (
        <FontAwesomeIcon icon={ICON_MAP[item.icon]} className={styles.techFaIcon} />
      );
    }
    return <FontAwesomeIcon icon={faBolt} className={styles.techFaIcon} />;
  };

  return (
    <div className={styles.showcaseWrapper}>
      <div className={styles.marqueeTrackWrapper}>
        {/* Row 1: Sliding Left */}
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeTrackInner}>
            {[...row1, ...row1, ...row1].map((item, idx) => (
              <div key={`r1-${idx}`} className={styles.marqueeCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>{renderIcon(item)}</div>
                  <span className={styles.badge}>{item.categoryLabel}</span>
                </div>
                <div className={styles.cardTitle}>{item.name}</div>
                <div className={styles.cardDesc}>{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className={`${styles.marqueeTrack} ${styles.reverse}`}>
          <div className={`${styles.marqueeTrackInner} ${styles.reverseSlide}`}>
            {[...row2, ...row2, ...row2].map((item, idx) => (
              <div key={`r2-${idx}`} className={styles.marqueeCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>{renderIcon(item)}</div>
                  <span className={styles.badge}>{item.categoryLabel}</span>
                </div>
                <div className={styles.cardTitle}>{item.name}</div>
                <div className={styles.cardDesc}>{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
