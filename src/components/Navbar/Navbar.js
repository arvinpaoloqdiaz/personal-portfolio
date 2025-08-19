import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faClipboard } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ activeSection }) {
  const [isActive, setIsActive] = useState(activeSection);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsActive(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ custom smooth scroll without updating URL
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.pill : ""}`}>
      <div className={styles["nav-logo"]}>
        <a href="#Home" tabIndex="-1" onClick={(e) => handleNavClick(e, "Home")}>
          <span>AP</span>
          <span>QD</span>
        </a>
      </div>

      <ul className={styles["nav-list"]}>
        <li>
          <a
            href="#Home"
            className={isActive === "Home" ? "active" : ""}
            onClick={(e) => handleNavClick(e, "Home")}
          >
            <span className={styles["nav__item"]}>Home</span>
            <FontAwesomeIcon icon={faHouse} className={styles["nav__icon"]} />
          </a>
        </li>
        <li>
          <a
            href="#About"
            className={isActive === "About" ? "active" : ""}
            onClick={(e) => handleNavClick(e, "About")}
          >
            <span className={styles["nav__item"]}>About</span>
            <FontAwesomeIcon icon={faUser} className={styles["nav__icon"]} />
          </a>
        </li>
        <li>
          <a
            href="#Projects"
            className={isActive === "Projects" ? "active" : ""}
            onClick={(e) => handleNavClick(e, "Projects")}
          >
            <span className={styles["nav__item"]}>Projects</span>
            <FontAwesomeIcon icon={faClipboard} className={styles["nav__icon"]} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
