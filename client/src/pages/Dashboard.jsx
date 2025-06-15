import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Alert } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
import DashAnalytics from "../components/DashAnalytics";
import DashUserRoles from "../components/DashUserRoles";
import DashContentModeration from "../components/DashContentModeration";
import DashSettings from "../components/DashSettings";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    // Simulate loading time for dashboard components
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [location.search]);

  // Function to get the tab title
  const getTabTitle = () => {
    switch (tab) {
      case "profile":
        return "Profile";
      case "posts":
        return "Manage Posts";
      case "users":
        return "User Management";
      case "comments":
        return "Comment Management";
      case "analytics":
        return "Analytics Dashboard";
      case "user-roles":
        return "User Roles & Permissions";
      case "moderation":
        return "Content Moderation";
      case "settings":
        return "Site Settings";
      default:
        return "Dashboard Overview";
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      <div className="md:w-64 bg-white dark:bg-gray-800 shadow-lg z-10">
        {/* Sidebar */}
        <DashSidebar />
      </div>

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md mb-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {getTabTitle()}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {currentUser?.isAdmin
                ? "Admin Dashboard | HackHub Blog"
                : "User Dashboard | HackHub Blog"}
              <span className="ml-2 text-xs">
                Developed by{" "}
                <a
                  href="https://www.kaushaldivekar.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline"
                >
                  Kaushal Divekar
                </a>
              </span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mb-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Spinner size="xl" />
            </div>
          ) : !currentUser ? (
            <Alert color="failure" className="mb-10">
              Please sign in to access the dashboard.
            </Alert>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {/* profile */}
              {tab === "profile" && <DashProfile />}

              {/* posts */}
              {tab === "posts" && <DashPosts />}

              {/* users */}
              {tab === "users" && <DashUsers />}

              {/* comments */}
              {tab === "comments" && <DashComments />}

              {/* dashboard overview */}
              {(tab === "dash" || !tab) && <DashboardComp />}

              {/* advanced admin features */}
              {tab === "analytics" && <DashAnalytics />}
              {tab === "user-roles" && <DashUserRoles />}
              {tab === "moderation" && <DashContentModeration />}
              {tab === "settings" && <DashSettings />}
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} HackHub Blog. All rights reserved.
            </p>
            <p className="mt-1">
              Developed by{" "}
              <a
                href="https://www.kaushaldivekar.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline"
              >
                Kaushal Divekar
              </a>{" "}
              | Data Analyst & ML Engineer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
