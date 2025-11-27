import React from 'react';
import { Hero, TechStack, About, Projects, Skills, Contact } from '../components/features';

const Home = () => {
  return (
    <div>
      <Hero className="py-20 bg-black dark:bg-gray-900" />
      <TechStack />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Home;