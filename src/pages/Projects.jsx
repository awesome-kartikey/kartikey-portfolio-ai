import React from 'react';
import { Projects as ProjectsSection } from '../components/features/projects';
import { ProjectCategories } from '../components/features/project-categories';
import { PageContainer } from '../components/layout';
import Seo from '../components/common/Seo';

const Projects = () => {
  return (
    <PageContainer>
      <Seo title="Projects" description="Explore the portfolio of Kartikey Kumar, featuring AI-powered applications, SaaS platforms, and open-source contributions." />
      <ProjectsSection />
      <ProjectCategories />
    </PageContainer>
  );
};

export default Projects;