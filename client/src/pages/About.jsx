import {
  FaPython,
  FaJava,
  FaDatabase,
  FaChartBar,
  FaRobot,
  FaCode,
  FaCertificate,
  FaAward,
} from "react-icons/fa";
import {
  SiTableau,
  SiPowerbi,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
} from "react-icons/si";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center my-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
            About HackHub Blog
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Developer Profile Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Kaushal Divekar"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="text-md text-gray-600 dark:text-gray-300 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
                Kaushal Divekar
              </h2>
              <p className="text-xl font-medium text-purple-600 dark:text-purple-400 mb-3">
                Data Analyst & ML Engineer
              </p>
            </div>

            <p className="text-lg">
              Welcome to HackHub Blog! This platform was created by{" "}
              <span className="font-semibold">Kaushal Divekar</span> as a
              personal project to share knowledge and insights with the tech
              community. I'm a passionate Data Analyst & ML Engineer who loves
              to write about technology, coding, data science, and everything in
              between.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, data science,
              machine learning, and programming languages. I'm always learning
              and exploring new technologies, so be sure to check back often for
              new content!
            </p>

            <div className="flex gap-3 mt-4">
              <a
                href="https://www.kaushaldivekar.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all"
              >
                Visit Portfolio
              </a>
              <a
                href="https://github.com/CodeWithKaushal"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
              >
                <BsGithub />
                GitHub Profile
              </a>
            </div>

            <div className="flex gap-4 mt-2">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <BsLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                <BsTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Skills & Experience Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Skills Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
              <FaCode className="mr-3 text-purple-600" />
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-4 text-purple-600 dark:text-purple-400 border-b pb-2">
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <FaPython className="text-blue-500" />
                    <span>Python</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <FaDatabase className="text-orange-500" />
                    <span>SQL</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <FaJava className="text-red-500" />
                    <span>Java</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-purple-600 dark:text-purple-400 border-b pb-2">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <SiTableau className="text-blue-700" />
                    <span>Tableau</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <SiPowerbi className="text-yellow-500" />
                    <span>Power BI</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <FaChartBar className="text-green-500" />
                    <span>Excel</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-purple-600 dark:text-purple-400 border-b pb-2">
                  Libraries & Frameworks
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <SiPandas className="text-blue-600" />
                    <span>Pandas</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <SiNumpy className="text-blue-400" />
                    <span>NumPy</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <SiScikitlearn className="text-orange-500" />
                    <span>Scikit-learn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Experience Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
              <FaRobot className="mr-3 text-purple-600" />
              Education & Experience
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3 text-purple-600 dark:text-purple-400 border-b pb-2">
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold">
                      Bachelor of Engineering in Computer Engineering
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      2023 – Present
                    </p>
                    <p className="mt-1">
                      Atharva College of Engineering, Mumbai, India
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold">
                      Diploma in Computer Science and Engineering
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      2020 – 2023
                    </p>
                    <p className="mt-1">
                      P. R. Patil Institute of Polytechnic and Technology,
                      Mumbai, India
                    </p>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mt-1">
                      86%
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3 text-purple-600 dark:text-purple-400 border-b pb-2">
                  Experience Highlights
                </h3>
                <ul className="list-disc pl-5 space-y-3">
                  <li>1+ Years Experience as Data Analyst & ML Engineer</li>
                  <li>15+ Completed Data Science & ML Projects</li>
                  <li>Multiple Industry Certifications</li>
                  <li>Internship at Infosys as AI/ML Engineer</li>
                </ul>
              </div>

              <div>                <div className="flex items-center mb-3">
                  <FaAward className="text-2xl text-purple-600 mr-2" />
                  <h3 className="text-xl font-medium text-purple-600 dark:text-purple-400">
                    Key Certifications
                  </h3>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Data Engineering Professional Certification</li>
                  <li>Data Science – Certificate of Graduation</li>
                  <li>Machine Learning with Python</li>
                  <li>
                    <Link
                      to="/certifications"
                      className="text-blue-500 hover:underline"
                    >
                      View all certifications →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Info Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-xl shadow-lg text-white mb-16">
          <h2 className="text-2xl font-semibold mb-6">About HackHub Blog</h2>
          <div className="text-md flex flex-col gap-6">
            <p>
              HackHub Blog is a platform dedicated to sharing knowledge,
              tutorials, and insights about the latest trends in technology,
              data science, and programming. The blog aims to create a community
              of tech enthusiasts who can learn from each other and grow
              together.
            </p>
            <p>
              We cover a wide range of topics including but not limited to
              machine learning, data analysis, web development, programming best
              practices, and industry news. Our goal is to make complex
              technical concepts accessible to everyone, from beginners to
              experienced professionals.
            </p>
            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                to="/search"
                className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Browse Articles
              </Link>
              <Link
                to="/projects"
                className="px-4 py-2 border border-white text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
