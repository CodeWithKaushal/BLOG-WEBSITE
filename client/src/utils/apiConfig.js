// API Configuration for consistent API URL management

const API_BASE_URLS = {
  development: "http://localhost:3000/",
  production: "https://blog-website-three-lilac.vercel.app/",
};

// Determine the current environment
const currentEnvironment = process.env.NODE_ENV || "development";

// Get the appropriate base URL
const getApiBaseUrl = () => {
  return API_BASE_URLS[currentEnvironment] || API_BASE_URLS.development;
};

// Create a full API URL from a path
export const createApiUrl = (path) => {
  const baseUrl = getApiBaseUrl();
  // Remove leading slash from path if it exists
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${baseUrl}${cleanPath}`;
};

export default {
  createApiUrl,
  getApiBaseUrl,
};

/**
 * Alternative helper function to create full API URLs with environment detection
 * @param {string} endpoint - API endpoint path without leading slash
 * @returns {string} - Full API URL
 */
export const createEnvApiUrl = (endpoint) => {
  // Remove leading slash if it exists
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

  // Check if the endpoint already starts with 'api/'
  const hasApiPrefix = cleanEndpoint.startsWith("api/");

  // Define these variables if not already defined elsewhere
  const isProduction = process.env.NODE_ENV === "production";
  const DEVELOPMENT_API_URL = "/api";
  const PRODUCTION_API_URL = "/api";

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
  return `${PRODUCTION_API_URL}/${
    hasApiPrefix ? cleanEndpoint.substring(4) : cleanEndpoint
  }`;
};
