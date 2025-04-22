import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Code2 } from "lucide-react";

const projects = [
  {
    title: "Pathfinding Algorithm Visualizer",
    description:
      "An interactive web application that visualizes various pathfinding algorithms in real-time. Users can draw walls, set start/end points, and watch as algorithms like Dijkstra and A* find the shortest path.",
    image: "/project-screenshots/maze-pathfinder-visualizer.png",
    tags: ["React", "TypeScript", "Algorithms", "CSS Grid"],
    sourceCode:
      "https://github.com/awesome-kartikey/Pathfinder_Visualizer_Kartikey",
    liveDemo: "https://algomaze.netlify.app/",
    features: [
      "Multiple pathfinding algorithms",
      "Interactive grid system",
      "Animation controls",
      "Maze generation",
    ],
  },
  {
    title: "SmartBrain",
    description:
      "A full-stack face detection application that uses machine learning to detect faces in images. Features user authentication, profile management, and API integration with Clarifai.",
    image: "/project-screenshots/smartbrain-face-detection.png",
    tags: ["React", "Node.js", "PostgreSQL", "Machine Learning"],
    sourceCode: "https://github.com/awesome-kartikey/smart-brain",
    liveDemo: "https://intellieyes.netlify.app/",
    features: [
      "Face detection API integration",
      "User authentication",
      "Profile ranking system",
      "Responsive design",
    ],
  },
  {
    title: "Stack Overflow Clone",
    description:
      "A comprehensive clone of Stack Overflow with features like question posting, answering, voting, and tagging. Includes markdown support and real-time notifications.",
    image: "/project-screenshots/stack-overflow-clone-kartikey.png",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    sourceCode: "https://github.com/awesome-kartikey/Stack-Overflow-Kartikey",
    liveDemo: "https://stack-overflow-kartikey.netlify.app/",
    features: [
      "Question & Answer system",
      "Voting and reputation",
      "Tag management",
      "Search functionality",
    ],
  },
];

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="projects"
      className="py-20 bg-gray-50 dark:bg-gray-800 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A selection of my recent work and personal projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
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
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm font-medium hover:underline transition-all px-3 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  <Github className="w-4 h-4 mr-1" />
                  Source Code
                </a>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm font-medium hover:underline transition-all px-3 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"
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
