import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import Link from 'next/link';
import styles from './ProjectDetail.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faCode, faPhone, faDiagramProject, faFolderTree, faHouse } from "@fortawesome/free-solid-svg-icons";
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import { supabase } from '@/lib/supabase';

async function fetchProject(slug) {
  try {
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (error) return null;
    return data;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = await fetchProject(resolvedParams.slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: project.title,
    description: project.description.slice(0, 160),
    keywords: project.tags,
  };
}

export default async function ProjectDetail({ params }) {
  const resolvedParams = await params;
  const project = await fetchProject(resolvedParams.slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <Container className="mt-5 pt-5">
          <Row className="justify-content-center height-spacer">
            <Col md={8} className="text-center">
              <Alert variant="warning">
                <Alert.Heading>Project Not Found</Alert.Heading>
                <p>The project you're looking for <span className='text-danger fw-bold'>doesn't exist</span> or has been <span className='text-danger fw-bold'>removed</span>.</p>
                <div className="d-flex gap-2 justify-content-center">
                  <Link href="/projects" className="btn btn-outline-brand">
                    <FontAwesomeIcon icon={faFolderTree} /> View All Projects
                  </Link>
                  <Link href="/" className="btn btn-outline-dark rounded-pill border-2">
                    <FontAwesomeIcon icon={faHouse} /> Back to Home
                  </Link>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="mt-5 pt-5 pt-lg-0">
        <Row className="mb-4">
          <Col>
            <Link href="/projects" className="btn btn-outline-brand">
              ← All Projects
            </Link>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
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
              {project.group}
            </span>
            <h1 
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
              className="mb-2"
            >
              {project.title}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Stack of {project.technologies?.length || 0} technologies
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div className={styles.imageContainer}>
              <img
                src={project.image_link}
                alt={project.title}
                className={styles.projectImage}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div className={styles.detailsContainer}>
              <div className="mb-4">
                <h3 className="mb-3" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                  About This Project
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                  {project.description}
                </p>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-3 h5" style={{ color: 'var(--text-primary)' }}>Technologies Used</h4>
                  <div className={styles.tagsContainer}>
                    {project.technologies.map((tag, index) => (
                      <span
                        key={index}
                        className={styles.technology}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="mb-4" style={{ color: 'var(--text-muted)' }}>
                  <small className="me-2">Tags:</small>
                  {project.tags.map((tag, index) => (
                    <small
                      key={index}
                      className={styles.tag}
                      style={{ color: 'var(--text-muted)' }}
                    >
                      #{tag} {index < project.tags.length - 1 ? '• ' : ''}
                    </small>
                  ))}
                </div>
              )}

              <div className={styles.actionButtons}>
                <div className="d-flex flex-column flex-md-row gap-3">
                  {project.button_link && (
                    <a
                      href={project.button_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-brand rounded-pill btn-lg flex-fill d-flex align-items-center justify-content-center gap-2"
                    >
                      <FontAwesomeIcon icon={faRocket} />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {project.repo_link && (
                    <a
                      href={project.repo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-brand rounded-pill btn-lg flex-fill d-flex align-items-center justify-content-center gap-2"
                    >
                      <FontAwesomeIcon icon={faCode} />
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5 mb-4">
          <Col className="text-center">
            <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>Explore More</h3>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <Link href="/projects" className="btn btn-outline-brand rounded-pill">
                <FontAwesomeIcon icon={faFolderTree} className="me-2" />
                <span>All Projects</span>
              </Link>
              <Link href="/contact" className="btn btn-brand rounded-pill">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                <span>Get in Touch</span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
