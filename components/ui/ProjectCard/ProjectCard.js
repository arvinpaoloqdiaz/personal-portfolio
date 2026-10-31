'use client';
import React from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowUpRightFromSquare, 
  faCode, 
  faArrowRight 
} from "@fortawesome/free-solid-svg-icons";

// Helper to normalize relative or irregular paths for browser rendering
function normalizeImagePath(src) {
  if (!src) return null;
  if (src.startsWith('../images/')) {
    return src.replace('../images/', '/images/');
  }
  if (src.startsWith('./images/')) {
    return src.replace('./images/', '/images/');
  }
  if (src.startsWith('images/')) {
    return `/${src}`;
  }
  return src;
}

// Derive project status without requiring DB schema changes
function resolveProjectStatus({ status, button_link, tags = [] }) {
  if (status) {
    const s = status.toLowerCase();
    if (s.includes('live') || s.includes('prod')) return { label: 'Live', style: styles.statusLive, pulse: true };
    if (s.includes('beta')) return { label: 'Beta', style: styles.statusBeta, pulse: true };
    if (s.includes('wip') || s.includes('progress') || s.includes('dev')) return { label: 'WIP', style: styles.statusWip, pulse: false };
    if (s.includes('archive')) return { label: 'Archive', style: styles.statusArchived, pulse: false };
    return { label: status, style: styles.statusLive, pulse: false };
  }

  // Fallback heuristics from existing data
  const tagStr = tags.map(t => t.toLowerCase()).join(' ');
  if (tagStr.includes('wip') || tagStr.includes('in-progress')) {
    return { label: 'WIP', style: styles.statusWip, pulse: false };
  }
  if (tagStr.includes('beta')) {
    return { label: 'Beta', style: styles.statusBeta, pulse: true };
  }
  if (button_link && button_link.trim() !== '') {
    return { label: 'Live', style: styles.statusLive, pulse: true };
  }

  return { label: 'Build', style: styles.statusLive, pulse: false };
}

const ProjectCard = ({ 
  title, 
  image_link, 
  description, 
  slug, 
  button_link, 
  repo_link, 
  group,
  status,
  tags = [],
  technologies = [],
}) => {
  const truncateDescription = (text, maxLength = 110) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const resolvedImage = normalizeImagePath(image_link);
  const statusConfig = resolveProjectStatus({ status, button_link, tags });

  return (
    <div className={styles.projectCard}>
      {/* Corner Status Ribbon */}
      <div className={styles.cornerRibbonContainer}>
        <div className={`${styles.cornerRibbon} ${statusConfig.style}`}>
          {statusConfig.pulse && <span className={styles.statusPulseDot} />}
          <span>{statusConfig.label}</span>
        </div>
      </div>

      <div className={styles.imageContainer}>
        {resolvedImage ? (
          <img 
            src={resolvedImage} 
            alt={title || 'Project image'}
            className={styles.cardImage}
            loading="lazy"
          />
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
            No image preview
          </div>
        )}
        <div className={styles.imageOverlay} />
      </div>
      
      <div className={styles.cardContent}>
        {group && (
          <div className={styles.cardHeaderTop}>
            <span className={styles.categoryPill}>{group}</span>
          </div>
        )}

        <h3 className={styles.cardTitle}>{title}</h3>
        
        <p className={styles.cardDescription}>
          {truncateDescription(description)}
        </p>

        {technologies && technologies.length > 0 && (
          <div className={styles.tagList}>
            {technologies.slice(0, 3).map((tag, index) => (
              <span key={index} className={styles.techBadge}>
                {tag}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className={styles.moreBadge}>
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        <div className={styles.actionsRow}>
          <Link 
            href={`/project/${slug}`} 
            className={styles.btnPrimaryGradient}
          >
            <span>View Details</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
          </Link>
          
          <div className={styles.secondaryActions}>
            {button_link && (
              <a 
                href={button_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.iconBtn}
                title="Live Demo"
                aria-label="Live Demo"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            )}
            
            {repo_link && (
              <a 
                href={repo_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.iconBtn}
                title="Source Code"
                aria-label="Source Code"
              >
                <FontAwesomeIcon icon={faCode} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;


