import { Container, Row, Col, Alert } from 'react-bootstrap';
import Link from 'next/link';
import styles from './ProjectDetail.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faRocket, 
  faCode, 
  faEnvelope, 
  faFolderTree, 
  faArrowLeft, 
  faLayerGroup,
  faCalendarCheck,
  faTags
} from "@fortawesome/free-solid-svg-icons";
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

function normalizeImagePath(src) {
  if (!src) return null;
  if (src.startsWith('../images/')) return src.replace('../images/', '/images/');
  if (src.startsWith('./images/')) return src.replace('./images/', '/images/');
  if (src.startsWith('images/')) return `/${src}`;
  return src;
}

function resolveProjectStatus({ status, button_link, tags = [] }) {
  if (status) {
    const s = status.toLowerCase();
    if (s.includes('live') || s.includes('prod')) return { label: 'Live in Production', style: styles.statusLive, pulse: true };
    if (s.includes('beta')) return { label: 'Beta Release', style: styles.statusBeta, pulse: true };
    if (s.includes('wip') || s.includes('progress') || s.includes('dev')) return { label: 'In Active Development', style: styles.statusWip, pulse: false };
    return { label: status, style: styles.statusLive, pulse: false };
  }

  const tagStr = (tags || []).map(t => t.toLowerCase()).join(' ');
  if (tagStr.includes('wip') || tagStr.includes('in-progress')) {
    return { label: 'In Active Development', style: styles.statusWip, pulse: false };
  }
  if (tagStr.includes('beta')) {
    return { label: 'Beta Release', style: styles.statusBeta, pulse: true };
  }
  if (button_link && button_link.trim() !== '') {
    return { label: 'Live Deployment', style: styles.statusLive, pulse: true };
  }

  return { label: 'Completed Project', style: styles.statusLive, pulse: false };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = await fetchProject(resolvedParams.slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} | Projects`,
    description: project.description ? project.description.slice(0, 160) : '',
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
              <Alert variant="warning" className="p-4" style={{ borderRadius: 'var(--radius-lg)' }}>
                <Alert.Heading>Project Not Found</Alert.Heading>
                <p>The project you're looking for doesn't exist or has been moved.</p>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <Link href="/projects" className="btn btn-outline-brand">
                    <FontAwesomeIcon icon={faFolderTree} className="me-2" />
                    <span>View All Projects</span>
                  </Link>
                  <Link href="/" className="btn btn-brand">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    <span>Back to Home</span>
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

  const imageSrc = normalizeImagePath(project.image_link);
  const statusConfig = resolveProjectStatus(project);

  return (
    <>
      <Navbar />
      <Container className={styles.pageWrapper}>
        {/* Navigation & Status Header */}
        <div className={styles.navHeader}>
          <Link href="/projects" className={styles.backBtn}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to Projects</span>
          </Link>

          <div className={`${styles.heroStatusBadge} ${statusConfig.style}`}>
            {statusConfig.pulse && <span className={styles.statusPulseDot} />}
            <span>{statusConfig.label}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className={styles.heroSection}>
          {project.group && (
            <span className={styles.categoryEyebrow}>
              {project.group}
            </span>
          )}
          <h1 className={styles.projectTitle}>
            {project.title}
          </h1>
        </div>

        {/* Featured Showcase Card (Screenshot + Action Bar) */}
        <div className={styles.showcaseCard}>
          <div className={styles.imageWrapper}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={project.title}
                className={styles.projectImage}
              />
            ) : (
              <div className="p-5 text-center text-muted">No screenshot available</div>
            )}
            <div className={styles.imageOverlayGradient} />
          </div>

          {/* Action Bar */}
          <div className={styles.showcaseActionBar}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Built with {project.technologies?.length || 0} core technologies
            </span>
            <div className={styles.showcaseActionsGroup}>
              {project.button_link && (
                <a
                  href={project.button_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnLiveGradient}
                >
                  <FontAwesomeIcon icon={faRocket} />
                  <span>Launch Live Demo</span>
                </a>
              )}

              {project.repo_link && (
                <a
                  href={project.repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnCodeOutline}
                >
                  <FontAwesomeIcon icon={faCode} />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Content: Main Description + Architecture Sidebar */}
        <Row className="g-4">
          <Col lg={8}>
            <div className={styles.contentCard}>
              <h3 className={styles.sectionHeading}>
                Project Overview
              </h3>
              <div className={styles.projectDescription}>
                {project.description}
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className={styles.sidebarCard}>
              {/* Tech Stack */}
              {project.technologies && project.technologies.length > 0 && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Technologies & Tools</span>
                  <div className={styles.tagsContainer}>
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className={styles.technology}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Domain */}
              {project.group && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Domain / Classification</span>
                  <div className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faLayerGroup} style={{ color: 'var(--emerald-400)', fontSize: '0.85rem' }} />
                    <span className={styles.metaValue}>{project.group}</span>
                  </div>
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Topics & Keywords</span>
                  <div className={styles.tagsContainer}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className={styles.hashTag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Bottom CTA & Navigation Banner */}
        <div className={styles.bottomCtaWrapper}>
          <span className={styles.ctaEyebrow}>Interested in this project?</span>
          <h3 className={styles.ctaHeading}>Let's talk about building your next idea</h3>
          <p className={styles.ctaDescription}>
            I design and engineer reliable web systems, APIs, and modern frontends.
          </p>

          <div className={styles.ctaButtonGroup}>
            <Link href="/contact" className={styles.ctaPrimaryBtn}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Get in Touch</span>
            </Link>
            <Link href="/projects" className={styles.ctaSecondaryBtn}>
              <FontAwesomeIcon icon={faFolderTree} />
              <span>Explore More Projects</span>
            </Link>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

