import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn more about my background, experience, and what drives me as a developer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="/Kartikey_Kumar_Portfolio_Pic.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Full Stack Developer with a Passion for Creating Impactful Web Applications
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              I'm a software engineer with a passion for building systems that scale. My journey in software development began 5 years ago, and after graduating in 2022, I transitioned from a generalist web developer to specializing in Next.js and AI integrations. Over the past year, I've focused on shipping production-ready SaaS applications.
            </p>

            <p className="text-gray-600 dark:text-gray-300">
              When I'm not pushing code, I'm usually grinding LeetCode (650+ solved, Top 8% Global) or exploring new backend patterns in Node.js. I believe that the best applications are those that not only function flawlessly but also provide an intuitive and enjoyable user experience.
            </p>

            <div className="pt-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What I Bring to the Table
              </h4>

              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Strong problem-solving skills and attention to detail</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Experience with the full development lifecycle</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Collaborative approach and excellent communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Commitment to writing clean, maintainable code</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};