import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Trophy,
  GitCommit,
  Brain,
  Code2,
  Cpu,
  BookOpen,
  Activity,
  Heart
} from "lucide-react";

export const DetailedAbout = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Engineering Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From solving complex algorithmic problems to building scalable AI SaaS products.
            </p>
          </motion.div>

          {/* Stats Grid - LeetCode & GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LeetCode Section */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 border-l-4 border-yellow-500">
              <div className="flex items-center mb-6">
                <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">DSA & Problem Solving</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-600 dark:text-gray-300">Global Rating</span>
                  <span className="font-bold text-gray-900 dark:text-white text-lg">1,784 (Top 8%)</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-600 dark:text-gray-300">Problems Solved</span>
                  <span className="font-bold text-gray-900 dark:text-white">650+</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-600 dark:text-gray-300">Active Streak</span>
                  <span className="font-bold text-green-600 dark:text-green-400">360+ Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Achievements</span>
                  <span className="font-bold text-gray-900 dark:text-white">500 Days Badge</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                Completed the full AlgoMap DSA Sheet (300+ problems). Strong command of Graphs, DP, and Heaps.
              </p>
            </motion.div>

            {/* GitHub & Open Source Section */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 border-l-4 border-purple-500">
              <div className="flex items-center mb-6">
                <GitCommit className="w-8 h-8 text-purple-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Open Source & Activity</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-600 dark:text-gray-300">2025 Commits</span>
                  <span className="font-bold text-gray-900 dark:text-white">250+</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-600 dark:text-gray-300">Key Contributions</span>
                  <span className="font-bold text-gray-900 dark:text-white">Animation Nation</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-600 dark:text-gray-300">Hacktoberfest</span>
                  <span className="font-bold text-green-600 dark:text-green-400">Active Contributor</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Focus</span>
                  <span className="font-bold text-gray-900 dark:text-white">UI/UX & Frontend Logic</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                Maintains multiple production repositories including SpeakEasyAI and Dev Overflow.
              </p>
            </motion.div>
          </div>

          {/* Philosophy Section - Terminal Style */}
          <div className="mt-16 mx-auto max-w-4xl">
            <div className="rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-700 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400 font-mono">philosophy.ts</div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm md:text-base leading-relaxed">
                <div className="flex">
                  <span className="text-gray-500 mr-4 select-none">1</span>
                  <span className="text-purple-400">const</span> <span className="text-yellow-300 ml-2">engineeringPhilosophy</span> <span className="text-white mx-2">=</span> <span className="text-white">{`{`}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 mr-4 select-none">2</span>
                  <span className="text-blue-300 ml-8">core_principle:</span> <span className="text-green-400 ml-2">"Mindful Creation"</span><span className="text-white">,</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 mr-4 select-none">3</span>
                  <span className="text-blue-300 ml-8">inspiration:</span> <span className="text-green-400 ml-2">"Bhagavad Gita: Disciplined Action"</span><span className="text-white">,</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 mr-4 select-none">4</span>
                  <span className="text-blue-300 ml-8">goal:</span> <span className="text-green-400 ml-2">"Reduce friction. Increase creativity."</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 mr-4 select-none">5</span>
                  <span className="text-white">{`};`}</span>
                </div>
                <div className="flex mt-4">
                  <span className="text-gray-500 mr-4 select-none">6</span>
                  <span className="text-gray-400">// TODO: Build something that lasts.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Updated Technical Skills */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center mb-3">
                  <Code2 className="w-5 h-5 text-blue-500 mr-2" />
                  <h4 className="font-bold text-gray-900 dark:text-white">Languages & Frontend</h4>
                </div>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                  <li>JavaScript (ES6+) & TypeScript</li>
                  <li>React.js & Next.js 14</li>
                  <li>Redux Toolkit & Zustand</li>
                  <li>Tailwind CSS & Shadcn UI</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <Brain className="w-5 h-5 text-purple-500 mr-2" />
                  <h4 className="font-bold text-gray-900 dark:text-white">AI & Backend</h4>
                </div>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                  <li>Node.js & Express</li>
                  <li>OpenAI API (GPT-4, Whisper)</li>
                  <li>Groq & LangChain</li>
                  <li>PostgreSQL (NeonDB) & MongoDB</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <Cpu className="w-5 h-5 text-green-500 mr-2" />
                  <h4 className="font-bold text-gray-900 dark:text-white">System & DevOps</h4>
                </div>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                  <li>Docker & CI/CD Actions</li>
                  <li>AWS (S3, Lambda)</li>
                  <li>System Design (Caching, Rate Limiting)</li>
                  <li>Agile & TDD</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Experience Section (Condensed) */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h3>
            <div className="space-y-8 border-l-2 border-gray-200 dark:border-gray-700 pl-6 ml-2">
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white dark:ring-gray-900"></span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">AI Model Trainer</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Remotasks • Remote • Nov 2023 – May 2024</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Improved AI model performance by 30% through structured evaluation of 1,000+ responses and engineered 200+ coding prompts for RLHF.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-900"></span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Web Development Intern</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Yougetplaced • Remote • Sep 2022 – Dec 2022</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Built a MERN-stack Q&A platform (Stack Overflow Clone) and optimized MongoDB schemas for efficient querying.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
