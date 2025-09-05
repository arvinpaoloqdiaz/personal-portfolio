import React from 'react';
import { Container, Row, Col, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectContext';
import styles from './ProjectDetail.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faCode, faPhone, faDiagramProject, faFolderTree, faHouse} from "@fortawesome/free-solid-svg-icons";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProjectBySlug, loading, error } = useProjects();
  
  const project = getProjectBySlug(slug);

  if (loading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col className="text-center">
            <Spinner animation="border" variant="success" />
            <p className="mt-3">Loading project details...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading>Error Loading Project</Alert.Heading>
              <p>{error}</p>
              <Button 
                variant="outline-danger" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="mt-5 pt-5">
        <Row className="justify-content-center height-spacer">
          <Col md={8} className="text-center">
            <Alert variant="warning">
              <Alert.Heading>Project Not Found</Alert.Heading>
              <p>The project you're looking for <span className='text-danger fw-bold'>doesn't exist</span> or has been <span className='text-danger fw-bold'>removed</span>.</p>
              <div className="d-flex gap-2 justify-content-center">
                <Button 
                  variant="outline-brand" 
                  onClick={() => navigate('/projects')}
                >
                 <FontAwesomeIcon icon={faFolderTree} /> View All Projects
                </Button>
                <Button 
                  variant="outline-dark rounded-pill border-2" 
                  onClick={() => navigate('/')}
                >
                  <FontAwesomeIcon icon={faHouse} /> Back to Home
                </Button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      {/* Back Navigation */}
      <Row className="mb-4">
        <Col>
          <Button 
            variant="outline-secondary border-0 rounded-pill" 
            onClick={() => navigate(-1)}
            className="me-2"
          >
            ← Back
          </Button>
          <Link 
            to="/projects" 
            className="btn btn-outline-brand"
          >
            All Projects
          </Link>
        </Col>
      </Row>

      {/* Project Header */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto text-center">
          <h1 className="mb-3">{project.title}</h1>
          <p className="text-muted mb-4">
            {project.group} • {project.technologies?.length || 0} technologies
          </p>
          
        </Col>
      </Row>

      {/* Project Image */}
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

      {/* Project Details */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <div className={styles.detailsContainer}>
            {/* Description */}
            <div className="mb-4">
              <h3 className="mb-3">About This Project</h3>
              <p className="lead text-secondary">{project.description}</p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-2">
                <h4 className="mb-3">Technologies Used</h4>
                <div className={styles.tagsContainer}>
                  {project.technologies.map((tag, index) => (
                    <Badge 
                      key={index} 
                      bg="success" 
                      className={`me-1 mb-2  px-3 py-2 ${styles.technology}`}
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
                    className={` text-muted text-center mb-2 me-1 ${styles.tag}`}
                  >
                    {tag} <span className='fst-normal text-brand'>|</span>
                  </small>
                ))}
              </div>
            
          )}
            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <h4 className="mb-3">Project Links</h4>
              <div className="d-flex flex-column flex-md-row gap-3">
                {project.button_link && (
                  <Button 
                    variant="brand rounded-pill" 
                    size="lg" 
                    as="a" 
                    href={project.button_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-fill"
                  >
                    <FontAwesomeIcon icon={faRocket} /> Live Demo
                  </Button>
                )}
                
                {project.repo_link && (
                  <Button 
                    variant="outline-brand rounded-pill" 
                    size="lg" 
                    as="a" 
                    href={project.repo_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-fill"
                  >
                    <FontAwesomeIcon icon={faCode} /> View Code
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Related Projects */}
      <Row className="mt-5">
        <Col className="text-center">
          <h3 className="mb-4">Explore More Projects</h3>
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
            <Link 
              to="/projects" 
              className="btn btn-outline-brand rounded-pill"
            >
             <FontAwesomeIcon icon={faFolderTree} /> View All Projects
            </Link>
            <Link 
              to={`/projects/${project.group_slug}`} 
              className="btn btn-outline-danger rounded-pill align-self-center py-2 border-2"
            >
              <FontAwesomeIcon icon={faDiagramProject} /> More in {project.group}
            </Link>
            <Link 
              to="/contact" 
              className="btn btn-outline-dark align-self-center py-2 rounded-pill border-2"
            >
              <FontAwesomeIcon icon={faPhone} /> Get In Touch
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetail;
