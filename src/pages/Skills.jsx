import React from 'react';
import { Skills as SkillsSection } from '../components/features/skills';
import { PageContainer } from '../components/layout';
import Seo from '../components/common/Seo';

const Skills = () => {
  return (
    <PageContainer>
      <Seo title="Skills" description="Technical skills of Kartikey Kumar including Next.js, React, Node.js, AWS, and AI/LLM integration." />
      <SkillsSection />
    </PageContainer>
  );
};

export default Skills;