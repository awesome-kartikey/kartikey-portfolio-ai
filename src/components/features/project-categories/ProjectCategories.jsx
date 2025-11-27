import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { projectsData, projectCategories } from '../../../data/projectsData';

export const ProjectCategories = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get all projects or filter by category
  const getFilteredProjects = () => {
    let projects = [];
    if (activeCategory === 'all') {
      // Combine all projects from all categories
      projects = Object.values(projectsData).flat();
    } else {
      projects = projectsData[activeCategory] || [];
    }

    // Sort by priority (ascending), default to 999 if no priority
    return projects.sort((a, b) => {
      const priorityA = a.priority || 999;
      const priorityB = b.priority || 999;
      return priorityA - priorityB;
    });
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Project Categories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse my projects by technology category
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${activeCategory}-${project.title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.features && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Code2 className="w-4 h-4 mr-1" />
                      Key Features
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="p-6 pt-0 mt-auto border-t border-gray-100 dark:border-gray-600 flex justify-between">
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm font-medium"
                >
                  <Github className="w-4 h-4 mr-1" />
                  Source Code
                </a>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};