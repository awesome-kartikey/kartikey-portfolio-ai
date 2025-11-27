import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Code2 } from "lucide-react";
import { SpotlightCard } from "../../ui/SpotlightCard";

const projects = [
  {
    title: "SpeakEasyAI (Video/Audio to Blog)",
    description:
      "An AI-powered SaaS app (Next.js 14, OpenAI, Stripe, Clerk, NeonDB, UploadThing) that converts video/audio files into SEO-friendly blog posts.",
    image: "/project-screenshots/speakeasyai-videoaudio-to-blog.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Clerk",
      "NeonDb",
      "PostgreSQL",
      "UploadThing",
      "OpenAI API",
      "Whisper API",
      "GPT API",
      "Stripe",
      "SaaS",
      "AI",
    ],
    sourceCode: "https://github.com/awesome-kartikey/speakeasyai",
    liveDemo: "https://videotonotes.vercel.app/",
    features: [
      "AI transcription (Whisper) & blog generation (GPT)",
      "Audio/Video file uploads (UploadThing)",
      "Authentication (Clerk)",
      "Subscription plans via Stripe",
      "User dashboard & post management",
      "Integrated Markdown editor",
      "Content export as Markdown",
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
    title: "Dev Overflow (Stack Overflow Clone Next.js 14)",
    description:
      "A modern Stack Overflow clone using Next.js 14, TypeScript, MongoDB, Clerk Auth, TinyMCE editor, AI answer generation (OpenAI), voting, reputation, collections.",
    image:
      "/project-screenshots/dev-overflow-stack-overflow-clone-nextjs-14.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "MongoDB",
      "Mongoose",
      "Clerk",
      "Authentication",
      "TinyMCE",
      "OpenAI API",
      "AI",
      "Server Actions",
    ],
    sourceCode: "https://github.com/awesome-kartikey/stack_overflow_nextjs14",
    liveDemo: "https://kartikey-dev-overflow.vercel.app/",
    features: [
      "Authentication (Clerk)",
      "Ask/Answer Questions (TinyMCE editor)",
      "Voting & Reputation System",
      "Save Questions to Collections",
      "User Profiles & Editing",
      "Community & Tags Pages",
      "Local & Global Search",
      "AI-Powered Answer Generation (OpenAI)",
      "Light/Dark Mode",
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
              className="h-full"
            >
              <SpotlightCard className="flex flex-col h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
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

                <div className="p-6 pt-0 mt-auto border-t border-gray-100 dark:border-gray-700 flex justify-between">
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
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
