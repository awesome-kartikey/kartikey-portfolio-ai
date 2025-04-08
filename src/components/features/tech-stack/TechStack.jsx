import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, Server, Globe, Box, Layers, Code2 } from 'lucide-react';

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
];

export const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 relative z-10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-white/50 before:to-white dark:before:from-transparent dark:before:via-black/50 dark:before:to-black before:-z-10 before:pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-4">
            My Tech Stack
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            These are the technologies I work with to build modern, scalable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-white/80 dark:bg-gray-700/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`mb-4 ${tech.color}`}>
                {tech.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {tech.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};