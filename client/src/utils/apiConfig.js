/**
 * Creates a properly formatted API URL based on the current environment
 * @param {string} endpoint - The API endpoint (should start with 'api/')
 * @returns {string} The complete API URL
 */
export const createApiUrl = (endpoint) => {
  // In production, we'll use relative URLs (which will be handled by the proxy or same domain)
  // In development or when explicitly needed, we'll use the full URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  // Make sure endpoint doesn't start with a slash and the result has one
  const formattedEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;

  // If API_BASE_URL is set, use it, otherwise use relative path
  if (API_BASE_URL) {
    // Ensure there's a trailing slash on the base URL if needed
    const baseWithTrailingSlash = API_BASE_URL.endsWith("/")
      ? API_BASE_URL
      : `${API_BASE_URL}/`;

    return `${baseWithTrailingSlash}${formattedEndpoint}`;
  }

  // Return relative path with leading slash
  return `/${formattedEndpoint}`;
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
