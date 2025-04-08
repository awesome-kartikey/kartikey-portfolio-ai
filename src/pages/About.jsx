import React from 'react';
import { About as AboutSection, DetailedAbout } from '../components/features/about';
import { PageContainer } from '../components/layout';

export const About = () => {
  return (
    <PageContainer>
      <AboutSection />
      <DetailedAbout />
    </PageContainer>
  );
};