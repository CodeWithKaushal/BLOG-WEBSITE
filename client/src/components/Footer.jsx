import { Footer, Button, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsGlobe,
} from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import React, { useState } from "react";

export default function FooterCom() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // Here you would typically send this to your backend API
    console.log("Subscribing email:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <Footer
      container
      className="border border-t-8 border-t-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between gap-8 sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                HackHub
              </span>
              Blog
            </Link>

            <div className="mt-6 max-w-md">
              <h2 className="mb-3 text-sm font-semibold">
                Subscribe to our newsletter
              </h2>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <Button type="submit" color="success">
                  <HiMail className="mr-2 h-5 w-5" />
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </Button>
              </form>
              {subscribed && (
                <p className="mt-2 text-sm text-green-600">
                  Thank you for subscribing!
                </p>
              )}
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Stay updated with our latest articles, tutorials, and tech
                insights.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about" rel="noopener noreferrer">
                  HackHub Blog
                </Footer.Link>
                <Footer.Link href="/projects" rel="noopener noreferrer">
                  Projects
                </Footer.Link>
                <Footer.Link
                  href="https://www.kaushaldivekar.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Developer Portfolio
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/CodeWithKaushal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
                <Footer.Link
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
                <Footer.Link href="/terms">Terms &amp; Conditions</Footer.Link>
                <Footer.Link href="/cookies">Cookie Policy</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />

        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Footer.Copyright
              href="#"
              by="HackHub Blog"
              year={new Date().getFullYear()}
            />
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              Designed &amp; Developed with ❤️ by{" "}
              <a
                href="https://www.kaushaldivekar.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline ml-1 flex items-center"
              >
                Kaushal Divekar
                <BsGlobe className="ml-1" size={12} />
              </a>
            </span>
          </div>

          <div className="flex gap-4 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://github.com/CodeWithKaushal"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsLinkedin}
            />
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400">
          <p>
            Kaushal Divekar | Data Analyst &amp; ML Engineer | Mumbai, India
          </p>
        </div>
      </div>
    </Footer>
  );
}
