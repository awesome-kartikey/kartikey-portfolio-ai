// src/services/hashnodeService.js

/**
 * Service for interacting with the Hashnode GraphQL API
 * 
 * This service provides functionality to fetch blog posts from a Hashnode publication
 * using their GraphQL API.
 */

/**
 * Query the Hashnode GraphQL API
 * 
 * @param {Object} options - Query options
 * @param {string} options.query - GraphQL query string
 * @param {Object} options.variables - Variables for the GraphQL query
 * @returns {Promise<Object>} - Promise that resolves to the query result
 */
export const queryHashnode = async ({ query, variables }) => {
    try {
      // Hashnode's GraphQL API endpoint
      const endpoint = 'https://gql.hashnode.com';
      
      // Send a POST request to the GraphQL API
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
  
      // Handle non-200 responses
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hashnode API responded with status ${response.status}: ${errorText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check for GraphQL errors
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        throw new Error(`GraphQL Error: ${data.errors[0].message}`);
      }
  
      return data;
    } catch (error) {
      console.error('Error querying Hashnode API:', error);
      throw error;
    }
  };
  
  /**
   * Fetch recent posts from a specified Hashnode publication
   * 
   * @param {string} host - The publication host (e.g., "yourusername.hashnode.dev")
   * @param {number} count - Number of posts to fetch (default: 10)
   * @returns {Promise<Array>} - Promise that resolves to an array of post objects
   */
  export const getRecentPosts = async (host, count = 10) => {
    const query = `
      query GetPublicationPosts($host: String!, $first: Int!) {
        publication(host: $host) {
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
  
    try {
      const response = await queryHashnode({
        query,
        variables: { host, first: count },
      });
  
      if (response.data?.publication?.posts?.edges) {
        return response.data.publication.posts.edges.map(edge => edge.node);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      throw error;
    }
  };
  
  /**
   * Fetch a single post by its slug
   * 
   * @param {string} host - The publication host (e.g., "yourusername.hashnode.dev")
   * @param {string} slug - The post slug
   * @returns {Promise<Object>} - Promise that resolves to the post object
   */
  export const getPostBySlug = async (host, slug) => {
    const query = `
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
  
    try {
      const response = await queryHashnode({
        query,
        variables: { host, slug },
      });
  
      if (response.data?.publication?.post) {
        return response.data.publication.post;
      }
      
      return null;
    } catch (error) {
      console.error(`Error fetching post with slug "${slug}":`, error);
      throw error;
    }
  };
  
  /**
   * Fetch posts by tag
   * 
   * @param {string} host - The publication host (e.g., "yourusername.hashnode.dev")
   * @param {string} tagSlug - The tag slug
   * @param {number} count - Number of posts to fetch (default: 10)
   * @returns {Promise<Array>} - Promise that resolves to an array of post objects
   */
  export const getPostsByTag = async (host, tagSlug, count = 10) => {
    const query = `
      query GetPostsByTag($host: String!, $tagSlug: String!, $first: Int!) {
        publication(host: $host) {
          posts(first: $first, filter: { tagSlugs: [$tagSlug] }) {
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
  
    try {
      const response = await queryHashnode({
        query,
        variables: { host, tagSlug, first: count },
      });
  
      if (response.data?.publication?.posts?.edges) {
        return response.data.publication.posts.edges.map(edge => edge.node);
      }
      
      return [];
    } catch (error) {
      console.error(`Error fetching posts with tag "${tagSlug}":`, error);
      throw error;
    }
  };
  
  export default {
    queryHashnode,
    getRecentPosts,
    getPostBySlug,
    getPostsByTag,
  };