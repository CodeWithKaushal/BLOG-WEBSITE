import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";

export default function ShareButtons({ title, url }) {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold mb-2">Share this post</h3>
      <div className="flex space-x-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 text-blue-500 text-2xl"
          aria-label="Share on Facebook"
        >
          <FaFacebook />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-500 text-sky-400 text-2xl"
          aria-label="Share on Twitter"
        >
          <FaTwitter />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-800 text-blue-700 text-2xl"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-600 text-green-500 text-2xl"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp />
        </a>
        <button
          onClick={copyToClipboard}
          className="hover:text-gray-700 text-gray-600 text-2xl"
          aria-label="Copy link"
        >
          <FaLink />
        </button>
      </div>
    </div>
  );
}
