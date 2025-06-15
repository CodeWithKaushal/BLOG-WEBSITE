import { useState } from "react";
import { Button, Card, Badge } from "flowbite-react";
import { FaGithub, FaExternalLinkAlt, FaFilter, FaTags } from "react-icons/fa";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: 1,
      title: "Language Detector",
      description:
        "A web-based application using Natural Language Processing (NLP) and machine learning techniques to identify the language of given text input. Supports detection across multiple global languages with instant feedback in an intuitive user interface.",
      image:
        "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: ["nlp", "machine-learning"],
      skills: [
        "NLP",
        "Language Detection",
        "Machine Learning",
        "Python",
        "Flask",
      ],
      link: "https://github.com/CodeWithKaushal/Language-Detection-Model-using-Machine-Learning",
      demoLink: "https://language-detector-demo.vercel.app",
      featured: true,
    },
    {
      id: 2,
      title: "Disaster Tweet Prediction",
      description:
        "A web-based machine learning tool developed during Infosys Springboard internship that analyzes tweets to determine whether they pertain to a disaster. The system extracts relevant metadata like location, sentiment, and category to aid disaster response systems.",
      image:
        "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      category: ["nlp", "machine-learning"],
      skills: [
        "Disaster Prediction",
        "Tweet Analysis",
        "NLP",
        "Sentiment Analysis",
        "Classification",
      ],
      link: "https://github.com/CodeWithKaushal/Disaster-Tweet-Analyzer",
      featured: false,
    },
    {
      id: 3,
      title: "IPL Win Probability Predictor",
      description:
        "A real-time web application using machine learning algorithms trained on historical IPL data to forecast match outcomes dynamically. Takes into account factors like team strength, current match scenario, venue, recent form, and head-to-head statistics.",
      image:
        "https://images.unsplash.com/photo-1624006389438-55f0205aa0d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1046&q=80",
      category: ["machine-learning", "sports"],
      skills: [
        "IPL",
        "Cricket",
        "Machine Learning",
        "Predictive Analytics",
        "Python",
      ],
      link: "https://github.com/CodeWithKaushal/IPL-Win-Probability-Predictor-Project-End-to-End-Machine-Learning-Project",
      demoLink: "https://ipl-win-predictor.vercel.app",
      featured: true,
    },
    {
      id: 4,
      title: "Smart Contact Manager",
      description:
        "A comprehensive web application built with Spring Boot and Thymeleaf to help users organize and manage their contacts efficiently in one secure place. Features user authentication, personalized dashboard, CRUD operations for contacts, and search functionality.",
      image:
        "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: ["web", "java"],
      skills: ["Spring Boot", "Java", "Thymeleaf", "Bootstrap", "MySQL"],
      link: "https://github.com/CodeWithKaushal/Smart_Contact_Manager_SpringBoot",
      featured: false,
    },
    {
      id: 5,
      title: "Data Visualization Dashboard",
      description:
        "An interactive dashboard built with Python, Plotly, and Dash that visualizes complex datasets for business intelligence. Provides customizable charts, filters, and export options for data-driven decision making.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: ["data-science", "visualization"],
      skills: ["Python", "Plotly", "Dash", "Data Visualization", "Analytics"],
      link: "https://github.com/CodeWithKaushal/data-viz-dashboard",
      featured: true,
    },
    {
      id: 6,
      title: "AI Image Recognition API",
      description:
        "A robust REST API built with TensorFlow and Flask that provides image recognition capabilities. Identifies objects, scenes, and patterns in uploaded images with high accuracy.",
      image:
        "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      category: ["ai", "machine-learning"],
      skills: [
        "TensorFlow",
        "Flask",
        "Computer Vision",
        "REST API",
        "Deep Learning",
      ],
      link: "https://github.com/CodeWithKaushal/ai-image-recognition",
      featured: false,
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects.filter(
          (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : projects.filter(
          (project) =>
            project.category.includes(filter) &&
            (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              project.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Projects & Portfolio
          </h1>
          <p className="text-lg text-center max-w-3xl mx-auto opacity-90">
            Explore a collection of data science, machine learning, and web
            development projects by Kaushal Divekar. Each project demonstrates
            different skills and technologies.
          </p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <FaFilter className="mr-2 text-purple-600" />
              <h2 className="text-xl font-semibold">Filter Projects</h2>
            </div>
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              color={filter === "all" ? "purple" : "light"}
              onClick={() => setFilter("all")}
              className="transition-all"
            >
              All Projects
            </Button>
            <Button
              color={filter === "machine-learning" ? "purple" : "light"}
              onClick={() => setFilter("machine-learning")}
              className="transition-all"
            >
              Machine Learning
            </Button>
            <Button
              color={filter === "nlp" ? "purple" : "light"}
              onClick={() => setFilter("nlp")}
              className="transition-all"
            >
              NLP
            </Button>
            <Button
              color={filter === "web" ? "purple" : "light"}
              onClick={() => setFilter("web")}
              className="transition-all"
            >
              Web Development
            </Button>
            <Button
              color={filter === "data-science" ? "purple" : "light"}
              onClick={() => setFilter("data-science")}
              className="transition-all"
            >
              Data Science
            </Button>
            <Button
              color={filter === "ai" ? "purple" : "light"}
              onClick={() => setFilter("ai")}
              className="transition-all"
            >
              AI
            </Button>
            <Button
              color={filter === "sports" ? "purple" : "light"}
              onClick={() => setFilter("sports")}
              className="transition-all"
            >
              Sports
            </Button>
          </div>
        </div>

        {/* Featured Projects Section */}
        {filter === "all" && searchTerm === "" && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <div className="h-1 flex-grow bg-gradient-to-r from-purple-500 to-pink-500 ml-4"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter((project) => project.featured)
                .map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
                  >
                    <div className="relative">
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover object-center"
                      />
                    </div>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {project.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <FaTags className="text-purple-600 mt-1" />
                      {project.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          color="purple"
                          className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {project.skills.length > 3 && (
                        <Badge
                          color="purple"
                          className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        >
                          +{project.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3 mt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300"
                      >
                        <FaGithub className="mr-2" />
                        GitHub
                      </a>
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-purple-700 bg-white border border-purple-700 rounded-lg hover:bg-purple-50"
                        >
                          <FaExternalLinkAlt className="mr-2" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Projects Section */}
        <div>
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold">
              {filter === "all"
                ? "All Projects"
                : `${
                    filter.charAt(0).toUpperCase() + filter.slice(1)
                  } Projects`}
            </h2>
            <div className="h-1 flex-grow bg-gradient-to-r from-purple-500 to-pink-500 ml-4"></div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-purple-300"
                    >
                      View Project
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No projects match your search criteria.
              </p>
              <Button
                color="purple"
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Developer Bio Section */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Kaushal Divekar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Kaushal Divekar</h3>
          <p className="text-purple-600 dark:text-purple-400 mb-4">
            Data Analyst & Machine Learning Engineer
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            I'm passionate about solving complex problems using data science and
            machine learning techniques. My projects reflect my journey in
            exploring different technologies and methodologies in the field. If
            you're interested in collaborating or have any questions about my
            work, feel free to reach out!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.kaushaldivekar.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90"
            >
              Portfolio Website
            </a>
            <a
              href="https://github.com/CodeWithKaushal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
