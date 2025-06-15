/**
 * API Configuration to handle different environments
 */

// Base API URL for production (Vercel deployment)
const PRODUCTION_API_URL = 'https://blog-website-three-lilac.vercel.app/api';

// Base API URL for development (local)
const DEVELOPMENT_API_URL = '/api';

// Check if we're in production environment
const isProduction = import.meta.env.PROD || 
                     window.location.hostname.includes('vercel.app');

// Export the appropriate base API URL
export const API_BASE_URL = isProduction ? PRODUCTION_API_URL : DEVELOPMENT_API_URL;

/**
 * Helper function to create full API URLs
 * @param {string} endpoint - API endpoint path without leading slash
 * @returns {string} - Full API URL
 */
export const createApiUrl = (endpoint) => {
  // Remove leading slash if it exists
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // If we're in development, just return the relative path
  if (!isProduction) {
    return `/${cleanEndpoint}`;
  }
  
  // For production, return the absolute URL
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
