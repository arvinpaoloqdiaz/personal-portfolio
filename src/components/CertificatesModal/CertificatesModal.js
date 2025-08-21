import styles from "./CertificatesModal.module.css";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";

export default function CertificatesModal({certificates}) {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Button to open the modal */}
      <Button
        variant="link"
        onClick={() => setShow(true)}
        className="btn-text-link-brand"
      >
        Certifications
      </Button>

      {/* Fullscreen Modal */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        fullscreen
        aria-labelledby="modal-styling-title"
        contentClassName={styles.modalContent}
      >
        <Modal.Header
          closeButton
          className={`border-bottom-0 text-white ${styles.btnClose}`}
        />

        <Modal.Body className="p-4">
          <Row className={`g-3 ${styles.certsGrid}`}>
            {certificates.length > 0 ? (
              certificates.map((cert, index) => (
                <Col key={index} xs={12} sm={6} md={4}>
                  <Card className={`h-100 text-start ${styles.certCard}`}>
                    <Card.Body>
                      <Card.Title className="fw-bold">{cert.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {cert.from}
                      </Card.Subtitle>
                      <div>
                        Issued on: <strong>{cert.date}</strong>
                      </div>
                      {cert.credential_id && (
                        <div>
                          Credential ID: <strong>{cert.credential_id}</strong>
                        </div>
                      )}
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-link-brand"
                        >
                          View Credential
                        </a>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">Loading certificates...</p>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
