import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Database,
  Server,
  Globe,
  Box,
  Layers,
  Code2,
  GitBranch,
  Container,
  Palette,
  Radio,
  FileCode,
  Zap,
  Braces,
  Grid3x3
} from 'lucide-react';

const technologies = [
  {
    name: 'MongoDB',
    icon: <Database className="w-12 h-12" />,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    name: 'Express',
    icon: <Server className="w-12 h-12" />,
    color: 'text-gray-600 dark:text-gray-400',
  },
  {
    name: 'React',
    icon: <Globe className="w-12 h-12" />,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Node.js',
    icon: <Box className="w-12 h-12" />,
    color: 'text-green-700 dark:text-green-500',
  },
  {
    name: 'Redux',
    icon: <Layers className="w-12 h-12" />,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    name: 'PostgreSQL',
    icon: <Code2 className="w-12 h-12" />,
    color: 'text-blue-700 dark:text-blue-500',
  },
  {
    name: 'TypeScript',
    icon: <FileCode className="w-12 h-12" />,
    color: 'text-blue-500 dark:text-blue-400',
  },
  {
    name: 'Tailwind CSS',
    icon: <Palette className="w-12 h-12" />,
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    name: 'Git',
    icon: <GitBranch className="w-12 h-12" />,
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    name: 'Docker',
    icon: <Container className="w-12 h-12" />,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'REST APIs',
    icon: <Radio className="w-12 h-12" />,
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    name: 'Next.js',
    icon: <Zap className="w-12 h-12" />,
    color: 'text-gray-800 dark:text-white',
  },
  {
    name: 'Material-UI',
    icon: <Grid3x3 className="w-12 h-12" />,
    color: 'text-blue-500 dark:text-blue-400',
  },
  {
    name: 'WordPress',
    icon: <Braces className="w-12 h-12" />,
    color: 'text-blue-800 dark:text-blue-300',
  },
];

export const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Duplicate the array to create the infinite loop effect
  const techItems = [...technologies, ...technologies];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-4">Technologies</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            These are the technologies I work with to build modern, scalable applications
          </p>
        </motion.div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="flex w-max animate-scroll gap-8 hover:[animation-play-state:paused]">
          {techItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center w-32 h-32 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className={tech.color}>{tech.icon}</div>
              <span className="mt-2 font-medium text-gray-900 dark:text-white">{tech.name}</span>
            </div>
          ))}
        </div>
        {/* Gradient masks to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-gray-900"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-gray-900"></div>
      </div>
    </section>
  );
};