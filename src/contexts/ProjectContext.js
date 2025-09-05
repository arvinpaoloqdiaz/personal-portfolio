import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://raw.githubusercontent.com/arvinpaoloqdiaz/files/json/ProjectList.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data.ProjectList || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectBySlug = (slug) => {
    return projects.find(project => project.slug === slug);
  };

  const getProjectsByGroup = (groupSlug) => {
    return projects.filter(project => project.group_slug === groupSlug);
  };

  const getAllGroups = () => {
    const groups = projects.reduce((acc, project) => {
      if (!acc.find(group => group.slug === project.group_slug)) {
        acc.push({
          name: project.group,
          slug: project.group_slug
        });
      }
      return acc;
    }, []);
    return groups;
  };

  const value = {
    projects,
    loading,
    error,
    getProjectBySlug,
    getProjectsByGroup,
    getAllGroups
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
