import { useEffect, useState } from 'react';

import PostCard from './PostCard';

export default function RelatedPosts({ postId, category, tags = [] }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        // Get posts with same category, excluding current post
        // Limit to 3 related posts
        const res = await fetch(`/api/post/getposts?category=${category}&limit=3`);
        const data = await res.json();
        
        if (res.ok) {
          // Filter out current post
          const filtered = data.posts.filter(post => post._id !== postId);
          setRelatedPosts(filtered);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRelatedPosts();
  }, [postId, category]);

  if (loading) return <div className="animate-pulse h-20"></div>;
  
  if (relatedPosts.length === 0) return null;
  
  return (
    <div className="mt-10 mb-5">
      <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}