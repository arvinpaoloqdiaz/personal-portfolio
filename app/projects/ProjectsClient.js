'use client';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';
import styles from './ProjectsPage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faArrowLeft, 
  faMagnifyingGlass, 
  faXmark 
} from "@fortawesome/free-solid-svg-icons";

function ProjectsContent({ projects, groups, isDbDown }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupParam = searchParams.get('group');

  // Match initial group from URL if present
  const [selectedGroupSlug, setSelectedGroupSlug] = useState(groupParam || null);
  const [searchQuery, setSearchQuery] = useState('');

  // Keep state synced if URL changes (e.g. back/forward button)
  useEffect(() => {
    setSelectedGroupSlug(groupParam || null);
  }, [groupParam]);

  const handleGroupSelect = (slug) => {
    setSelectedGroupSlug(slug);
    if (slug) {
      router.replace(`/projects?group=${slug}`, { scroll: false });
    } else {
      router.replace('/projects', { scroll: false });
    }
  };

  const currentGroup = useMemo(() => {
    return groups.find(g => g.slug === selectedGroupSlug) || null;
  }, [groups, selectedGroupSlug]);

  // Combined search and category filtering
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesGroup = !selectedGroupSlug || project.group_slug === selectedGroupSlug;
      if (!matchesGroup) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = project.title?.toLowerCase().includes(q);
      const descMatch = project.description?.toLowerCase().includes(q);
      const techMatch = (project.technologies || []).some(tech => tech.toLowerCase().includes(q));
      const groupMatch = project.group?.toLowerCase().includes(q);

      return titleMatch || descMatch || techMatch || groupMatch;
    });
  }, [projects, selectedGroupSlug, searchQuery]);

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
      <div className="text-center mb-4 pt-4">
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
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className={styles.searchControlsWrapper}>
        {/* Search Input */}
        <div className={styles.searchBarContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search projects by name, description, or tech stack (e.g. Next.js, Docker)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button
            type="button"
            onClick={() => handleGroupSelect(null)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: !selectedGroupSlug ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
              background: !selectedGroupSlug ? 'var(--emerald-pill-bg)' : 'var(--surface-card)',
              color: !selectedGroupSlug ? 'var(--emerald-400)' : 'var(--text-secondary)',
            }}
          >
            All Categories ({projects.length})
          </button>

          {groups.map((group) => {
            const count = projects.filter((p) => p.group_slug === group.slug).length;
            const isActive = selectedGroupSlug === group.slug;
            return (
              <button
                key={group.slug}
                type="button"
                onClick={() => handleGroupSelect(group.slug)}
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

      {/* Results Count Meta */}
      {(searchQuery || selectedGroupSlug) && (
        <div className={styles.resultsMeta}>
          <span>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'}
            {searchQuery && (
              <span> matching "<span className={styles.activeFiltersTag}>{searchQuery}</span>"</span>
            )}
            {currentGroup && (
              <span> in <span className={styles.activeFiltersTag}>{currentGroup.name}</span></span>
            )}
          </span>
          {(searchQuery || selectedGroupSlug) && (
            <button
              onClick={() => {
                setSearchQuery('');
                handleGroupSelect(null);
              }}
              className="btn btn-sm btn-link text-decoration-none p-0"
              style={{ color: 'var(--emerald-400)', fontSize: '0.85rem' }}
            >
              Reset filters
            </button>
          )}
        </div>
      )}

      {/* Project Cards Grid */}
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
                {searchQuery
                  ? `No results found for "${searchQuery}". Try a different keyword or clear your filters.`
                  : 'No projects matched this specific category.'}
              </p>
              <button 
                className="btn btn-outline-brand" 
                onClick={() => {
                  setSearchQuery('');
                  handleGroupSelect(null);
                }}
              >
                View All Projects
              </button>
            </div>
          </Col>
        </Row>
      )}

      {/* Bottom Conversion & Navigation Banner */}
      <div className={styles.bottomCtaWrapper}>
        <span className={styles.ctaEyebrow}>Have a project in mind?</span>
        <h3 className={styles.ctaHeading}>Let's build something remarkable together</h3>
        <p className={styles.ctaDescription}>
          Whether you need a full-stack web application, custom tooling, or architectural guidance, I'm open to discussing new opportunities.
        </p>

        <div className={styles.ctaButtonGroup}>
          <button
            className={styles.ctaPrimaryBtn}
            onClick={() => router.push('/contact')}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Get in Touch</span>
          </button>
          <button 
            className={styles.ctaSecondaryBtn} 
            onClick={() => router.push('/')}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </Container>
  );
}

export default function ProjectsClient(props) {
  return (
    <Suspense fallback={<div className="container pt-5 text-center text-muted">Loading projects...</div>}>
      <ProjectsContent {...props} />
    </Suspense>
  );
}


