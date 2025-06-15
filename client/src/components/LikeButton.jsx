import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { createApiUrl } from '../utils/apiConfig';

export default function LikeButton({
  postId,
  initialLikes = [],
  className = "",
}) {
  const { currentUser } = useSelector((state) => state.user);
  const [likes, setLikes] = useState(initialLikes.length || 0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if current user has liked the post
    if (currentUser && initialLikes.includes(currentUser._id)) {
      setLiked(true);
    }
  }, [currentUser, initialLikes]);

  const handleLike = async () => {
    if (!currentUser) {
      // Redirect or show sign-in prompt
      alert("You need to be signed in to like posts");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(createApiUrl(`api/post/like/${postId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setLikes(data.likes);
        setLiked(data.liked);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      disabled={loading}
      size="sm"
      color="light"
      className={`flex items-center gap-2 hover:text-red-500 transition-colors ${className}`}
    >
      {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      <span>{likes > 0 ? likes : ""}</span>
    </Button>
  );
}
