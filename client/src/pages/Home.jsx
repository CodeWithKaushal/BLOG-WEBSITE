import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { FaCode, FaDatabase, FaRobot, FaChartLine } from "react-icons/fa";
import { createApiUrl } from "../utils/apiConfig";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(createApiUrl("api/post/getPosts"));
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

  // Trending topics data
  const trendingTopics = [
    {
      name: "Machine Learning",
      icon: <FaRobot className="text-2xl text-purple-600" />,
      description: "Deep learning, neural networks, and AI applications",
    },
    {
      name: "Data Analysis",
      icon: <FaChartLine className="text-2xl text-indigo-600" />,
      description: "Statistical methods and data visualization techniques",
    },
    {
      name: "Web Development",
      icon: <FaCode className="text-2xl text-pink-600" />,
      description: "Frontend, backend, and full-stack development",
    },
    {
      name: "Databases",
      icon: <FaDatabase className="text-2xl text-teal-600" />,
      description: "SQL, NoSQL, and data modeling approaches",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="flex flex-col gap-6 px-3 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl font-bold lg:text-6xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
                Welcome to HackHub Blog
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl mt-4">
                Your source for the latest insights on Web Development, Data
                Science, Machine Learning, and Programming Languages. Discover
                tutorials, best practices, and industry news to enhance your
                technical skills.
              </p>
              <div className="flex gap-4 mt-8">
                <Link
                  to="/search"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition duration-300 font-medium"
                >
                  Explore Articles
                </Link>
                <a
                  href="https://www.kaushaldivekar.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition duration-300 font-medium"
                >
                  Developer Portfolio
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
                  alt="HackHub Blog - Coding"
                  className="w-full h-72 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Topics Section */}
      <div className="py-14 px-3 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Explore Trending Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500"
            >
              <div className="flex items-center mb-3">
                {topic.icon}
                <h3 className="text-lg font-semibold ml-3">{topic.name}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Latest Articles
        </h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-center gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-purple-500 hover:underline text-center mt-4 font-medium"
            >
              View all articles
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

      {/* Developer Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-2">
            Developed by Kaushal Divekar
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Data Analyst & Machine Learning Engineer
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Passionate about creating data-driven solutions and sharing
            knowledge through articles and tutorials. Visit my portfolio to
            learn more about my projects and expertise.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.kaushaldivekar.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition duration-300"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/CodeWithKaushal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
