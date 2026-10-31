'use client';
import { useState, useRef } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import Socials from '@/components/ui/Socials/Socials';
import styles from './Contact.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faPhone, 
  faPaperPlane, 
  faCheckCircle, 
  faExclamationCircle, 
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { Turnstile } from '@marsidev/react-turnstile';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });
  const turnstileRef = useRef(null);

  // Cloudflare test site key fallback for local testing if not defined in env
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify token presence if turnstile site key is active
    if (siteKey && !turnstileToken) {
      setStatus({
        loading: false,
        success: false,
        message: 'Please complete the Turnstile verification before submitting.',
      });
      return;
    }

    setStatus({ loading: true, success: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus({
        loading: false,
        success: true,
        message: 'Thank you! Your message has been sent successfully. I will get back to you soon.',
      });

      // Clear the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Reset turnstile
      if (turnstileRef.current?.reset) {
        turnstileRef.current.reset();
      }
      setTurnstileToken('');
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: err.message || 'Something went wrong. Please try again or email directly.',
      });
      // Reset turnstile widget on error so user can re-verify
      if (turnstileRef.current?.reset) {
        turnstileRef.current.reset();
      }
      setTurnstileToken('');
    }
  };

  return (
    <>
      <Navbar />
      <Container className={styles.pageWrapper}>
        {/* Header / Hero */}
        <div className={styles.heroSection}>
          <span className={styles.eyebrow}>
            Start A Conversation
          </span>
          <h1 className={styles.heading}>
            Get In Touch
          </h1>
          <p className={styles.subheading}>
            Have a project in mind, want to collaborate on architecture, or explore full-stack engineering opportunities? Let's talk.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {/* Contact Details & Socials Column */}
          <Col lg={4}>
            <div className={styles.infoCard}>
              <div>
                <h4 className={styles.cardTitle}>
                  Contact Channels
                </h4>

                <div className={styles.contactList}>
                  {/* Email */}
                  <a href="mailto:arvinpaoloq.diaz@gmail.com" className={styles.contactItem}>
                    <div className={styles.iconCircle}>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>
                      <span className={styles.contactLabel}>Direct Email</span>
                      <span className={styles.contactValue}>arvinpaoloq.diaz@gmail.com</span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a href="tel:+639273222484" className={styles.contactItem}>
                    <div className={styles.iconCircle}>
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div>
                      <span className={styles.contactLabel}>Phone / WhatsApp</span>
                      <span className={styles.contactValue}>+63 927 322 2484</span>
                    </div>
                  </a>
                </div>

                <div className={styles.socialsWrapper}>
                  <p className={styles.socialsPrompt}>Professional networks & profiles:</p>
                  <Socials isAbout={true} />
                </div>
              </div>

              <div className={styles.locationFooter}>
                <FontAwesomeIcon icon={faLocationDot} style={{ color: 'var(--emerald-400)' }} />
                <span>Based in the Philippines • Available for Global Remote</span>
              </div>
            </div>
          </Col>

          {/* Contact Form Column */}
          <Col lg={7}>
            <div className={styles.formCard}>
              <h4 className={styles.cardTitle}>
                Send a Message
              </h4>

              {status.message && (
                <div className={`${styles.statusAlert} ${status.success ? styles.statusSuccess : styles.statusError}`}>
                  <FontAwesomeIcon 
                    icon={status.success ? faCheckCircle : faExclamationCircle} 
                    className="fs-5 flex-shrink-0" 
                  />
                  <div>{status.message}</div>
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="contactName">
                      <label className={styles.formLabel}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.customInput}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="contactEmail">
                      <label className={styles.formLabel}>
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.customInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="contactSubject" className="mb-3">
                  <label className={styles.formLabel}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.customInput}
                  />
                </Form.Group>

                <Form.Group controlId="contactMessage" className="mb-4">
                  <div className={styles.messageHeader}>
                    <label className={styles.formLabel} style={{ marginBottom: 0 }}>
                      Message *
                    </label>
                    <span 
                      className={`${styles.charCounter} ${
                        formData.message.length >= 500
                          ? styles.charCounterLimit
                          : formData.message.length >= 450
                          ? styles.charCounterWarning
                          : ''
                      }`}
                    >
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    name="message"
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={styles.customTextarea}
                  />
                </Form.Group>

                {/* Cloudflare Turnstile */}
                <div className="mb-4">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={siteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken('')}
                    onExpire={() => setTurnstileToken('')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className={styles.submitBtn}
                >
                  {status.loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
