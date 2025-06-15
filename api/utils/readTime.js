// Utility function to calculate read time for blog posts
export const calculateReadTime = (content) => {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return readTime === 0 ? 1 : readTime; // Minimum 1 minute read time
};
