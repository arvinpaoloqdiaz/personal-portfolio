import styles from "./Socials.module.css";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import {faLinkedin, faGoogle, faCodepen, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Socials({isFooter = false}){
	return(
		<div className={isFooter?"d-flex justify-content-center justify-content-md-end":styles.socials__home}>
		<div className={`${styles.socials__bar} d-flex ${isFooter ? "gap-4" : styles.socials__border}`}>
		<span className={styles.socialsLogoContainer}>
            <a href="https://www.linkedin.com/in/arvin-paolo-diaz/" target="_blank" rel="noreferrer" className="text-link-brand">
                <div><FontAwesomeIcon icon={faLinkedin} className={styles.linkedin}/></div>
                <div className={styles.logoLabel} >LinkedIn</div>
            </a>
        </span>
		<span className={styles.socialsLogoContainer}>
            <a href="mailto:arvinpaoloq.diaz@gmail.com" target="_blank" rel="noreferrer" className="text-link-brand">
                <div><FontAwesomeIcon icon={faGoogle} className={styles.google}/></div>
                <div className={styles.logoLabel}>Gmail</div>
            </a>
        </span>
		<span className={styles.socialsLogoContainer}>
            <a href="https://codepen.io/Arvin-Paolo-Diaz" target="_blank" rel="noreferrer" className="text-link-brand">
                <div><FontAwesomeIcon icon={faCodepen} className={styles.codepen}/></div>
                <div className={styles.logoLabel}>CodePen</div>
            </a>
        </span>
		<span className={styles.socialsLogoContainer}>
            <a href="https://github.com/arvinpaoloqdiaz" target="_blank" rel="noreferrer" className="text-link-brand">
                <div><FontAwesomeIcon icon={faGithub} className={styles.github}/></div>
                <div className={styles.logoLabel}>GitHub</div>
            </a>
        </span>
		</div>
		</div>
	)
}