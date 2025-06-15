import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      {" "}
      <div className="flex flex-col gap-6 py-16 md:py-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to HackHub Blog
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl">
          Your source for the latest insights on Web Development, Software
          Engineering, and Programming Languages. Discover tutorials, best
          practices, and industry news to enhance your technical skills.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline w-fit"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>{" "}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {" "}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        ) : (
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <p className="text-gray-500 mb-2">No posts found</p>
            <Link to="/create-post" className="text-teal-500 hover:underline">
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
