import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Socials from '@/components/ui/Socials/Socials';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper} id="Footer">
      <Container className={styles.footerContainer}>
        <Row className="gy-4 align-items-center">
          <Col md={6}>
            <div className={styles.brandBox}>
              <div className={styles.brandName}>
                <span>AP</span><span className={styles.accent}>QD</span>
              </div>
              <p className={styles.tagline}>
                Full-Stack Web Developer crafting modern digital experiences with precision & care.
              </p>
            </div>
          </Col>

          <Col md={6} className="d-flex flex-column align-items-md-end align-items-start gap-2">
            <div className={styles.contactLinks}>
              <a href="mailto:arvinpaoloq.diaz@gmail.com" className={styles.contactItem}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                <span>arvinpaoloq.diaz@gmail.com</span>
              </a>
              <a href="tel:+639273222484" className={styles.contactItem}>
                <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
                <span>+63 927 322 2484</span>
              </a>
            </div>
            <div className="mt-2">
              <Socials isFooter={true} />
            </div>
          </Col>
        </Row>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Arvin Paolo Diaz.
          </p>
          <a href="#Home" className={styles.backToTop} aria-label="Back to top">
            <span>Back to top</span>
            <FontAwesomeIcon icon={faArrowUp} />
          </a>
        </div>
      </Container>
    </footer>
  );
}

