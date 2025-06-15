/**
 * API Configuration to handle different environments
 */

// List all possible Vercel backend domains
const VERCEL_BACKEND_DOMAINS = [
  "https://blog-website-three-lilac.vercel.app",
  "https://blog-website-git-main-kaushals-projects-3a6db958.vercel.app",
  "https://blog-website-3xzdjtinl-kaushals-projects-3a6db958.vercel.app"
];

// Use the first domain as the main production API URL
const PRODUCTION_API_URL = `${VERCEL_BACKEND_DOMAINS[0]}/api`;
const DEVELOPMENT_API_URL = "/api";

// Detect if running on Vercel (frontend) or localhost
const isProduction =
  import.meta.env.PROD ||
  window.location.hostname.endsWith("vercel.app") ||
  VERCEL_BACKEND_DOMAINS.some(domain => window.location.origin.startsWith(domain));

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

  // Always use the main production API URL for production
  return `${PRODUCTION_API_URL}/${hasApiPrefix ? cleanEndpoint.substring(4) : cleanEndpoint}`;
};
