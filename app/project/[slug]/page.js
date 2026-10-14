import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import Link from 'next/link';
import styles from './ProjectDetail.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faCode, faPhone, faDiagramProject, faFolderTree, faHouse } from "@fortawesome/free-solid-svg-icons";
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
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
            <h1 className="mb-3">{project.title}</h1>
            <p className="text-muted mb-4">
              {project.group} • {project.technologies?.length || 0} technologies
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div className={styles.imageContainer}>
              <img
                src={project.image_link}
                alt={project.title}
                className={`img-fluid p-0 ${styles.projectImage}`}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <div className={styles.detailsContainer}>
              <div className="mb-4">
                <h3 className="mb-3">About This Project</h3>
                <p className="lead text-secondary">{project.description}</p>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-2">
                  <h4 className="mb-3">Technologies Used</h4>
                  <div className={styles.tagsContainer}>
                    {project.technologies.map((tag, index) => (
                      <Badge
                        key={index}
                        bg="success"
                        className={`me-1 mb-2 px-3 py-2 ${styles.technology}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="fst-italic text-muted">
                  <small>Tags: </small>
                  {project.tags.map((tag, index) => (
                    <small
                      key={index}
                      className={`text-muted text-center mb-2 me-1 ${styles.tag}`}
                    >
                      {tag} <span className='fst-normal text-brand'>|</span>
                    </small>
                  ))}
                </div>
              )}

              <div className={styles.actionButtons}>
                <h4 className="mb-3">Project Links</h4>
                <div className="d-flex flex-column flex-md-row gap-3">
                  {project.button_link && (
                    <a
                      href={project.button_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-brand rounded-pill btn-lg flex-fill"
                    >
                      <FontAwesomeIcon icon={faRocket} /> Live Demo
                    </a>
                  )}

                  {project.repo_link && (
                    <a
                      href={project.repo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-brand rounded-pill btn-lg flex-fill"
                    >
                      <FontAwesomeIcon icon={faCode} /> View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="text-center">
            <h3 className="mb-4">Explore More Projects</h3>
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <Link href="/projects" className="btn btn-outline-brand rounded-pill">
                <FontAwesomeIcon icon={faFolderTree} /> View All Projects
              </Link>
              <Link href="/contact" className="btn btn-outline-dark align-self-center py-2 rounded-pill border-2">
                <FontAwesomeIcon icon={faPhone} /> Get In Touch
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
