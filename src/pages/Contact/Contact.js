import { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha"; // ✅ reCAPTCHA import
import styles from "./Contact.module.css";
import Seo from "../../components/Seo/Seo"; // adjust path

export default function Contact() {
  const form = useRef();
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setSubmitStatus("captchaError");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      console.log("SUCCESS!", result.text);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      recaptchaRef.current.reset(); // ✅ reset reCAPTCHA
      setCaptchaToken(null);

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.log("FAILED...", error.text);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
       <Seo
      title="Contact"
      description="Get in touch with Arvin for web development projects, collaborations, or inquiries."
      keywords={["contact", "web developer", "portfolio", "Arvin Diaz"]}
    />
      <Container className={styles.contactContainer} id="Contact">
        <Row className="mb-5">
          <Col className="text-center">
            <h1 className={styles.contactTitle}>Get In Touch</h1>
            <p className={styles.contactSubtitle}>
              I'm always open to discussing new opportunities, collaborations, or just chatting about tech.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={6}>
            <div className={styles.contactFormContainer}>
              <h4 className="mb-4">Send Me a Message</h4>

              {submitStatus === "success" && (
                <Alert variant="success" className={`mb-4 ${styles.alertSuccess}`}>
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Thank you! Your message has been sent successfully. I'll get back to you soon!
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert variant="danger" className="mb-4">
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Sorry! There was an error sending your message. Please try again.
                </Alert>
              )}

              {submitStatus === "captchaError" && (
                <Alert variant="warning" className="mb-4">
                  Please verify that you are not a robot.
                </Alert>
              )}

              <Form ref={form} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Floating className={`mb-3 ${styles.formFloating}`}>
                      <Form.Control
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Form.Label htmlFor="name">Name</Form.Label>
                    </Form.Floating>
                  </Col>
                  <Col md={6}>
                    <Form.Floating className={`mb-3 ${styles.formFloating}`}>
                      <Form.Control
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Label htmlFor="email">Email</Form.Label>
                    </Form.Floating>
                  </Col>
                </Row>

                <Form.Floating className={`mb-3 ${styles.formFloating}`}>
                  <Form.Control
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <Form.Label htmlFor="subject">Subject</Form.Label>
                </Form.Floating>

                <Form.Floating className={`mb-4 ${styles.formFloating} position-relative`}>
                  <Form.Control
                    id="message"
                    name="message"
                    as="textarea"
                    placeholder="Your Message"
                    style={{ height: "120px" }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={500}
                  />
                  <Form.Label htmlFor="message">Your Message</Form.Label>

                  <div className={`${styles.charCounter}`}>
                    {formData.message.length}/500
                  </div>
                </Form.Floating>

                <div className="mb-3 d-flex justify-content-center recaptcha-container">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                  />
                </div>

                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  className={`w-100 ${styles.btnBrand}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}
