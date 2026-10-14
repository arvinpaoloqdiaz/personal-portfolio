'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faBriefcase, faEnvelope, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/components/ui/ThemeProvider/ThemeProvider';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === '/') {
        const sections = ['Home', 'About', 'Projects'];
        const scrollPosition = window.scrollY + 200;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (e, sectionId) => {
    if (pathname === '/') {
      e.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      // Allow regular Next.js client-side navigation
    }
  };

  return (
    <header className={styles.navbarWrapper}>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} aria-label="Main Navigation">
        <div className={styles.navLogo}>
          <Link href="/#Home" onClick={(e) => handleNavClick(e, 'Home')} aria-label="Home">
            <span className={styles.logoPrefix}>AP</span>
            <span className={styles.logoSuffix}>QD</span>
          </Link>
        </div>

        <ul className={styles.navList}>
          <li>
            <Link
              href="/#Home"
              onClick={(e) => handleNavClick(e, 'Home')}
              className={pathname === '/' && activeSection === 'Home' ? styles.active : ''}
            >
              <FontAwesomeIcon icon={faHouse} className={styles.navIcon} />
              <span className={styles.navItem}>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/#About"
              onClick={(e) => handleNavClick(e, 'About')}
              className={pathname === '/' && activeSection === 'About' ? styles.active : ''}
            >
              <FontAwesomeIcon icon={faUser} className={styles.navIcon} />
              <span className={styles.navItem}>About</span>
            </Link>
          </li>
          <li>
            <Link
              href="/#Projects"
              onClick={(e) => handleNavClick(e, 'Projects')}
              className={pathname === '/' && activeSection === 'Projects' ? styles.active : ''}
            >
              <FontAwesomeIcon icon={faBriefcase} className={styles.navIcon} />
              <span className={styles.navItem}>Projects</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={pathname === '/contact' ? styles.active : ''}
            >
              <FontAwesomeIcon icon={faEnvelope} className={styles.navIcon} />
              <span className={styles.navItem}>Contact</span>
            </Link>
          </li>
        </ul>

        {/* Dark / Light Theme Toggle */}
        <div className={styles.themeToggleContainer}>
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeToggleBtn}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {mounted ? (
              <FontAwesomeIcon
                icon={theme === 'dark' ? faSun : faMoon}
                className={styles.themeIcon}
              />
            ) : (
              <span style={{ width: '14px', height: '14px', display: 'inline-block' }} />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

