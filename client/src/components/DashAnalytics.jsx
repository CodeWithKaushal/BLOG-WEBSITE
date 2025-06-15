import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button, Spinner } from "flowbite-react";
import { HiChartPie, HiDocumentReport } from "react-icons/hi";

export default function DashAnalytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postAnalytics, setPostAnalytics] = useState([]);
  const [userAnalytics, setUserAnalytics] = useState([]);
  const [commentAnalytics, setCommentAnalytics] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [engagementRate, setEngagementRate] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [timeRange, setTimeRange] = useState("weekly"); // 'weekly', 'monthly', 'yearly'

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        // In a real app, you would fetch data from your API
        // This is mockup data for demonstration
        const mockPostAnalytics = [
          { name: "Jan", posts: 4 },
          { name: "Feb", posts: 7 },
          { name: "Mar", posts: 5 },
          { name: "Apr", posts: 10 },
          { name: "May", posts: 8 },
          { name: "Jun", posts: 12 },
        ];

        const mockUserAnalytics = [
          { name: "Jan", users: 10 },
          { name: "Feb", users: 15 },
          { name: "Mar", users: 20 },
          { name: "Apr", users: 25 },
          { name: "May", users: 30 },
          { name: "Jun", users: 40 },
        ];

        const mockCommentAnalytics = [
          { name: "Jan", comments: 15 },
          { name: "Feb", comments: 20 },
          { name: "Mar", comments: 25 },
          { name: "Apr", comments: 30 },
          { name: "May", comments: 40 },
          { name: "Jun", comments: 45 },
        ];

        const mockCategoryData = [
          { name: "JavaScript", value: 30 },
          { name: "React.js", value: 25 },
          { name: "Next.js", value: 20 },
          { name: "Node.js", value: 15 },
          { name: "MongoDB", value: 10 },
        ];

        setPostAnalytics(mockPostAnalytics);
        setUserAnalytics(mockUserAnalytics);
        setCommentAnalytics(mockCommentAnalytics);
        setCategoryData(mockCategoryData);
        setEngagementRate(75);

        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch analytics data");
        setLoading(false);
        console.error(error);
      }
    };

    if (currentUser?.isAdmin) {
      fetchAnalytics();
    }
  }, [currentUser?.isAdmin, timeRange]);

  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl text-gray-500 mb-2">
          You don't have permission to access this page
        </p>
        <Button href="/" className="mt-4">
          Go back to home
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Spinner size="xl" />
        <p className="text-lg text-gray-500 mt-4">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl text-red-500 mb-2">Error: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">
          <HiChartPie className="inline-block mr-2 text-indigo-500" />
          Analytics Dashboard
        </h1>
        <div className="flex gap-2">
          <Button
            size="sm"
            color={timeRange === "weekly" ? "blue" : "gray"}
            onClick={() => setTimeRange("weekly")}
          >
            Weekly
          </Button>
          <Button
            size="sm"
            color={timeRange === "monthly" ? "blue" : "gray"}
            onClick={() => setTimeRange("monthly")}
          >
            Monthly
          </Button>
          <Button
            size="sm"
            color={timeRange === "yearly" ? "blue" : "gray"}
            onClick={() => setTimeRange("yearly")}
          >
            Yearly
          </Button>
          <Button size="sm" gradientDuoTone="purpleToPink">
            <HiDocumentReport className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-500 uppercase mb-2">
            Engagement Rate
          </h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{engagementRate}%</span>
            <span className="text-green-500 ml-2 text-sm">
              +5% from last month
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${engagementRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-500 uppercase mb-2">
            Active Users
          </h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">152</span>
            <span className="text-green-500 ml-2 text-sm">
              +12% from last month
            </span>
          </div>
          <p className="text-gray-500 mt-4">
            Daily active users on the platform
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-500 uppercase mb-2">
            New Content
          </h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">24</span>
            <span className="text-red-500 ml-2 text-sm">
              -3% from last month
            </span>
          </div>
          <p className="text-gray-500 mt-4">
            Posts created in the last 30 days
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Posts Analytics */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Posts Created</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={postAnalytics}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Analytics */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={userAnalytics}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comments Analytics */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Comments Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={commentAnalytics}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="#ff7300"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Content Categories</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Advanced Metrics Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Metric
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Value
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Change
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Average Time on Site
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  2m 45s
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                  +15.3%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Good
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Page Views
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  1,245
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                  +10.2%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Good
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Bounce Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  35.4%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                  +2.7%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Needs Improvement
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Avg. Comments per Post
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  4.2
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                  +8.6%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Good
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
