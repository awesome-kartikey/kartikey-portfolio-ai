import React, { Suspense, lazy } from 'react';
import { Hero, TechStack } from '../components/features';
import Seo from '../components/common/Seo';
import Loading from '../components/common/Loading';

const About = lazy(() => import('../components/features/about/About').then(module => ({ default: module.About })));
const Projects = lazy(() => import('../components/features/projects/Projects').then(module => ({ default: module.Projects })));
const Skills = lazy(() => import('../components/features/skills/Skills').then(module => ({ default: module.Skills })));
const Contact = lazy(() => import('../components/features/contact/Contact').then(module => ({ default: module.Contact })));

const Home = () => {
  return (
    <div>
      <Seo title="Home" description="Kartikey Kumar - Full Stack Developer specializing in AI, Next.js, and building scalable SaaS products." />
      <Hero className="py-20 bg-black dark:bg-gray-900" />;
      <TechStack />
      <Suspense fallback={<Loading />}>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </Suspense>
    </div>
  );
};

export default Home;