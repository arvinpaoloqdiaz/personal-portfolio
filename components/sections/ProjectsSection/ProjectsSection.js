import Link from 'next/link';
import styles from './ProjectsSection.module.css';
import { supabase } from '@/lib/supabase';

async function fetchProjects() {
  try {
    const { data, error } = await supabase.from('projects').select('title, group, group_slug');
    if (error) return null; // null = DB error
    return data ?? [];
  } catch {
    return null;
  }
}

export default async function ProjectsSection() {
  const projects = await fetchProjects();
  const isDbDown = projects === null;
  const safeProjects = projects ?? [];

  // Build groups from project data (same logic as old getAllGroups())
  const groups = safeProjects.reduce((acc, project) => {
    if (!acc.find(g => g.slug === project.group_slug)) {
      acc.push({ name: project.group, slug: project.group_slug });
    }
    return acc;
  }, []);

  const allGroups = [...groups, { name: 'All Projects', slug: 'all' }];

  return (
    <section id="Projects" className="container mt-5 pb-5">
      <div className="row">
        <div className="col text-center mb-5">
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
            Featured Catalog
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
            Projects
          </h2>
          <p className="text-secondary mt-2 mb-0" style={{ fontSize: '0.95rem' }}>
            Browse projects categorized by technology stack & purpose.
          </p>
        </div>
      </div>

      {isDbDown ? (
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="alert alert-warning" role="alert">
              <strong>Projects are temporarily unavailable.</strong>
              <br />
              <span className="text-muted small">The database may be down. Please try again later.</span>
            </div>
          </div>
        </div>
      ) : safeProjects.length === 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-6 text-center text-muted">
            <p>No projects available at the moment.</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {allGroups.map((group, index) => {
            const projectCount =
              group.slug === 'all'
                ? safeProjects.length
                : safeProjects.filter(p => p.group_slug === group.slug).length;

            const browseText =
              group.slug === 'all' ? (
                <>
                  <span className={styles.highlightAll}>ALL</span>
                  <span>Browse complete catalog</span>
                </>
              ) : (
                <>
                  <span className={styles.highlightNumber}>{projectCount}</span>
                  <span>{projectCount === 1 ? 'Project' : 'Projects'}</span>
                </>
              );

            return (
              <div className="col-12 col-md-6 col-lg-4" key={`group-${index}`}>
                <Link
                  href={group.slug === 'all' ? '/projects' : `/projects?group=${group.slug}`}
                  className="text-decoration-none"
                >
                  <div
                    className={`h-100 text-center d-flex flex-column justify-content-between ${styles.groupCard}`}
                  >
                    <h3 className={styles.groupTitle}>{group.name}</h3>
                    <div className={`d-flex align-items-center justify-content-center ${styles.groupBody}`}>
                      <div className={styles.groupText}>{browseText}</div>
                    </div>
                    <div className={styles.cardFooter}>
                      <span>Explore category</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
