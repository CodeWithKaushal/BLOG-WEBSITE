/**
 * API Configuration to handle different environments
 */

// Base API URL for production (Vercel deployment)
const PRODUCTION_API_URL = "https://blog-website-three-lilac.vercel.app/api";

// Base API URL for development (local)
const DEVELOPMENT_API_URL = "/api";

// Check if we're in production environment
const isProduction =
  import.meta.env.PROD || window.location.hostname.includes("vercel.app");

// Export the appropriate base API URL
export const API_BASE_URL = isProduction
  ? PRODUCTION_API_URL
  : DEVELOPMENT_API_URL;

/**
 * Helper function to create full API URLs
 * @param {string} endpoint - API endpoint path without leading slash
 * @returns {string} - Full API URL
 */
export const createApiUrl = (endpoint) => {
  // Remove leading slash if it exists
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

  // Check if the endpoint already starts with 'api/'
  const hasApiPrefix = cleanEndpoint.startsWith("api/");

  // If we're in development
  if (!isProduction) {
    // If endpoint already has api/ prefix, just add a leading slash
    if (hasApiPrefix) {
      return `/${cleanEndpoint}`;
    }
    // Otherwise, add /api/ prefix
    return `${DEVELOPMENT_API_URL}/${cleanEndpoint}`;
  }

  // For production, handle the endpoint correctly with the production URL
  if (hasApiPrefix) {
    // If endpoint already has api/ prefix, replace it with the production URL's API path
    return `${PRODUCTION_API_URL.substring(
      0,
      PRODUCTION_API_URL.length - 4
    )}/${cleanEndpoint.substring(4)}`;
  }

  // Otherwise, add the endpoint to the production URL
  return `${PRODUCTION_API_URL}/${cleanEndpoint}`;
};
