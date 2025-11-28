// src/pages/BlogList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { queryHashnode } from '../services/hashnodeService';
import { PageContainer } from '../components/layout';
import Seo from '../components/common/Seo';
import { motion } from 'framer-motion';
import { Loader, Search, Calendar, Tag, ChevronRight } from 'lucide-react';

// Define the GraphQL query for fetching posts
const GET_POSTS_QUERY = `
  query GetPublicationPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      title
      posts(first: $first) {
        edges {
          node {
            id
            title
            brief
            slug
            publishedAt
            readTimeInMinutes
            coverImage {
              url
            }
            tags {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [publicationTitle, setPublicationTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const variables = {
          host: import.meta.env.VITE_HASHNODE_HOST,
          first: 20, // Fetch more posts
        };

        const response = await queryHashnode({ query: GET_POSTS_QUERY, variables });

        if (response.data?.publication?.posts?.edges) {
          const fetchedPosts = response.data.publication.posts.edges.map(edge => edge.node);
          setPosts(fetchedPosts);
          setFilteredPosts(fetchedPosts);
          setPublicationTitle(response.data.publication.title || 'My Blog');
        } else {
          setPosts([]);
          setFilteredPosts([]);
          setPublicationTitle('My Blog');
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term and active tag
  useEffect(() => {
    let results = posts;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.brief.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(term))
      );
    }

    if (activeTag) {
      results = results.filter(post =>
        post.tags.some(tag => tag.slug === activeTag)
      );
    }

    setFilteredPosts(results);
  }, [searchTerm, activeTag, posts]);

  // Get all unique tags
  const allTags = React.useMemo(() => {
    const tagsMap = new Map();
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagsMap.set(tag.slug, tag);
      });
    });
    return Array.from(tagsMap.values());
  }, [posts]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setActiveTag(null);
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }
  };

  return (
    <PageContainer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Seo 
        title={publicationTitle || 'Blog'} 
        description="Explore thoughts, tutorials, and insights about web development and design by Kartikey Kumar."
        href="https://kartikey.is-a.dev/blog"
      />
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {publicationTitle || 'Blog Posts'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore thoughts, tutorials, and insights about web development and design
          </p>
        </motion.div>

        {/* Search and filter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {(searchTerm || activeTag) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-300"
              >
                Clear filters
              </button>
            )}
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <motion.button
                  key={tag.slug}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTag(activeTag === tag.slug ? null : tag.slug)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeTag === tag.slug
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  {tag.name}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {loading && (
          <div className="flex flex-col justify-center items-center h-60">
            <Loader className="animate-spin w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading blog posts...</p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800"
          >
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </motion.div>
        )}

        {!loading && !error && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || activeTag ? 'Try different search terms or filters' : 'No blog posts available yet'}
            </p>
            {(searchTerm || activeTag) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}

        {!loading && !error && filteredPosts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  {post.coverImage?.url && (
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={post.coverImage.url}
                        alt={post.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {/* Post metadata */}
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 gap-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                          })}
                        </span>
                      </div>
                      {post.readTimeInMinutes && (
                        <span>{post.readTimeInMinutes} min read</span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h2>

                    {/* Brief */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.brief}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags?.slice(0, 3).map(tag => (
                        <span
                          key={tag.slug}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        >
                          <Tag size={12} className="mr-1" />
                          {tag.name}
                        </span>
                      ))}
                      {post.tags?.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Read more link */}
                    <div className="flex justify-end">
                      <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300">
                        Read more
                        <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </PageContainer>
  );
};

export default BlogList;