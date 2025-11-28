// src/pages/BlogPost.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { queryHashnode } from '../services/hashnodeService';
import { PageContainer } from '../components/layout';
import Seo from '../components/common/Seo';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Loader,
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Share2,
  BookmarkPlus,
  Heart,
  MessageCircle,
  ChevronUp,
  Tag
} from 'lucide-react';

// Define the GraphQL query for fetching a single post by slug
const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        title
        slug
        publishedAt
        readTimeInMinutes
        content {
          html
        }
        coverImage {
          url
        }
        author {
          name
          profilePicture
        }
        tags {
           name
           slug
        }
        seo {
           title
           description
        }
      }
    }
  }
`;

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const articleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress into various animations
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.2], [1.1, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 1], [1, 0.8, 0.7, 0.7]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const variables = {
          host: import.meta.env.VITE_HASHNODE_HOST,
          slug: slug,
        };
        const response = await queryHashnode({ query: GET_POST_BY_SLUG_QUERY, variables });

        if (response.data?.publication?.post) {
          setPost(response.data.publication.post);
          // Fetch related posts could be implemented here based on tags
        } else {
          setError(`Blog post with slug "${slug}" not found.`);
        }
      } catch (err) {
        console.error(`Failed to fetch post ${slug}:`, err);
        setError('Failed to load the blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    // Set up scroll detection for "back to top" button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <PageContainer className="bg-white dark:bg-gray-900">
      {post && (
        <Seo 
          title={post.seo?.title || post.title} 
          description={post.seo?.description || post.brief || `${post.title} - Blog post by ${post.author?.name}`}
          type="article"
          href={`https://kartikey.is-a.dev/blog/${post.slug}`}
        />
      )}
      {/* Progress bar at the top of the page */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500 z-50"
        style={{ scaleX: progressBarWidth, transformOrigin: "0%" }}
      />

      <div className="max-w-4xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Blog List
          </Link>
        </motion.div>

        {loading && (
          <div className="flex flex-col justify-center items-center h-80">
            <Loader className="animate-spin w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading blog post...</p>
          </div>
        )}

        {error && (
          <motion.div
            {...fadeIn}
            className="text-center p-12 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800"
          >
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">Error</h2>
            <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
            <button
              onClick={() => navigate('/blog')}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
            >
              Return to Blog
            </button>
          </motion.div>
        )}

        {!loading && post && (
          <div ref={articleRef}>
            {/* Cover image with parallax effect */}
            {post.coverImage?.url && (
              <motion.div
                className="relative h-96 mb-10 rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img
                  src={post.coverImage.url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  style={{
                    scale: imageScale,
                    opacity: imageOpacity
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Title overlay on image */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8 text-white"
                  style={{ opacity: titleOpacity }}
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {post.title}
                  </h1>
                </motion.div>
              </motion.div>
            )}

            <motion.article
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {/* If no cover image, show title here */}
              {!post.coverImage?.url && (
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  {post.title}
                </motion.h1>
              )}

              {/* Article metadata */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-8 gap-x-6 gap-y-4 border-b border-gray-200 dark:border-gray-700 pb-6"
              >
                {/* Author info */}
                {post.author && (
                  <div className="flex items-center">
                    {post.author.profilePicture ? (
                      <img
                        src={post.author.profilePicture}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full mr-2 border-2 border-white dark:border-gray-800 shadow-sm"
                      />
                    ) : (
                      <User className="w-8 h-8 p-1 rounded-full mr-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400" />
                    )}
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 inline-block" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                </div>

                {/* Read time */}
                {post.readTimeInMinutes && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 inline-block" />
                    <span>{post.readTimeInMinutes} min read</span>
                  </div>
                )}
              </motion.div>

              {/* Tags */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-2 mb-10"
              >
                {post.tags?.map(tag => (
                  <span
                    key={tag.slug}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                  >
                    <Tag size={14} className="mr-1.5" />
                    {tag.name}
                  </span>
                ))}
              </motion.div>

              {/* Social sharing / actions */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-between items-center mb-10 gap-4"
              >
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <Share2 size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <BookmarkPlus size={18} />
                  </motion.button>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <Heart size={18} className="mr-1.5" />
                    <span>42</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <MessageCircle size={18} className="mr-1.5" />
                    <span>12</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Render the HTML content */}
              <motion.div
                variants={fadeInUp}
                className="prose-content relative"
              >
                {/* Add a subtle highlight effect to code blocks and blockquotes */}
                <style jsx>{`
                  .prose-content pre {
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    margin: 2rem 0;
                  }
                  
                  .prose-content blockquote {
                    border-left-width: 4px;
                    border-left-color: #3b82f6;
                    font-style: italic;
                    background-color: rgba(59, 130, 246, 0.1);
                    border-radius: 0.5rem;
                    padding: 1rem 1.5rem;
                  }
                  
                  .prose-content img {
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                  }
                  
                  .prose-content h2, .prose-content h3 {
                    border-bottom: 1px solid rgba(209, 213, 219, 0.5);
                    padding-bottom: 0.5rem;
                  }
                  
                  @media (prefers-color-scheme: dark) {
                    .prose-content blockquote {
                      background-color: rgba(59, 130, 246, 0.1);
                    }
                    
                    .prose-content h2, .prose-content h3 {
                      border-bottom-color: rgba(75, 85, 99, 0.5);
                    }
                  }
                `}</style>

                <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
              </motion.div>

              {/* Author bio section */}
              <motion.div
                variants={fadeInUp}
                className="mt-16 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {post.author?.profilePicture ? (
                    <img
                      src={post.author.profilePicture}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-lg mr-4 border-2 border-white dark:border-gray-800 shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg mr-4 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <User size={32} className="text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">About the author</h3>
                    <p className="text-gray-700 dark:text-gray-300">{post.author?.name}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Technical writer and web developer with a passion for creating intuitive, responsive web experiences.
                </p>
              </motion.div>

              {/* Related posts section */}
              {relatedPosts.length > 0 && (
                <motion.div
                  variants={fadeInUp}
                  className="mt-16"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Posts</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                      >
                        {relatedPost.coverImage?.url && (
                          <img
                            src={relatedPost.coverImage.url}
                            alt={relatedPost.title}
                            className="w-full h-32 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {relatedPost.brief}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Comment section placeholder */}
              <motion.div
                variants={fadeInUp}
                className="mt-16"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Comments are currently disabled for this post.
                  </p>
                </div>
              </motion.div>

              {/* Newsletter subscription */}
              <motion.div
                variants={fadeInUp}
                className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-100 dark:border-blue-800/30"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Subscribe to the newsletter</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Get the latest posts delivered right to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </motion.article>
          </div>
        )}

        {/* Floating back to top button */}
        <motion.button
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showScrollTop ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp size={24} />
        </motion.button>
      </div>
    </PageContainer>
  );
};


export default BlogPost;