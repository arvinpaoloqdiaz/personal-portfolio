import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faBoxesStacked,
  faServer,
  faCode,
  faLaptopCode,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectsSection.module.css';
import { supabase } from '@/lib/supabase';

async function fetchProjects() {
  try {
    const { data, error } = await supabase.from('projects').select('title, group, group_slug');
    if (error) return null;
    return data ?? [];
  } catch {
    return null;
  }
}

// Icon helper per group category
function getGroupIcon(slug) {
  if (slug === 'all') return faLayerGroup;
  if (slug.includes('full-stack') || slug.includes('web')) return faLaptopCode;
  if (slug.includes('backend') || slug.includes('api')) return faServer;
  if (slug.includes('devops') || slug.includes('cloud')) return faBoxesStacked;
  return faCode;
}

export default async function ProjectsSection() {
  const projects = await fetchProjects();
  const isDbDown = projects === null;
  const safeProjects = projects ?? [];

  // Build unique groups from database projects
  const groups = safeProjects.reduce((acc, project) => {
    if (!acc.find(g => g.slug === project.group_slug)) {
      acc.push({ name: project.group, slug: project.group_slug });
    }
    return acc;
  }, []);

  // Place "All Projects" at the end of the catalog cards
  const allGroups = [...groups, { name: 'All Projects', slug: 'all' }];

  return (
    <section id="Projects" className={`container ${styles.projectsWrapper}`}>
      {/* ── SECTION HEADER ── */}
      <div className="row">
        <div className={`col ${styles.headerSection}`}>
          <span className={styles.eyebrow}>Featured Catalog</span>
          <h2 className={styles.heading}>Projects</h2>
          <p className={styles.subheading}>
            Explore practical applications &amp; deployments categorized by domain &amp; stack.
          </p>
        </div>
      </div>

      {/* ── DATABASE / EMPTY STATES ── */}
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
        /* ── REINVENTED CATEGORY BENTO CARDS ── */
        <div className="row g-4">
          {allGroups.map((group, index) => {
            const isAll = group.slug === 'all';
            const projectCount = isAll
              ? safeProjects.length
              : safeProjects.filter(p => p.group_slug === group.slug).length;

            const icon = getGroupIcon(group.slug);

            return (
              <div className="col-12 col-md-6 col-lg-4" key={`group-${index}`}>
                <Link
                  href={isAll ? '/projects' : `/projects?group=${group.slug}`}
                  className="text-decoration-none"
                >
                  <div className={`${styles.groupCard} ${isAll ? styles.allProjectsCard : ''}`}>
                    {/* Top Row: Icon + Count Badge */}
                    <div className={styles.cardTopRow}>
                      <div className={styles.iconBox}>
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      <div className={styles.countBadge}>
                        <span className={styles.countNumber}>{projectCount}</span>
                        <span className={styles.countLabel}>
                          {projectCount === 1 ? 'Project' : 'Projects'}
                        </span>
                      </div>
                    </div>

                    {/* Middle: Title & Context */}
                    <div className={styles.cardMiddle}>
                      <h3 className={styles.groupTitle}>{group.name}</h3>
                      <p className={styles.groupHint}>
                        {isAll
                          ? 'Browse the complete portfolio catalog across all domains'
                          : `Curated showcase of ${projectCount} ${projectCount === 1 ? 'build' : 'builds'} in this space`}
                      </p>
                    </div>

                    {/* Footer: Action with directional arrow */}
                    <div className={styles.cardFooter}>
                      <span>{isAll ? 'View All Projects' : 'Explore Category'}</span>
                      <span className={styles.arrowIcon}>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </span>
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
