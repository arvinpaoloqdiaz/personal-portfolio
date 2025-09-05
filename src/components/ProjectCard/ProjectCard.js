import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faCodeBranch } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ 
  title, 
  image_link, 
  description, 
  slug, 
  button_link, 
  repo_link, 
  tags = [] ,
  technologies=[],
}) => {
  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card className={`h-100 ${styles.projectCard}`}>
      <div className={styles.imageContainer}>
        <Card.Img 
          variant="top" 
          src={image_link} 
          alt={title}
          className={styles.cardImage}
        />
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold mb-3 text-brand">{title}</Card.Title>
        
        <Card.Text className="flex-grow-1 mb-3 text-secondary">
          {truncateDescription(description)}
        </Card.Text>

        {technologies && technologies.length > 0 && (
  <div className="mb-3">
    {([...technologies]
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, 3)
      .map((tag, index) => (
        <Badge 
          key={index} 
          bg="success" 
          className="me-1 mb-1 fst-normal"
        >
          {tag}
        </Badge>
    )))}
    {technologies.length > 3 && (
      <Badge bg="light" text="dark" className="me-1 mb-1 fst-normal">
        +{technologies.length - 3}
      </Badge>
    )}
  </div>
)}


        <div className="d-flex flex-column gap-2 mt-auto">
          <Link 
            to={`/project/${slug}`} 
            className="btn btn-brand-gradient rounded-pill"
          >
            View Details
          </Link>
          
          <div className="d-flex gap-2 w-100">
            {button_link && (
              <Button 
                variant="outline-danger" 
                size="sm" 
                as="a" 
                href={button_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-fill"
              >
                <FontAwesomeIcon icon={faBolt} /> Live Demo
              </Button>
            )}
            
            {repo_link && (
              <Button 
                variant="outline-secondary" 
                size="sm" 
                as="a" 
                href={repo_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-fill align-self-center"
              >
                <FontAwesomeIcon icon={faCodeBranch} /> Repo
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
