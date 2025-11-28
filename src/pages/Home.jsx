import React from 'react';
import { Hero, TechStack, About, Projects, Skills, Contact } from '../components/features';
import Seo from '../components/common/Seo';

const Home = () => {
  return (
    <div>
      <Seo title="Home" description="Kartikey Kumar - Full Stack Developer specializing in AI, Next.js, and building scalable SaaS products." />
      <Hero className="py-20 bg-black dark:bg-gray-900" />;
    </div>
  );
};

export default Home;