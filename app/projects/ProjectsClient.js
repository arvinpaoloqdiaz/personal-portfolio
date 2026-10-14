'use client';
import { useState } from 'react';
import { Container, Row, Col, Dropdown, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import styles from './ProjectsPage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function ProjectsClient({ projects, groups, isDbDown }) {
  const router = useRouter();
  const [currentGroup, setCurrentGroup] = useState(null);

  const filteredProjects = currentGroup 
    ? projects.filter((p) => p.group_slug === currentGroup.slug)
    : projects;

  if (isDbDown) {
    return (
      <Container className="mt-5 pt-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Alert variant="warning">
              <Alert.Heading>Projects Temporarily Unavailable</Alert.Heading>
              <p>The database may be down. Please try again later.</p>
              <Button variant="outline-warning" onClick={() => router.push('/')}>
                ← Back to Home
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleGroupFilter = (groupSlug) => {
    if (groupSlug) {
      const group = groups.find(g => g.slug === groupSlug);
      setCurrentGroup(group);
    } else {
      setCurrentGroup(null);
    }
  };

  return (
    <Container className="mt-5 pt-5 pt-lg-0">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="mb-3">{currentGroup ? currentGroup.name : 'All Projects'}</h1>
          <p className="text-secondary">
            {currentGroup
              ? `Projects in ${currentGroup.name} category`
              : 'Explore my portfolio of web development projects'}
          </p>
        </Col>
      </Row>

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

      {filteredProjects.length > 0 ? (
        <Row className="g-4">
          {filteredProjects.map((project) => (
            <Col key={project.slug} xs={12} md={6} lg={4}>
              <ProjectCard {...project} />
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
                  : 'No projects available at the moment.'}
              </p>
              {currentGroup && (
                <Button variant="outline-info" onClick={() => handleGroupFilter(null)}>
                  View All Projects
                </Button>
              )}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mt-5">
        <Col className="text-center">
          <Button variant="outline-brand" onClick={() => router.push('/')} className="me-3">
            ← Back to Home
          </Button>
          <Button
            variant="outline-dark rounded-pill py-2 px-3 border-2"
            onClick={() => router.push('/contact')}
          >
            <FontAwesomeIcon icon={faPhone} /> Get in Touch
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
