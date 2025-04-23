import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
          {/* Updated Intro from Resume Summary */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Full Stack Developer proficient in JavaScript, TypeScript, React,
            Node.js, and Python. Experienced in building MERN stack applications
            and enhancing AI model performance through prompt engineering and
            evaluation. Seeking to leverage expertise in developing
            user-centric, scalable web solutions and AI-driven tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Education Section - Updated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Education & Certifications
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Bachelor of Computer Applications
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Indira Gandhi National Open University, Jul 2018 – Jun 2022
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Relevant Coursework: Data Structures, Algorithms, OOP,
                  Software Engineering, Computer Networks, Database Management.
                  Key Project: Cineplex (Java/JSP MVC movie booking system).
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Zero To Mastery Academy
                </h4>
                {/* <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Online Platform
                </p> */}
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Completed courses including Complete Web Developer, Advanced
                  JavaScript Concepts, and Node.js Developer.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Work Experience Section - Updated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Experience
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Model Trainer
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Remotasks (Remote), Nov 2023 – May 2024
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Improved AI model performance by 30% via evaluation of 1000+
                  responses. Engineered 200+ complex prompts, enhancing code
                  generation accuracy by 25%. Collaborated on prompt strategies,
                  boosting model versatility by 40%.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Web Development Intern
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Yougetplaced (Remote), Sep 2022 – Dec 2022
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Built a MERN stack Stack Overflow clone. Developed RESTful
                  APIs (Node.js/Express) and a responsive React frontend.
                  Implemented MongoDB schemas using Mongoose.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills & Expertise Section - Updated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 md:col-span-2" // Span across two columns on medium screens
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {" "}
              {/* Use 3 columns inside */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Frontend
                </h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  {[
                    "React.js",
                    "Next.js 14",
                    "Redux",
                    "Tailwind CSS",
                    "Shadcn UI",
                    "Material UI",
                    "HTML5",
                    "CSS3",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">
                        •
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Backend & Databases
                </h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  {[
                    "Node.js",
                    "Express.js",
                    "REST APIs",
                    "GraphQL (Apollo)",
                    "Convex",
                    "Prisma",
                    "Server Actions",
                    "PostgreSQL",
                    "MongoDB",
                    "Redis",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-green-600 dark:text-green-400 mr-2">
                        •
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  AI, DevOps & Tools
                </h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  {[
                    "JavaScript (ES6+)",
                    "TypeScript",
                    "Python",
                    "OpenAI API (GPT, Whisper)",
                    "Llama",
                    "Groq",
                    "Prompt Engineering",
                    "Git/GitHub",
                    "Docker",
                    "Vercel",
                    "AWS (S3, Lambda)",
                    "Clerk Auth",
                    "Stripe",
                    "Jest",
                    "Agile/Scrum",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">
                        •
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Personal Interests Section - Updated */}
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
              Outside of technology, I enjoy activities that promote well-being
              and continuous growth:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2 text-xl">
                  •
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Fitness
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Staying active through Jump Rope, Gym sessions, and Yoga.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2 text-xl">
                  •
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Reading
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Exploring ideas and knowledge through Non-fiction and
                    Spirtual books.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2 text-xl">
                  •
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Anime
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Appreciating Japanese animation for storytelling and art
                    style.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2 text-xl">
                  •
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Continuous Learning
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Passionate about constantly acquiring new skills and
                    knowledge, especially in the tech field.
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
