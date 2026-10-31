'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faBriefcase,
  faBookOpen,
  faPenNib,
  faEnvelope,
  faChevronDown,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/components/ui/ThemeProvider/ThemeProvider';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === '/') {
        const sections = ['Home', 'About', 'Projects', 'CaseStudies', 'Blog'];
        const scrollPosition = window.scrollY + 120;

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

  // Close dropdown on outside click or scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleWindowScroll = () => {
      setDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const handleNavClick = (e, sectionId) => {
    setDropdownOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
        const navOffset = 90; // offset in px for floating navbar
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setActiveSection(sectionId);
      }
    } else {
      // Allow regular Next.js client-side navigation
    }
  };

  const isWorksActive = pathname === '/' && ['Projects', 'CaseStudies', 'Blog'].includes(activeSection);

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

          {/* Works Dropdown */}
          <li
            className={styles.dropdownContainer}
            ref={dropdownRef}
          >
            <button
              type="button"
              className={`${styles.dropdownTrigger} ${isWorksActive ? styles.active : ''} ${dropdownOpen ? styles.open : ''}`}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <FontAwesomeIcon icon={faLayerGroup} className={styles.navIcon} />
              <span className={styles.navItem}>Works</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`${styles.chevronIcon} ${dropdownOpen ? styles.chevronRotated : ''}`}
              />
            </button>

            <ul className={`${styles.dropdownMenu} ${dropdownOpen ? styles.dropdownVisible : ''}`}>
              <li>
                <Link
                  href="/#Projects"
                  onClick={(e) => handleNavClick(e, 'Projects')}
                  className={pathname === '/' && activeSection === 'Projects' ? styles.dropdownItemActive : ''}
                >
                  <FontAwesomeIcon icon={faBriefcase} className={styles.dropdownItemIcon} />
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#CaseStudies"
                  onClick={(e) => handleNavClick(e, 'CaseStudies')}
                  className={pathname === '/' && activeSection === 'CaseStudies' ? styles.dropdownItemActive : ''}
                >
                  <FontAwesomeIcon icon={faBookOpen} className={styles.dropdownItemIcon} />
                  <span>Case Studies</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#Blog"
                  onClick={(e) => handleNavClick(e, 'Blog')}
                  className={pathname === '/' && activeSection === 'Blog' ? styles.dropdownItemActive : ''}
                >
                  <FontAwesomeIcon icon={faPenNib} className={styles.dropdownItemIcon} />
                  <span>Blogs</span>
                </Link>
              </li>
            </ul>
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

