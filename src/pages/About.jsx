import React from 'react';
import { About as AboutSection, DetailedAbout } from '../components/features/about';
import { PageContainer } from '../components/layout';
import Seo from '../components/common/Seo';

const About = () => {
  return (
    <PageContainer>
      <Seo title="About Me" description="Learn more about Kartikey Kumar, a Full Stack Developer and AI Engineer with a passion for building scalable solutions." />
      <AboutSection />
      <DetailedAbout />
    </PageContainer>
  );
};

export default About;