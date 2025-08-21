import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faClipboard, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Helper to handle navigation/scroll
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on home → just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Not on home → go to home, then scroll after navigation
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.pill : ""}`}>
      <div className={styles["nav-logo"]}>
        <a href="/" onClick={(e) => handleNavClick(e, "Home")}>
          <span>AP</span>
          <span>QD</span>
        </a>
      </div>

      <ul className={styles["nav-list"]}>
        <li>
          <a href="#Home" onClick={(e) => handleNavClick(e, "Home")}>
            <span className={styles["nav__item"]}>Home</span>
            <FontAwesomeIcon icon={faHouse} className={styles["nav__icon"]} />
          </a>
        </li>
        <li>
          <a href="#About" onClick={(e) => handleNavClick(e, "About")}>
            <span className={styles["nav__item"]}>About</span>
            <FontAwesomeIcon icon={faUser} className={styles["nav__icon"]} />
          </a>
        </li>
        <li>
          <a href="#Projects" onClick={(e) => handleNavClick(e, "Projects")}>
            <span className={styles["nav__item"]}>Projects</span>
            <FontAwesomeIcon icon={faClipboard} className={styles["nav__icon"]} />
          </a>
        </li>
        <li>
          {/* Contact goes directly to route */}
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>
            <span className={styles["nav__item"]}>Contact Me</span>
            <FontAwesomeIcon icon={faEnvelope} className={styles["nav__icon"]} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
