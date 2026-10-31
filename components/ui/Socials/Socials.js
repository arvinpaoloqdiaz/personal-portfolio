'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGoogle,
  faCodepen,
  faGithub,
  faTwitter,
  faXTwitter,
  faYoutube,
  faDiscord,
  faInstagram,
  faGitlab,
  faMedium,
  faStackOverflow
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faLink } from '@fortawesome/free-solid-svg-icons';
import defaultSocials from '@/data/socials.json';
import styles from './Socials.module.css';

// FontAwesome icon lookup map for easy configuration by string name in socials.json
const ICON_MAP = {
  faLinkedin,
  faGoogle,
  faCodepen,
  faGithub,
  faTwitter,
  faXTwitter,
  faYoutube,
  faDiscord,
  faInstagram,
  faGitlab,
  faMedium,
  faStackOverflow,
  faEnvelope,
  faGlobe,
  faLink
};

export default function Socials({
  isFooter = false,
  isAbout = false,
  links = defaultSocials
}) {
  const containerClass = isFooter
    ? `${styles.socialsContainer} ${styles.footerAlign}`
    : isAbout
      ? `${styles.socialsContainer} ${styles.centerAlign}`
      : `${styles.socialsContainer} ${styles.homeAlign}`;

  return (
    <nav className={containerClass} aria-label="Social media and links">
      <div className={styles.socialsDock}>
        {links.map((item, index) => {
          const isFontAwesome = typeof item.icon === 'string' && ICON_MAP[item.icon];
          const isImagePath = typeof item.icon === 'string' && (item.icon.startsWith('/') || item.icon.startsWith('http'));

          return (
            <a
              key={item.name || index}
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.socialItem}
              aria-label={item.ariaLabel || item.name}
              style={{ '--item-accent': item.hoverColor || '#34d399' }}
            >
              <div className={styles.iconCircle}>
                {isFontAwesome && (
                  <FontAwesomeIcon
                    icon={ICON_MAP[item.icon]}
                    className={styles.iconElement}
                  />
                )}
                {isImagePath && (
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className={styles.customIconImage}
                  />
                )}
                {!isFontAwesome && !isImagePath && (
                  <FontAwesomeIcon icon={faLink} className={styles.iconElement} />
                )}
              </div>

              {/* Floating Tooltip Label */}
              <span className={styles.tooltip}>{item.name}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
