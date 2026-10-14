'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const pathname = usePathname();
  const router = useRouter();

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
    e.preventDefault();
    if (pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      router.push(`/?scrollTo=${sectionId}`);
    }
  };

  return (
    <header className={styles.navbarWrapper}>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} aria-label="Main Navigation">
        <div className={styles.navLogo}>
          <a href="/" onClick={(e) => handleNavClick(e, 'Home')} aria-label="Home">
            <span className={styles.logoPrefix}>AP</span>
            <span className={styles.logoSuffix}>QD</span>
          </a>
        </div>

        <ul className={styles.navList}>
          <li>
            <a
              href="#Home"
              onClick={(e) => handleNavClick(e, 'Home')}
              className={pathname === '/' && activeSection === 'Home' ? styles.active : ''}
            >
              <FontAwesomeIcon icon={faHouse} className={styles.navIcon} />
              <span className={styles.navItem}>Home</span>
            </a>
          </li>
          <li>
            <a
              href="#About"
              onClick={(e) => handleNavClick(e, 'About')}
              className={pathname === '/' && activeSection === 'About' ? styles.active : ''}
            >
              <FontAwesomeIcon icon={faUser} className={styles.navIcon} />
              <span className={styles.navItem}>About</span>
            </a>
          </li>
          <li>
            <a
              href="#Projects"
              onClick={(e) => handleNavClick(e, 'Projects')}
              className={pathname === '/' && activeSection === 'Projects' ? styles.active : ''}
            >
              <FontAwesomeIcon icon={faBriefcase} className={styles.navIcon} />
              <span className={styles.navItem}>Projects</span>
            </a>
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
      </nav>
    </header>
  );
}

