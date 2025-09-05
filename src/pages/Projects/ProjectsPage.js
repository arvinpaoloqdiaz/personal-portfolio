import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner, Button, Dropdown } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectContext';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './ProjectsPage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const ProjectsPage = () => {
  const { group_slug } = useParams();
  const navigate = useNavigate();
  const { projects, loading, error, getProjectsByGroup, getAllGroups } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);

  useEffect(() => {
    if (loading || error) return;

    if (group_slug) {
      const groupProjects = getProjectsByGroup(group_slug);
      setFilteredProjects(groupProjects);
      
      // Find the current group name
      const groups = getAllGroups();
      const group = groups.find(g => g.slug === group_slug);
      setCurrentGroup(group);
    } else {
      setFilteredProjects(projects);
      setCurrentGroup(null);
    }
  }, [projects, loading, error, group_slug, getProjectsByGroup, getAllGroups]);

  const handleGroupFilter = (groupSlug) => {
    if (groupSlug) {
      navigate(`/projects/${groupSlug}`);
    } else {
      navigate('/projects');
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col className="text-center">
            <Spinner animation="border" variant="success" />
            <p className="mt-3">Loading projects...</p>
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
              <Alert.Heading>Error Loading Projects</Alert.Heading>
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

  const groups = getAllGroups();

  return (
    <Container className="mt-5">
      {/* Header */}
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="mb-3">
            {currentGroup ? currentGroup.name : 'All Projects'}
          </h1>
          <p className="text-secondary">
            {currentGroup 
              ? `Projects in ${currentGroup.name} category`
              : 'Explore my portfolio of web development projects'
            }
          </p>
        </Col>
      </Row>

      {/* Group Filter */}
      <Row className="mb-4">
        <Col className="text-center">
          <Dropdown className="d-inline-block">
            <Dropdown.Toggle variant="outline-brand" id="group-filter">
              {currentGroup ? currentGroup.name : 'All Categories'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
  <Dropdown.Item 
    onClick={() => handleGroupFilter(null)}
    active={!currentGroup}
    className={!currentGroup ? styles.dropdownItemActive : ""}
  >
    All Categories
  </Dropdown.Item>
  {groups.map((group) => (
    <Dropdown.Item 
      key={group.slug}
      onClick={() => handleGroupFilter(group.slug)}
      active={currentGroup?.slug === group.slug}
      className={currentGroup?.slug === group.slug ? styles.dropdownItemActive : ""}
    >
      {group.name}
    </Dropdown.Item>
  ))}
</Dropdown.Menu>

          </Dropdown>
        </Col>
      </Row>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <Row className="g-4">
          {filteredProjects.map((project) => (
            <Col key={project.slug} xs={12} md={6} lg={4}>
              <ProjectCard
                title={project.title}
                image_link={project.image_link}
                description={project.description}
                slug={project.slug}
                button_link={project.button_link}
                repo_link={project.repo_link}
                tags={project.tags}
                technologies={project.technologies}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Alert variant="info">
              <Alert.Heading>No Projects Found</Alert.Heading>
              <p>
                {currentGroup 
                  ? `No projects found in the ${currentGroup.name} category.`
                  : 'No projects available at the moment.'
                }
              </p>
              {currentGroup && (
                <Button 
                  variant="outline-info" 
                  onClick={() => navigate('/projects')}
                >
                  View All Projects
                </Button>
              )}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Back to Home */}
      <Row className="mt-5">
        <Col className="text-center">
          <Button 
            variant="outline-brand" 
            onClick={() => navigate('/')}
            className="me-3"
          >
            ← Back to Home
          </Button>
          <Button 
            variant="outline-dark rounded-pill py-2 px-3 border-2" 
            onClick={() => navigate('/contact')}
          >
           <FontAwesomeIcon icon={faPhone} /> Get in Touch
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectsPage;
