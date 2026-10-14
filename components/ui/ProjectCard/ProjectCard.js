'use client';
import React from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCode } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ 
  title, 
  image_link, 
  description, 
  slug, 
  button_link, 
  repo_link, 
  tags = [],
  technologies = [],
}) => {
  const truncateDescription = (text, maxLength = 110) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <img 
          src={image_link} 
          alt={title}
          className={styles.cardImage}
          loading="lazy"
        />
        <div className={styles.imageOverlay} />
      </div>
      
      <div className={styles.cardContent}>
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
            className={styles.btnPrimary}
          >
            <span>View Details</span>
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

