import React from 'react';
import { Projects as ProjectsSection } from '../components/features/projects';
import { ProjectCategories } from '../components/features/project-categories';
import { PageContainer } from '../components/layout';

const Projects = () => {
  return (
    <PageContainer>
      <ProjectsSection />
      <ProjectCategories />
    </PageContainer>
  );
};

export default Projects;