'use client';

import { useState } from 'react';
import { Modal, Row, Col, Card } from 'react-bootstrap';
import styles from './CertificatesModal.module.css';

/**
 * Modern Certificates Modal Dialog
 * Rendered by parent and controlled via open state
 */
export default function CertificatesModal({
  certificates = [],
  show = false,
  onHide = () => {}
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      fullscreen
      aria-labelledby="certificates-modal-title"
      contentClassName={styles.modalContent}
    >
      <Modal.Header
        closeButton
        className={`border-bottom-0 ${styles.btnClose}`}
      >
        <Modal.Title id="certificates-modal-title" className={styles.modalHeaderTitle}>
          Certifications &amp; Credentials ({certificates.length})
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Row className={`g-4 ${styles.certsGrid}`}>
          {certificates.length > 0 ? (
            certificates.map((cert, index) => (
              <Col key={index} xs={12} sm={6} lg={4}>
                <Card className={`h-100 ${styles.certCard}`}>
                  <Card.Body className="d-flex flex-column justify-content-between p-4">
                    <div>
                      <div className={styles.issuerBadge}>{cert.from}</div>
                      <Card.Title className={styles.certHeading}>{cert.title}</Card.Title>
                      
                      <div className={styles.certMeta}>
                        <div>Issued on: <strong className={styles.certMetaHighlight}>{cert.date}</strong></div>
                        {cert.credential_id && (
                          <div className="mt-1">
                            ID: <code className={styles.certCode}>{cert.credential_id}</code>
                          </div>
                        )}
                      </div>
                    </div>

                    {cert.link && (
                      <div className="mt-3 pt-3 border-top border-secondary border-opacity-25">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.certLink}
                        >
                          <span>Verify Credential</span>
                          <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p className="text-center text-muted">No certificates found.</p>
            </Col>
          )}
        </Row>
      </Modal.Body>
    </Modal>
  );
}
