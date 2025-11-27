import React from 'react';
import { About as AboutSection, DetailedAbout } from '../components/features/about';
import { PageContainer } from '../components/layout';

const About = () => {
  return (
    <PageContainer>
      <AboutSection />
      <DetailedAbout />
    </PageContainer>
  );
};

export default About;