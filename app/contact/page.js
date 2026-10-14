'use client';
import { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import Socials from '@/components/ui/Socials/Socials';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faPaperPlane, faCheckCircle, faExclamationCircle, faLocationDot } from "@fortawesome/free-solid-svg-icons";
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
      <Container className="mt-5 pt-5 flex-grow-1" style={{ minHeight: '75vh' }}>
        <Row className="mb-5 pt-4">
          <Col className="text-center">
            <span 
              style={{
                fontFamily: 'var(--font-mono-stack)',
                fontSize: '0.85rem',
                color: 'var(--emerald-400)',
                background: 'var(--emerald-pill-bg)',
                border: '1px solid rgba(52, 211, 153, 0.25)',
                padding: '0.25rem 0.85rem',
                borderRadius: 'var(--radius-pill)',
                display: 'inline-block',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Start A Conversation
            </span>
            <h1 
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
              className="mb-2"
            >
              Get In Touch
            </h1>
            <p className="text-secondary" style={{ maxWidth: '520px', margin: '0 auto', fontSize: '0.95rem' }}>
              Have a project in mind, want to collaborate, or just want to say hi? Feel free to reach out anytime!
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          {/* Contact Details & Socials Column */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <div 
              className="p-4 p-md-4 h-100 d-flex flex-column justify-content-between"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              }}
            >
              <div>
                <h4 className="mb-4" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                  Contact Information
                </h4>
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="p-2 rounded-circle me-3 d-flex align-items-center justify-content-center"
                      style={{
                        background: 'var(--emerald-pill-bg)',
                        border: '1px solid rgba(52, 211, 153, 0.25)',
                        color: 'var(--emerald-400)',
                        width: '42px',
                        height: '42px',
                      }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>
                      <small style={{ color: 'var(--text-muted)' }} className="d-block">Email</small>
                      <a 
                        href="mailto:arvinpaoloq.diaz@gmail.com" 
                        className="text-decoration-none fw-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        arvinpaoloq.diaz@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div 
                      className="p-2 rounded-circle me-3 d-flex align-items-center justify-content-center"
                      style={{
                        background: 'var(--emerald-pill-bg)',
                        border: '1px solid rgba(52, 211, 153, 0.25)',
                        color: 'var(--emerald-400)',
                        width: '42px',
                        height: '42px',
                      }}
                    >
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div>
                      <small style={{ color: 'var(--text-muted)' }} className="d-block">Phone</small>
                      <a 
                        href="tel:+639273222484" 
                        className="text-decoration-none fw-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        +63 927 322 2484
                      </a>
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: 'var(--border-subtle)' }} className="my-4" />

                <div>
                  <p style={{ color: 'var(--text-secondary)' }} className="mb-3 small">Connect on social platforms:</p>
                  <Socials isAbout={true} />
                </div>
              </div>

              <div 
                className="mt-4 pt-3 d-flex align-items-center gap-2 small"
                style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
              >
                <FontAwesomeIcon icon={faLocationDot} style={{ color: 'var(--emerald-400)' }} />
                <span>Based in the Philippines • Available for remote opportunities</span>
              </div>
            </div>
          </Col>

          {/* Contact Form Column */}
          <Col lg={7}>
            <div 
              className="p-4 p-md-5"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              }}
            >
              <h4 className="mb-4" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                Send a Message
              </h4>

              {status.message && (
                <Alert 
                  variant={status.success ? 'success' : 'danger'} 
                  className="d-flex align-items-center mb-4"
                  style={{
                    background: status.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    borderColor: status.success ? 'var(--emerald-500)' : '#ef4444',
                    color: status.success ? 'var(--emerald-400)' : '#f87171',
                  }}
                >
                  <FontAwesomeIcon 
                    icon={status.success ? faCheckCircle : faExclamationCircle} 
                    className="me-2 fs-5" 
                  />
                  <div>{status.message}</div>
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="contactName">
                      <Form.Label className="small fw-medium" style={{ color: 'var(--text-secondary)' }}>
                        Your Name *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="py-2"
                        style={{
                          background: 'var(--bg-subtle)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-primary)',
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="contactEmail">
                      <Form.Label className="small fw-medium" style={{ color: 'var(--text-secondary)' }}>
                        Your Email *
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="py-2"
                        style={{
                          background: 'var(--bg-subtle)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-primary)',
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="contactSubject" className="mb-3">
                  <Form.Label className="small fw-medium" style={{ color: 'var(--text-secondary)' }}>
                    Subject *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity / Greeting"
                    required
                    className="py-2"
                    style={{
                      background: 'var(--bg-subtle)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="contactMessage" className="mb-4">
                  <Form.Label className="small fw-medium" style={{ color: 'var(--text-secondary)' }}>
                    Message *
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    style={{
                      background: 'var(--bg-subtle)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
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

                <Button
                  type="submit"
                  size="lg"
                  disabled={status.loading}
                  className="w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: 'var(--emerald-500)',
                    borderColor: 'var(--emerald-500)',
                    color: '#042417',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)',
                  }}
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
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
