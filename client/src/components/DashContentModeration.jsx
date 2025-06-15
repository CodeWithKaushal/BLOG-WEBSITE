import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  Modal,
  TextInput,
  Badge,
  Spinner,
  Tabs,
  Alert,
} from "flowbite-react";
import {
  HiOutlineExclamationCircle,
  HiEye,
  HiOutlineBan,
  HiCheckCircle,
  HiOutlineFlag,
  HiTrash,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashContentModeration() {
  const { currentUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("reported");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportedContent, setReportedContent] = useState({
    posts: [],
    comments: [],
  });
  const [pendingContent, setPendingContent] = useState({
    posts: [],
    comments: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchReportedContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // In a real app, you'd fetch from your API
        // Mocking data for demonstration
        const mockReportedPosts = [
          {
            _id: "p1",
            title: "Controversial Post Title",
            slug: "controversial-post",
            content: "This post contains potentially misleading information...",
            image: "https://via.placeholder.com/150",
            createdAt: new Date(2023, 5, 15),
            reportCount: 5,
            reportReason: "Misinformation",
            user: {
              username: "user123",
              profilePicture: "https://via.placeholder.com/50",
            },
          },
          {
            _id: "p2",
            title: "Another Reported Post",
            slug: "another-reported-post",
            content: "This post violates community guidelines...",
            image: "https://via.placeholder.com/150",
            createdAt: new Date(2023, 6, 20),
            reportCount: 3,
            reportReason: "Inappropriate content",
            user: {
              username: "user456",
              profilePicture: "https://via.placeholder.com/50",
            },
          },
        ];

        const mockReportedComments = [
          {
            _id: "c1",
            content: "This comment contains offensive language...",
            createdAt: new Date(2023, 6, 18),
            post: {
              _id: "p1",
              title: "Original Post Title",
              slug: "original-post",
            },
            reportCount: 4,
            reportReason: "Harassment",
            user: {
              username: "user789",
              profilePicture: "https://via.placeholder.com/50",
            },
          },
        ];

        const mockPendingPosts = [
          {
            _id: "p3",
            title: "Pending Approval Post",
            slug: "pending-approval-post",
            content: "This post is waiting for moderator approval...",
            image: "https://via.placeholder.com/150",
            createdAt: new Date(2023, 7, 1),
            user: {
              username: "newuser123",
              profilePicture: "https://via.placeholder.com/50",
            },
          },
        ];

        const mockPendingComments = [
          {
            _id: "c2",
            content: "This comment needs review before publishing...",
            createdAt: new Date(2023, 7, 2),
            post: {
              _id: "p2",
              title: "Another Post",
              slug: "another-post",
            },
            user: {
              username: "newuser456",
              profilePicture: "https://via.placeholder.com/50",
            },
          },
        ];

        setReportedContent({
          posts: mockReportedPosts,
          comments: mockReportedComments,
        });

        setPendingContent({
          posts: mockPendingPosts,
          comments: mockPendingComments,
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load content moderation data");
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) {
      fetchReportedContent();
    }
  }, [currentUser?.isAdmin]);

  const handleAction = (item, action, type) => {
    setSelectedItem({ ...item, type });
    setModalAction(action);
    setShowModal(true);
  };

  const executeAction = async () => {
    setShowModal(false);

    // In a real app, you'd call your API here
    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update UI based on action
      if (selectedItem.type === "post") {
        if (activeTab === "reported") {
          setReportedContent((prev) => ({
            ...prev,
            posts: prev.posts.filter((post) => post._id !== selectedItem._id),
          }));
        } else {
          setPendingContent((prev) => ({
            ...prev,
            posts: prev.posts.filter((post) => post._id !== selectedItem._id),
          }));
        }
      } else {
        if (activeTab === "reported") {
          setReportedContent((prev) => ({
            ...prev,
            comments: prev.comments.filter(
              (comment) => comment._id !== selectedItem._id
            ),
          }));
        } else {
          setPendingContent((prev) => ({
            ...prev,
            comments: prev.comments.filter(
              (comment) => comment._id !== selectedItem._id
            ),
          }));
        }
      }

      setSuccessMsg(
        `Content has been ${
          modalAction === "approve"
            ? "approved"
            : modalAction === "reject"
            ? "rejected"
            : "removed"
        } successfully.`
      );
      setTimeout(() => setSuccessMsg(""), 3000);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(`Failed to ${modalAction} content. Please try again.`);
      setTimeout(() => setError(""), 3000);
    }
  };

  const filteredReportedPosts = reportedContent.posts.filter((post) => {
    if (filterType !== "all" && filterType !== "posts") return false;
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredReportedComments = reportedContent.comments.filter(
    (comment) => {
      if (filterType !== "all" && filterType !== "comments") return false;
      return comment.content.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  const filteredPendingPosts = pendingContent.posts.filter((post) => {
    if (filterType !== "all" && filterType !== "posts") return false;
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredPendingComments = pendingContent.comments.filter((comment) => {
    if (filterType !== "all" && filterType !== "comments") return false;
    return comment.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl text-gray-500 mb-2">
          You don't have permission to access this page
        </p>
        <Link to="/" className="text-teal-500 hover:underline">
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-3">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <HiOutlineFlag className="mr-2 text-red-500" />
          Content Moderation
        </h1>
        <p className="text-gray-500 mt-1">
          Review and moderate reported and pending content
        </p>
      </div>

      {successMsg && (
        <Alert color="success" className="mb-4">
          {successMsg}
        </Alert>
      )}

      {error && (
        <Alert color="failure" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <div className="w-full md:w-1/2">
          <TextInput
            id="searchContent"
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Content</option>
            <option value="posts">Posts Only</option>
            <option value="comments">Comments Only</option>
          </select>
        </div>
      </div>

      <Tabs aria-label="Content moderation tabs">
        <Tabs.Item
          active={activeTab === "reported"}
          title="Reported Content"
          icon={HiOutlineFlag}
          onClick={() => setActiveTab("reported")}
        >
          {loading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <Spinner size="xl" />
            </div>
          ) : (
            <>
              {filteredReportedPosts.length === 0 &&
              filteredReportedComments.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg text-gray-500">
                    No reported content found
                  </p>
                </div>
              ) : (
                <div>
                  {filteredReportedPosts.length > 0 &&
                    (filterType === "all" || filterType === "posts") && (
                      <>
                        <h3 className="text-xl font-semibold mb-4 mt-6">
                          Reported Posts
                        </h3>
                        <div className="overflow-x-auto">
                          <Table hoverable>
                            <Table.Head>
                              <Table.HeadCell>Post</Table.HeadCell>
                              <Table.HeadCell>Author</Table.HeadCell>
                              <Table.HeadCell>Reports</Table.HeadCell>
                              <Table.HeadCell>Reason</Table.HeadCell>
                              <Table.HeadCell>Date</Table.HeadCell>
                              <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                              {filteredReportedPosts.map((post) => (
                                <Table.Row
                                  key={post._id}
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                  <Table.Cell>
                                    <div className="flex items-center">
                                      <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-10 h-10 rounded mr-3 object-cover"
                                      />
                                      <div>
                                        <p className="font-medium">
                                          {post.title}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate max-w-xs">
                                          {post.content}
                                        </p>
                                      </div>
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex items-center">
                                      <img
                                        src={post.user.profilePicture}
                                        alt={post.user.username}
                                        className="w-6 h-6 rounded-full mr-2"
                                      />
                                      @{post.user.username}
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Badge color="red">
                                      {post.reportCount}
                                    </Badge>
                                  </Table.Cell>
                                  <Table.Cell>{post.reportReason}</Table.Cell>
                                  <Table.Cell>
                                    {new Date(
                                      post.createdAt
                                    ).toLocaleDateString()}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex space-x-2">
                                      <Button
                                        size="xs"
                                        color="light"
                                        onClick={() =>
                                          window.open(
                                            `/post/${post.slug}`,
                                            "_blank"
                                          )
                                        }
                                      >
                                        <HiEye className="mr-1" /> View
                                      </Button>
                                      <Button
                                        size="xs"
                                        color="success"
                                        onClick={() =>
                                          handleAction(post, "approve", "post")
                                        }
                                      >
                                        <HiCheckCircle className="mr-1" />{" "}
                                        Approve
                                      </Button>
                                      <Button
                                        size="xs"
                                        color="failure"
                                        onClick={() =>
                                          handleAction(post, "remove", "post")
                                        }
                                      >
                                        <HiTrash className="mr-1" /> Remove
                                      </Button>
                                    </div>
                                  </Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                        </div>
                      </>
                    )}

                  {filteredReportedComments.length > 0 &&
                    (filterType === "all" || filterType === "comments") && (
                      <>
                        <h3 className="text-xl font-semibold mb-4 mt-6">
                          Reported Comments
                        </h3>
                        <div className="overflow-x-auto">
                          <Table hoverable>
                            <Table.Head>
                              <Table.HeadCell>Comment</Table.HeadCell>
                              <Table.HeadCell>Author</Table.HeadCell>
                              <Table.HeadCell>Post</Table.HeadCell>
                              <Table.HeadCell>Reports</Table.HeadCell>
                              <Table.HeadCell>Reason</Table.HeadCell>
                              <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                              {filteredReportedComments.map((comment) => (
                                <Table.Row
                                  key={comment._id}
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                  <Table.Cell>
                                    <p className="text-sm truncate max-w-xs">
                                      {comment.content}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(
                                        comment.createdAt
                                      ).toLocaleDateString()}
                                    </p>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex items-center">
                                      <img
                                        src={comment.user.profilePicture}
                                        alt={comment.user.username}
                                        className="w-6 h-6 rounded-full mr-2"
                                      />
                                      @{comment.user.username}
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Link
                                      to={`/post/${comment.post.slug}`}
                                      className="text-blue-500 hover:underline"
                                    >
                                      {comment.post.title}
                                    </Link>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Badge color="red">
                                      {comment.reportCount}
                                    </Badge>
                                  </Table.Cell>
                                  <Table.Cell>
                                    {comment.reportReason}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex space-x-2">
                                      <Button
                                        size="xs"
                                        color="success"
                                        onClick={() =>
                                          handleAction(
                                            comment,
                                            "approve",
                                            "comment"
                                          )
                                        }
                                      >
                                        <HiCheckCircle className="mr-1" />{" "}
                                        Approve
                                      </Button>
                                      <Button
                                        size="xs"
                                        color="failure"
                                        onClick={() =>
                                          handleAction(
                                            comment,
                                            "remove",
                                            "comment"
                                          )
                                        }
                                      >
                                        <HiTrash className="mr-1" /> Remove
                                      </Button>
                                    </div>
                                  </Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                        </div>
                      </>
                    )}
                </div>
              )}
            </>
          )}
        </Tabs.Item>

        <Tabs.Item
          active={activeTab === "pending"}
          title="Pending Approval"
          icon={HiOutlineBan}
          onClick={() => setActiveTab("pending")}
        >
          {loading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <Spinner size="xl" />
            </div>
          ) : (
            <>
              {filteredPendingPosts.length === 0 &&
              filteredPendingComments.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg text-gray-500">
                    No content pending approval
                  </p>
                </div>
              ) : (
                <div>
                  {filteredPendingPosts.length > 0 &&
                    (filterType === "all" || filterType === "posts") && (
                      <>
                        <h3 className="text-xl font-semibold mb-4 mt-6">
                          Pending Posts
                        </h3>
                        <div className="overflow-x-auto">
                          <Table hoverable>
                            <Table.Head>
                              <Table.HeadCell>Post</Table.HeadCell>
                              <Table.HeadCell>Author</Table.HeadCell>
                              <Table.HeadCell>Date</Table.HeadCell>
                              <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                              {filteredPendingPosts.map((post) => (
                                <Table.Row
                                  key={post._id}
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                  <Table.Cell>
                                    <div className="flex items-center">
                                      <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-10 h-10 rounded mr-3 object-cover"
                                      />
                                      <div>
                                        <p className="font-medium">
                                          {post.title}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate max-w-xs">
                                          {post.content}
                                        </p>
                                      </div>
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex items-center">
                                      <img
                                        src={post.user.profilePicture}
                                        alt={post.user.username}
                                        className="w-6 h-6 rounded-full mr-2"
                                      />
                                      @{post.user.username}
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    {new Date(
                                      post.createdAt
                                    ).toLocaleDateString()}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex space-x-2">
                                      <Button
                                        size="xs"
                                        color="light"
                                        onClick={() =>
                                          window.open(
                                            `/post/${post.slug}`,
                                            "_blank"
                                          )
                                        }
                                      >
                                        <HiEye className="mr-1" /> View
                                      </Button>
                                      <Button
                                        size="xs"
                                        color="success"
                                        onClick={() =>
                                          handleAction(post, "approve", "post")
                                        }
                                      >
                                        <HiCheckCircle className="mr-1" />{" "}
                                        Approve
                                      </Button>
                                      <Button
                                        size="xs"
                                        color="failure"
                                        onClick={() =>
                                          handleAction(post, "reject", "post")
                                        }
                                      >
                                        <HiTrash className="mr-1" /> Reject
                                      </Button>
                                    </div>
                                  </Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                        </div>
                      </>
                    )}

                  {filteredPendingComments.length > 0 &&
                    (filterType === "all" || filterType === "comments") && (
                      <>
                        <h3 className="text-xl font-semibold mb-4 mt-6">
                          Pending Comments
                        </h3>
                        <div className="overflow-x-auto">
                          <Table hoverable>
                            <Table.Head>
                              <Table.HeadCell>Comment</Table.HeadCell>
                              <Table.HeadCell>Author</Table.HeadCell>
                              <Table.HeadCell>Post</Table.HeadCell>
                              <Table.HeadCell>Date</Table.HeadCell>
                              <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                              {filteredPendingComments.map((comment) => (
                                <Table.Row
                                  key={comment._id}
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                  <Table.Cell>
                                    <p className="text-sm truncate max-w-xs">
                                      {comment.content}
                                    </p>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex items-center">
                                      <img
                                        src={comment.user.profilePicture}
                                        alt={comment.user.username}
                                        className="w-6 h-6 rounded-full mr-2"
                                      />
                                      @{comment.user.username}
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Link
                                      to={`/post/${comment.post.slug}`}
                                      className="text-blue-500 hover:underline"
                                    >
                                      {comment.post.title}
                                    </Link>
                                  </Table.Cell>
                                  <Table.Cell>
                                    {new Date(
                                      comment.createdAt
                                    ).toLocaleDateString()}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex space-x-2">
                                      <Button
                                        size="xs"
                                        color="success"
                                        onClick={() =>
                                          handleAction(
                                            comment,
                                            "approve",
                                            "comment"
                                          )
                                        }
                                      >
                                        <HiCheckCircle className="mr-1" />{" "}
                                        Approve
                                      </Button>
                                      <Button
                                        size="xs"
                                        color="failure"
                                        onClick={() =>
                                          handleAction(
                                            comment,
                                            "reject",
                                            "comment"
                                          )
                                        }
                                      >
                                        <HiTrash className="mr-1" /> Reject
                                      </Button>
                                    </div>
                                  </Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                        </div>
                      </>
                    )}
                </div>
              )}
            </>
          )}
        </Tabs.Item>
      </Tabs>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {modalAction === "approve" &&
                `Are you sure you want to approve this ${selectedItem?.type}?`}
              {modalAction === "reject" &&
                `Are you sure you want to reject this ${selectedItem?.type}?`}
              {modalAction === "remove" &&
                `Are you sure you want to remove this ${selectedItem?.type}?`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color={modalAction === "approve" ? "success" : "failure"}
                onClick={executeAction}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
