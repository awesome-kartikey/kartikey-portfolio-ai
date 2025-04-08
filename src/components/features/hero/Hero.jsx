import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import ParticleField from '../three/ParticleField.jsx';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background - transparent to show particles */}
      <div className="absolute inset-0 -z-10 bg-transparent" />
      
      <ParticleField />
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.h2 
          className="text-blue-500 dark:text-blue-400 text-2xl sm:text-3xl font-semibold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Full Stack Web Developer
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
          I build modern, responsive web applications with React, Node.js, and other cutting-edge technologies. Let's create something amazing together.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
          >
            View My Work
            <ArrowRight className="ml-2 h-5 w-5" />
          </ScrollLink>
          
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="px-8 py-3 bg-gray-800 text-white hover:bg-gray-700 font-medium rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700"
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
    </section>
  );
};