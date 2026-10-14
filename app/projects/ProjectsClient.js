'use client';
import { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';
import styles from './ProjectsPage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
            <div 
              className="p-5 text-center"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3 style={{ color: 'var(--text-primary)' }} className="mb-3">Projects Temporarily Unavailable</h3>
              <p style={{ color: 'var(--text-secondary)' }} className="mb-4">The database may be down. Please try again later.</p>
              <button 
                className="btn btn-outline-brand" 
                onClick={() => router.push('/')}
              >
                ← Back to Home
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="pt-5" style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
      <div className="text-center mb-5 pt-4">
        <span 
          style={{
            fontFamily: 'var(--font-mono-stack)',
            fontSize: '0.85rem',
            color: 'var(--emerald-400)',
            background: 'var(--emerald-pill-bg)',
            border: '1px solid rgba(52, 211, 153, 0.2)',
            padding: '0.25rem 0.85rem',
            borderRadius: 'var(--radius-pill)',
            display: 'inline-block',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Selected Works & Deployments
        </span>
        <h1 
          style={{ 
            fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', 
            fontWeight: 800, 
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
          className="mb-2"
        >
          {currentGroup ? currentGroup.name : 'All Projects'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto' }}>
          {currentGroup
            ? `Curated projects in the ${currentGroup.name} domain.`
            : 'Explore full-stack applications, interactive tools, and web experiments.'}
        </p>

        {/* Category Filter Pills */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setCurrentGroup(null)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: !currentGroup ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
              background: !currentGroup ? 'var(--emerald-pill-bg)' : 'var(--surface-card)',
              color: !currentGroup ? 'var(--emerald-400)' : 'var(--text-secondary)',
            }}
          >
            All Categories ({projects.length})
          </button>

          {groups.map((group) => {
            const count = projects.filter((p) => p.group_slug === group.slug).length;
            const isActive = currentGroup?.slug === group.slug;
            return (
              <button
                key={group.slug}
                type="button"
                onClick={() => setCurrentGroup(group)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--emerald-pill-bg)' : 'var(--surface-card)',
                  color: isActive ? 'var(--emerald-400)' : 'var(--text-secondary)',
                }}
              >
                {group.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <Row className="g-4">
          {filteredProjects.map((project) => (
            <Col key={project.slug} xs={12} md={6} lg={4}>
              <ProjectCard {...project} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="justify-content-center my-5">
          <Col md={8} className="text-center">
            <div 
              className="p-5"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h4 style={{ color: 'var(--text-primary)' }} className="mb-2">No Projects Found</h4>
              <p style={{ color: 'var(--text-secondary)' }} className="mb-4">
                No projects matched this specific category.
              </p>
              <button 
                className="btn btn-outline-brand" 
                onClick={() => setCurrentGroup(null)}
              >
                View All Projects
              </button>
            </div>
          </Col>
        </Row>
      )}

      <div className="d-flex justify-content-center gap-3 mt-5 pt-3">
        <button 
          className="btn btn-outline-brand" 
          onClick={() => router.push('/')}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          <span>Back to Home</span>
        </button>
        <button
          className="btn btn-brand"
          onClick={() => router.push('/contact')}
        >
          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
          <span>Get in Touch</span>
        </button>
      </div>
    </Container>
  );
}

