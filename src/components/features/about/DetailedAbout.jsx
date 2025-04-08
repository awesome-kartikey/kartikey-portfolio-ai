import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const DetailedAbout = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            My Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A deeper look into my background, experiences, and what drives me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Education
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Computer Science Degree
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  University of Technology, 2016-2020
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Specialized in web development and software engineering. Graduated with honors.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Advanced Web Development Certification
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Tech Academy, 2021
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Intensive program focused on modern JavaScript frameworks and backend technologies.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Work Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Work Experience
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Senior Frontend Developer
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Tech Innovations Inc., 2022-Present
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Leading the frontend team in developing responsive and accessible web applications using React and Next.js.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Full Stack Developer
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Digital Solutions Ltd., 2020-2022
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Worked on various projects implementing both frontend and backend solutions using MERN stack.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills & Expertise Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Frontend
                </h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>React & Next.js</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>TypeScript</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Tailwind CSS</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Framer Motion</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Backend
                </h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Node.js & Express</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>MongoDB & PostgreSQL</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>GraphQL</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Supabase</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Personal Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Personal Interests
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Beyond coding, I'm passionate about several activities that keep me balanced and inspired:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2 text-xl">•</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Open Source Contribution
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    I regularly contribute to open source projects, particularly those focused on accessibility and education.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2 text-xl">•</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tech Mentoring
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    I enjoy mentoring junior developers and participating in coding bootcamps as a guest instructor.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2 text-xl">•</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Photography & Travel
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    When not coding, I love exploring new places and capturing moments through photography.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};