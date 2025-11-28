import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import ParticleField from '../three/ParticleField.jsx';
import VideoModal from '../../ui/VideoModal.jsx';

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background - transparent to show particles */}
      <div className="absolute inset-0 -z-10 bg-transparent" />

      <ParticleField />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
          </span>
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            Available for Full-time Roles
          </span>
        </motion.div>

        <motion.h2
          className="text-blue-500 dark:text-blue-400 text-2xl sm:text-3xl font-semibold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Full Stack Developer & AI Engineer
        </motion.h2>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hi, I'm <span className="text-blue-500 dark:text-blue-300">Kartikey Kumar</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Building scalable SaaS applications with Next.js 14, AWS, and OpenAI. 1+ year of experience shipping modern, production-ready web applications.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer"
          >
            View My Work
            <ArrowRight className="ml-2 h-5 w-5" />
          </ScrollLink>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2"
          >
            <Play className="h-5 w-5 fill-current" />
            Watch Intro
          </button>

          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="px-8 py-3 bg-transparent text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center cursor-pointer"
          >
            Contact Me
          </ScrollLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-300 mb-2">Scroll Down</span>
          <svg
            className="w-6 h-6 text-gray-500 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId="samiRev8iVM"
      />
    </section>
  );
};